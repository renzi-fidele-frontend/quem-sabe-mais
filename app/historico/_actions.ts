"use server";
import { dbConnect } from "@/lib/db/dbConnect";
import Partida, { IPartida } from "@/models/Partida";
import { obterSessaoComUsuario } from "../(auth)/_lib/session";

type BuscarHistoricoParams = {
   paginaAtual?: number;
   limitePorPagina?: number;
};
export async function buscarHistoricoPartidas({ paginaAtual = 1, limitePorPagina = 8 }: BuscarHistoricoParams) {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Usuário não autenticado");
   }

   // Buscar as partidas do utilizador
   const filtro = { usuarioId: sessao.usuario._id };

   const [partidas, total] = await Promise.all([
      Partida.find(filtro)
         .select({
            status: 1,
            respondidas: 1,
            perguntaAtual: 1,
            valorAtual: 1,
            valorGarantido: 1,
            createdAt: 1,
            updatedAt: 1,
         })
         .sort({ createdAt: -1, _id: -1 })
         .skip((paginaAtual - 1) * limitePorPagina)
         .limit(limitePorPagina)
         .lean<IPartida[]>(),

      Partida.countDocuments(filtro),
   ]);

   // Preparar os dados para a interface
   const partidasFormatadas = partidas.map((partida, index) => {
      const acertos = partida.respondidas.filter((resposta) => resposta.correta === true).length;

      return {
         id: partida._id.toString(),
         data: partida.createdAt,
         status: partida.status,
         acertos,
         totalRespondidas: partida.respondidas.length,
         valorAtual: partida.valorAtual,
         // Nr da partida
         numero: total - (paginaAtual - 1) * limitePorPagina - index,
      };
   });

   return {
      partidas: partidasFormatadas,
      paginacao: {
         paginaAtual,
         limitePorPagina: limitePorPagina,
         total,
         totalPaginas: Math.ceil(total / limitePorPagina),
      },
   };
}

type ResultadoBuscarResumoHistorico = {
   _id: null;
   totalPartidas: number;
   totalVitorias: number;
   totalEliminado: number;
   totalAbandonado: number;
   totalEmAndamento: number;
   totalGanho: number;
};
export async function buscarResumoHistorico(): Promise<[ResultadoBuscarResumoHistorico]> {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();
   if (!sessao) {
      throw new Error("Usuário não autenticado");
   }

   const resultado = await Partida.aggregate([
      { $match: { usuarioId: sessao.usuario._id } },
      {
         $group: {
            _id: null,
            totalPartidas: { $sum: 1 },
            totalVitorias: {
               $sum: {
                  $cond: [{ $eq: ["$status", "vitoria"] }, 1, 0],
               },
            },
            totalEliminado: {
               $sum: {
                  $cond: [{ $eq: ["$status", "eliminado"] }, 1, 0],
               },
            },
            totalAbandonado: {
               $sum: {
                  $cond: [{ $eq: ["$status", "abandonada"] }, 1, 0],
               },
            },
            totalEmAndamento: {
               $sum: {
                  $cond: [{ $eq: ["$status", "em_andamento"] }, 1, 0],
               },
            },
            totalGanho: {
               // Soma o valor atual das partidas que não estiverem em andamento
               $sum: {
                  $cond: [{ $ne: ["$status", "em_andamento"] }, "$valorAtual", 0],
               },
            },
         },
      },
   ]);

   return resultado as [ResultadoBuscarResumoHistorico];
}
