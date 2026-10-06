"use server";
import { CHECKPOINTS, MAX_PARTIDAS_DIARIAS, TOTAL_PERGUNTAS, VALORES_PARTIDA } from "@/data/jogo";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import { dbConnect } from "@/lib/dbConnect";
import { calcularXPGanhoNaPartida } from "@/lib/game/calcularXpGanhoNaPartida";
import gerarVotosSimulados from "@/lib/game/gerarVotosSimulados";
import Partida, { IPartida } from "@/models/Partida";
import { IPergunta, Pergunta } from "@/models/Pergunta";
import { Usuario } from "@/models/Usuario";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function iniciarPartida() {
   await dbConnect();
   let partida;

   try {
      const usuario = await obterSessaoComUsuario();

      if (!usuario) {
         throw new Error("Usuário não encontrado");
      }

      const inicioDoDia = new Date();
      inicioDoDia.setHours(0, 0, 0, 0);

      const fimDoDia = new Date();
      fimDoDia.setHours(23, 59, 59, 999);

      const partidasHoje = await Partida.countDocuments({
         usuarioId: usuario.usuario._id,
         createdAt: {
            $gte: inicioDoDia,
            $lte: fimDoDia,
         },
      });

      //    Caso se exceda o limite diário
      if (partidasHoje >= MAX_PARTIDAS_DIARIAS) {
         throw new Error("Limite de partidas diárias atingido");
      }

      //    Buscando 15 perguntas aleatórias
      //    TODO: Mais tarde buscar as perguntas por dificuldade para melhoria da experiência
      const perguntas = await Pergunta.aggregate([{ $sample: { size: TOTAL_PERGUNTAS } }, { $project: { respostaCorreta: -1 } }]);

      //    Caso não se ache o total de 15 perguntas
      //   TODO: Após testes bloqueiar cas de perguntas insuficientes
      /* if (perguntas.length < TOTAL_PERGUNTAS) {
         console.log(perguntas.length, TOTAL_PERGUNTAS);
         throw new Error("Não foram encontradas perguntas suficientes");
      } */

      //    Criando a partida
      partida = await Partida.create({
         usuarioId: new Types.ObjectId(usuario.usuario._id),
         perguntas: perguntas.map((pergunta) => pergunta._id),
         respondidas: [],
         perguntaAtual: 1,
         valorAtual: 0,
         valorGarantido: 0,
         status: "em_andamento",
         ajuda50Usada: false,
         pularPerguntaUsado: false,
         ajudaPublicaUsada: false,
         dataInicio: new Date(),
      });
   } catch (error) {
      console.log("Erro ao inicializar uma partida!");
      console.log(error);
   } finally {
      if (partida) redirect("/partida/" + partida._id.toString());
   }
}

export async function responderPergunta(partidaId: string, resposta: string) {
   await dbConnect();
   let redirecionar = false;
   let respostasCorretas = 0;
   let userId = "";

   try {
      const usuario = await obterSessaoComUsuario();
      if (!usuario) {
         throw new Error("Usuário não encontrado");
      }

      userId = usuario.usuario._id.toString();

      const partida = await Partida.findOne({ _id: partidaId, usuarioId: usuario.usuario._id }).lean<IPartida>();
      if (!partida) {
         throw new Error("Partida não encontrada");
      }

      // Caso não esteja em andamento
      if (partida.status !== "em_andamento") {
         throw new Error("Partida encerrada");
      }

      // Verificar se tempo excede 9 minutos
      if (new Date().getTime() - partida.dataInicio.getTime() > 9 * 60 * 1000) {
         throw new Error("Tempo de gameplay expirado");
      }

      // Calculando o número de respostas corretas
      partida?.respondidas.forEach((resposta) => {
         if (resposta.correta) respostasCorretas++;
      });

      // Encontrando a pergunta sendo respondida
      const perguntaId = partida.perguntas[partida.perguntaAtual - 1];
      const pergunta = await Pergunta.findById(perguntaId);
      if (!pergunta) {
         throw new Error("Pergunta não encontrada");
      }

      // Descobrir se a resposta está correta
      const correta = resposta === pergunta.respostaCorreta;

      const valorAtual = VALORES_PARTIDA[partida.perguntaAtual - 1];

      // Adicionar a resposta a partida
      await Partida.updateOne(
         { _id: partidaId, usuarioId: usuario.usuario._id },
         {
            $push: {
               respondidas: { perguntaId, numero: partida.perguntaAtual, respostaEscolhida: resposta, correta, valor: valorAtual },
            },
         },
      );

      if (correta) {
         respostasCorretas++;
         // Caso acerte, atualizar o valor atual
         await Partida.updateOne({ _id: partidaId, usuarioId: usuario.usuario._id }, { $set: { valorAtual } });

         // Caso esteja na última pergunta, encerrar a partida
         if (partida.perguntaAtual === TOTAL_PERGUNTAS) {
            await Partida.updateOne({ _id: partidaId, usuarioId: usuario.usuario._id }, { $set: { status: "vitoria", dataFim: new Date() } });
            // Redirecionar para a página de resultado final da partida
            redirecionar = true;
         } else {
            // Avançar para a próxima pergunta caso acerte
            await Partida.updateOne({ _id: partidaId, usuarioId: usuario.usuario._id }, { $inc: { perguntaAtual: 1 } });
         }

         // Verificar se é um checkpoint para atualizar o valor garantido
         const eCheckpoint = CHECKPOINTS.includes(valorAtual);
         if (eCheckpoint) {
            await Partida.updateOne({ _id: partidaId, usuarioId: usuario.usuario._id }, { $set: { valorGarantido: valorAtual } });
         }
      } else {
         //  Se o jogador erra
         await Partida.updateOne(
            { _id: partidaId, usuarioId: usuario.usuario._id },
            { $set: { status: "eliminado", dataFim: new Date(), valorAtual: partida.valorGarantido } },
         );
         // Redirecionar para a página de resultado final da partida
         redirecionar = true;
      }

      // Atualizando o cache e automaticamente atualiza a tela do client side
      revalidatePath(`/partida/${partidaId}`);

      return {
         correta,
      };
   } catch (error) {
      console.log("Erro ao responder a pergunta!");
      console.log(error);
   } finally {
      // Redirecionar ao finalizar a partida
      if (redirecionar) {
         // Adicionando o xp ganho
         const xpGanho = calcularXPGanhoNaPartida(respostasCorretas);
         console.log("Xp ganho: ", xpGanho);
         const res = await Partida.updateOne({ _id: partidaId, usuarioId: userId, xpConcedido: false }, { $set: { xpConcedido: true } });
         if (res.modifiedCount === 1) {
            console.log("Xp concedido!");
            await Usuario.updateOne({ _id: userId }, { $inc: { xp: xpGanho } });
         }
         redirect(`/partida/${partidaId}/resultado`);
      }
   }
}

// TODO: Finalizar adicionando o xp ganho
export async function abandonarPartida(partidaId: string) {
   await dbConnect();
   let respostasCorretas = 0;

   try {
      const usuario = await obterSessaoComUsuario();
      if (!usuario) {
         throw new Error("Usuário não encontrado");
      }

      const partida = await Partida.findOne({ _id: partidaId, usuarioId: usuario?.usuario._id, status: "em_andamento" }).lean<IPartida>();

      if (!partida) {
         throw new Error("Partida não encontrada");
      }

      // Calculando o número de respostas corretas
      partida?.respondidas.forEach((resposta) => {
         if (resposta.correta) respostasCorretas++;
      });
      const xpGanho = calcularXPGanhoNaPartida(respostasCorretas);

      await Partida.updateOne(
         { _id: partidaId, usuarioId: usuario?.usuario._id },
         { $set: { status: "abandonada", dataFim: new Date() }, $inc: { xp: xpGanho } },
      );
   } catch (error) {
      console.log("Erro ao abandonar a partida!");
      console.log(error);
   } finally {
      redirect(`/partida/${partidaId}/resultado`);
   }
}

// ---- Funcionalidades Auxiliares ---- //
export async function usarAjuda50(partidaId: string) {
   await dbConnect();
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Não autenticado");
   }

   const partida = await Partida.findOne({
      _id: partidaId,
      usuarioId: sessao.usuario._id,
      status: "em_andamento",
   }).lean<IPartida>();

   if (!partida) {
      throw new Error("Partida não encontrada");
   }

   if (partida.ajuda50Usada) {
      throw new Error("A ajuda 50/50 já foi utilizada");
   }

   const perguntaId = partida.perguntas[partida.perguntaAtual - 1];

   const pergunta = await Pergunta.findById(perguntaId).lean<IPergunta>();

   if (!pergunta) {
      throw new Error("Pergunta não encontrada");
   }

   // Descobrir alternativas incorretas
   const alternativasIncorretas = pergunta.alternativas
      .filter((alternativa) => alternativa.id !== pergunta.respostaCorreta)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((alternativa) => alternativa.id);

   await Partida.updateOne({ _id: partidaId, usuarioId: sessao.usuario._id, status: "em_andamento" }, { $set: { ajuda50Usada: true } });

   // Atualizando o cache e automaticamente atualiza a tela do client side
   revalidatePath(`/partida/${partidaId}`);

   return alternativasIncorretas;
}

export async function usarPularPergunta(partidaId: string) {
   await dbConnect();
   let redirecionar = false;
   try {
      const sessao = await obterSessaoComUsuario();

      if (!sessao) {
         throw new Error("Não autenticado");
      }

      const partida = await Partida.findOne({
         _id: partidaId,
         usuarioId: sessao.usuario._id,
      }).lean<IPartida>();

      if (!partida) {
         throw new Error("Partida não encontrada");
      }

      if (partida.pularPerguntaUsado) {
         throw new Error("A ajuda para pular já foi utilizada");
      }

      if (partida.status !== "em_andamento") {
         throw new Error("A partida já partida encerrada!");
      }

      const valorAtual = VALORES_PARTIDA[partida.perguntaAtual - 1];

      if (partida.perguntaAtual === TOTAL_PERGUNTAS) {
         await Partida.updateOne(
            { _id: partidaId, usuarioId: sessao.usuario._id },
            { $set: { status: "vitória", dataFim: new Date(), pularPerguntaUsado: true, valorAtual } },
         );
         redirecionar = true;
      } else {
         await Partida.updateOne(
            { _id: partidaId, usuarioId: sessao.usuario._id },
            {
               $set: { pularPerguntaUsado: true, perguntaAtual: partida.perguntaAtual + 1, valorAtual },
               // Tentar adicionar a pergunta respondida para contar como correta
               $push: {
                  respondidas: {
                     perguntaId: partida.perguntas[partida.perguntaAtual],
                     correta: true,
                     valor: VALORES_PARTIDA[partida.perguntaAtual],
                     numero: partida.perguntaAtual,
                  },
               },
            },
         );
      }

      // Verificar se é um checkpoint para atualizar o valor garantido
      if (CHECKPOINTS.includes(partida.valorAtual)) {
         await Partida.updateOne({ _id: partidaId, usuarioId: sessao.usuario._id }, { $set: { valorGarantido: partida.valorAtual } });
      }

      revalidatePath(`/partida/${partidaId}`);
   } catch (error) {
      console.log("Erro ao pular a pergunta!");
      console.log(error);
   } finally {
      if (redirecionar) {
         redirect(`/partida/${partidaId}/resultado`);
      }
   }
}

export async function usarAjudaPublica(partidaId: string) {
   await dbConnect();
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Não autenticado");
   }

   const partida = await Partida.findOne({
      _id: partidaId,
      usuarioId: sessao.usuario._id,
   }).lean<IPartida>();

   if (!partida) {
      throw new Error("Partida não encontrada");
   }

   if (partida.status !== "em_andamento") {
      throw new Error("A partida já partida encerrada!");
   }

   if (partida.ajudaPublicaUsada) {
      throw new Error("A ajuda pública já foi utilizada");
   }

   const perguntaId = partida.perguntas[partida.perguntaAtual - 1];

   const pergunta = await Pergunta.findById(perguntaId).lean<IPergunta>();

   if (!pergunta) {
      throw new Error("Pergunta não encontrada");
   }

   const resultado = gerarVotosSimulados(pergunta.alternativas, pergunta.respostaCorreta);

   await Partida.updateOne({ _id: partidaId, usuarioId: sessao.usuario._id }, { $set: { ajudaPublicaUsada: true } });

   return resultado;

   revalidatePath(`/partida/${partidaId}`);

   // TODO: Implementar ajuda pública
}
