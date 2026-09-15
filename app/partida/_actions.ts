"use server";

import { MAX_PARTIDAS_DIARIAS, TOTAL_PERGUNTAS } from "@/data/jogo";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import { dbConnect } from "@/lib/dbConnect";
import Partida, { IPartida } from "@/models/Partida";
import { Types } from "mongoose";

export async function iniciarPartida() {
   await dbConnect();

   const usuario = await obterSessaoComUsuario();

   if (!usuario) {
      return {
         error: "Usuário não encontrado",
      };
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
      return {
         error: "Limite de partidas diárias atingido",
      };
   }

   //    Buscando 15 perguntas aleatórias
//    TODO: Mais tarde buscar as perguntas por dificuldade para melhoria da experiência
   const perguntas = await Partida.aggregate([{ $sample: { size: TOTAL_PERGUNTAS } }, { $project: { perguntas: 1 } }]);

   //    Caso não se ache o total de 15 perguntas
   if (perguntas.length < TOTAL_PERGUNTAS) {
      return {
         error: "Não existem perguntas suficientes para iniciar uma partida.",
      };
   }

   //    Criando a partida
   const partida = (await Partida.create({
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
   })) as IPartida;

   return {
      sucesso: true,
      partidaId: partida._id.toString(),
   };
}
