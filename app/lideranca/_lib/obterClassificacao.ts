import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import Temporada, { ITemporada } from "@/models/Temporada";
import { Usuario } from "@/models/Usuario";
import { NIVEIS } from "@/data/jogo";
import obterProgressoXpUsuario from "@/app/partida/_lib/obterProgresso";

type ResultadoClassificacao = {
   posicao: number;
   usuarioId: string;
   nome: string;
   username: string;
   nivel: number;
   titulo: string;
   avatarUrl: string;
   totalPartidas: number;
   totalVitorias: number;
   totalAcertos: number;
   taxaDeAcerto: number;
   premioAcumulado: number;
   xp: number;
}[];

export async function obterClassificacao(): Promise<ResultadoClassificacao> {
   await dbConnect();

   const agora = new Date();

   // Obter a temporada atual
   const temporadaAtual = await Temporada.findOne({
      status: "em_andamento",
      dataInicio: { $lte: agora },
      dataFim: { $gt: agora },
   })
      .select("_id dataFim")
      .lean<Pick<ITemporada, "_id" | "dataFim">>();

   if (!temporadaAtual) {
      return [];
   }

   // Agregar estatísticas das partidas de cada jogador
   const resultados = await Partida.aggregate([
      {
         $match: {
            temporadaId: temporadaAtual._id,
            status: {
               $in: ["vitoria", "eliminado", "abandonada"],
            },
            dataFim: {
               $exists: true,
               $ne: null,
               $lte: temporadaAtual.dataFim,
            },
         },
      },

      // Calcular estatísticas individuais de cada partida
      {
         $project: {
            usuarioId: 1,
            status: 1,
            valorAtual: 1,
            totalRespondidas: {
               $size: { $ifNull: ["$respondidas", []] },
            },

            totalAcertos: {
               $size: {
                  $filter: {
                     input: { $ifNull: ["$respondidas", []] },
                     as: "resposta",
                     cond: {
                        $eq: ["$$resposta.correta", true],
                     },
                  },
               },
            },
         },
      },

      // Agrupar todas as partidas por jogador
      {
         $group: {
            _id: "$usuarioId",
            totalPartidas: { $sum: 1 },

            totalVitorias: {
               $sum: {
                  $cond: [{ $eq: ["$status", "vitoria"] }, 1, 0],
               },
            },

            totalAcertos: { $sum: "$totalAcertos" },

            totalRespondidas: { $sum: "$totalRespondidas" },

            premioAcumulado: {
               $sum: { $ifNull: ["$valorAtual", 0] },
            },
         },
      },

      // Associar os dados do usuário
      {
         $lookup: {
            from: "Usuarios",
            localField: "_id",
            foreignField: "_id",
            as: "usuario",
         },
      },

      { $unwind: "$usuario" },

      // Excluir contas desativadas e administradores
      {
         $match: {
            "usuario.ativo": true,
            "usuario.role": "player",
         },
      },

      // Selecionar os campos necessários
      {
         $project: {
            _id: 0,
            usuarioId: "$_id",
            nome: "$usuario.nomeCompleto",
            username: "$usuario.nickname",
            xp: { $ifNull: ["$usuario.xp", 0] },
            avatarUrl: "$usuario.avatarUrl",
            totalPartidas: 1,
            totalVitorias: 1,
            totalAcertos: 1,
            totalRespondidas: 1,
            premioAcumulado: 1,
         },
      },

      // Ordenar pelo prêmio, usando acertos e XP como desempate
      {
         $sort: {
            premioAcumulado: -1,
            totalAcertos: -1,
            xp: -1,
            usuarioId: 1,
         },
      },
   ]);

   // Preparar os dados finais
   return resultados.map((jogador, index) => {
      const progresso = obterProgressoXpUsuario(jogador.xp);

      const taxaDeAcerto = jogador.totalRespondidas > 0 ? Number(((jogador.totalAcertos / jogador.totalRespondidas) * 100).toFixed(1)) : 0;

      return {
         posicao: index + 1,
         usuarioId: jogador.usuarioId.toString(),

         nome: jogador.nome,
         username: jogador.username,
         avatarUrl: jogador.avatarUrl,
         nivel: progresso.nivel,
         titulo: progresso.titulo,

         totalPartidas: jogador.totalPartidas,
         totalVitorias: jogador.totalVitorias,
         totalAcertos: jogador.totalAcertos,
         taxaDeAcerto,

         premioAcumulado: jogador.premioAcumulado,
         xp: jogador.xp,
      };
   });
}
