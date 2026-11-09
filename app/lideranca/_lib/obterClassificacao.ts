import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import Temporada, { ITemporada } from "@/models/Temporada";
import obterProgressoXpUsuario from "@/app/partida/_lib/obterProgresso";

type JogadorClassificado = {
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
   totalRespondidas?: number;
};

type ResultadoClassificacao = {
   jogadores: JogadorClassificado[];
   totalJogadores: number;
   paginaAtual: number;
   totalPaginas: number;
   jogadoresPorPagina: number;
};

const JOGADORES_POR_PAGINA = 10;

export async function obterClassificacao(pagina: number = 1): Promise<ResultadoClassificacao> {
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
      return {
         jogadores: [],
         totalJogadores: 0,
         paginaAtual: 1,
         totalPaginas: 0,
         jogadoresPorPagina: JOGADORES_POR_PAGINA,
      };
   }

   const paginaAtual = Math.max(1, Math.floor(pagina) || 1);
   const skip = (paginaAtual - 1) * JOGADORES_POR_PAGINA;

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
      {
         $facet: {
            // Obter somente os jogadores da página atual
            jogadores: [{ $skip: skip }, { $limit: JOGADORES_POR_PAGINA }],

            // Contabilizar todos os jogadores classificados
            total: [{ $count: "quantidade" }],
         },
      },
   ]);

   const resultado = resultados[0];

   const totalJogadores = resultado?.total[0]?.quantidade ?? 0;

   const totalPaginas = Math.ceil(totalJogadores / JOGADORES_POR_PAGINA);

   // Preparar os dados finais
   const jogadores = resultado.jogadores.map((jogador: JogadorClassificado, index: number) => {
      const progresso = obterProgressoXpUsuario(jogador.xp);

      const taxaDeAcerto = jogador.totalRespondidas! > 0 ? Number(((jogador.totalAcertos / jogador.totalRespondidas!) * 100).toFixed(1)) : 0;

      return {
         posicao: skip + index + 1,
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

   return {
      jogadores,
      totalJogadores,
      paginaAtual,
      totalPaginas,
      jogadoresPorPagina: JOGADORES_POR_PAGINA,
   };
}
