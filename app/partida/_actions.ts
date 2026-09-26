"use server";
import { CHECKPOINTS, MAX_PARTIDAS_DIARIAS, TOTAL_PERGUNTAS, VALORES_PARTIDA } from "@/data/jogo";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import { dbConnect } from "@/lib/dbConnect";
import Partida from "@/models/Partida";
import { Pergunta } from "@/models/Pergunta";
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

   try {
      const usuario = await obterSessaoComUsuario();
      if (!usuario) {
         throw new Error("Usuário não encontrado");
      }

      const partida = await Partida.findOne({ _id: partidaId, usuarioId: usuario.usuario._id });
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

      // TODO: Mais tarde verificar se cada pergunta foi respondida no intervalo de 20 seguntos

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
      // Redirecionar
      if (redirecionar) {
         redirect(`/partida/${partidaId}/resultado`);
      }
   }
}
