"use server";

import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import { redirect } from "next/navigation";

export type ResumoDaPerformance = {
   melhorSequencia: number;
   maiorPremio: number;
   maxPerguntasPartida: number;
   mediaPerguntasPartida: number;
   totalRespondidas: number;
   respostasErradas: number;
   partidasVencidas: number;
   partidasAbandonadas: number;
};

const RESUMO_VAZIO: ResumoDaPerformance = {
   melhorSequencia: 0,
   maiorPremio: 0,
   maxPerguntasPartida: 0,
   mediaPerguntasPartida: 0,
   totalRespondidas: 0,
   respostasErradas: 0,
   partidasVencidas: 0,
   partidasAbandonadas: 0,
};

export async function obterResumoDaPerformance(): Promise<ResumoDaPerformance> {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      redirect("/entrar");
   }

   const [resultado] = await Partida.aggregate([
      {
         $match: {
            usuarioId: sessao.usuario._id,
            status: {
               $in: ["vitoria", "eliminado", "abandonada"],
            },
            dataFim: {
               $exists: true,
               $ne: null,
            },
         },
      },
      {
         $project: {
            status: 1,
            valorAtual: 1,
            totalPerguntas: { $size: "$respondidas" },

            respostasErradas: {
               $size: {
                  $filter: {
                     input: "$respondidas",
                     as: "resposta",
                     cond: { $eq: ["$$resposta.correta", false] },
                  },
               },
            },

            respostasCorretas: {
               $size: {
                  $filter: {
                     input: "$respondidas",
                     as: "resposta",
                     cond: { $eq: ["$$resposta.correta", true] },
                  },
               },
            },
         },
      },

      // Agrupa os resultados de todas as partidas do jogador.
      {
         $group: {
            _id: null,

            maiorPremio: { $max: "$valorAtual" },
            maxPerguntasPartida: { $max: "$totalPerguntas" },

            totalRespondidas: { $sum: "$totalPerguntas" },
            respostasErradas: { $sum: "$respostasErradas" },

            melhorSequencia: {
               $max: "$respostasCorretas",
            },

            totalPartidas: { $sum: 1 },

            partidasVencidas: {
               $sum: {
                  $cond: [{ $eq: ["$status", "vitoria"] }, 1, 0],
               },
            },

            partidasAbandonadas: {
               $sum: {
                  $cond: [{ $eq: ["$status", "abandonada"] }, 1, 0],
               },
            },
         },
      },

      // Calcula a média de perguntas respondidas por partida.
      {
         $project: {
            _id: 0,
            melhorSequencia: 1,
            maiorPremio: 1,
            maxPerguntasPartida: 1,
            totalRespondidas: 1,
            respostasErradas: 1,
            partidasVencidas: 1,
            partidasAbandonadas: 1,

            mediaPerguntasPartida: {
               $round: [
                  {
                     $divide: ["$totalRespondidas", "$totalPartidas"],
                  },
                  1,
               ],
            },
         },
      },
   ]);

   return resultado ?? RESUMO_VAZIO;
}
