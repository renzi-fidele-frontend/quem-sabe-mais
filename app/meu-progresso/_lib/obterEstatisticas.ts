import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import Temporada, { ITemporada } from "@/models/Temporada";
import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

type ResultadoTemporada = {
   totalDeJogos: number;
   totalGanhos: number;
   perguntasAcertadas: number;
   totalPerguntasRespondidas: number;
   taxaDeAcertos: number;
};

const ESTATISTICAS_VAZIAS: ResultadoTemporada = {
   totalDeJogos: 0,
   totalGanhos: 0,
   perguntasAcertadas: 0,
   totalPerguntasRespondidas: 0,
   taxaDeAcertos: 0,
};

async function calcularEstatisticasTemporada(usuarioId: Types.ObjectId, temporada: ITemporada): Promise<ResultadoTemporada> {
   const [resultado] = await Partida.aggregate([
      {
         $match: {
            usuarioId,
            temporadaId: temporada._id,
            status: {
               $in: ["vitoria", "eliminado", "abandonada"],
            },
            dataFim: {
               $exists: true,
               $ne: null,
               $lte: temporada.dataFim,
            },
         },
      },
      {
         $group: {
            _id: null,
            totalDeJogos: { $sum: 1 },
            totalGanhos: { $sum: "$valorAtual" },
            perguntasAcertadas: {
               $sum: {
                  $size: {
                     $filter: {
                        input: "$respondidas",
                        as: "resposta",
                        cond: { $eq: ["$$resposta.correta", true] },
                     },
                  },
               },
            },
            totalPerguntasRespondidas: {
               $sum: { $size: "$respondidas" },
            },
         },
      },
   ]);

   if (!resultado) {
      return ESTATISTICAS_VAZIAS;
   }

   const taxaDeAcertos =
      resultado.totalPerguntasRespondidas > 0 ? (resultado.perguntasAcertadas / resultado.totalPerguntasRespondidas) * 100 : 0;

   return {
      totalDeJogos: resultado.totalDeJogos,
      totalGanhos: resultado.totalGanhos,
      perguntasAcertadas: resultado.perguntasAcertadas,
      totalPerguntasRespondidas: resultado.totalPerguntasRespondidas,
      taxaDeAcertos: Number(taxaDeAcertos.toFixed(1)),
   };
}

export async function obterEstatisticas() {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      redirect("/entrar");
   }

   const agora = new Date();

   const temporadaAtual = await Temporada.findOne({
      status: "em_andamento",
      dataInicio: { $lte: agora },
      dataFim: { $gt: agora },
   }).lean<ITemporada>();

   if (!temporadaAtual) {
      return {
         ...ESTATISTICAS_VAZIAS,
         diferencaTotalDeJogos: 0,
         diferencaTotalGanhos: 0,
         diferencaPerguntasAcertadas: 0,
         diferencaTaxaDeAcertos: 0,
         temComparacao: false,
      };
   }

   const atual = await calcularEstatisticasTemporada(sessao.usuario._id, temporadaAtual);

   const temporadaAnterior = await Temporada.findOne({
      numero: temporadaAtual.numero - 1,
      status: "finalizada",
   }).lean<ITemporada>();

   if (!temporadaAnterior) {
      return {
         ...atual,
         diferencaTotalDeJogos: 0,
         diferencaTotalGanhos: 0,
         diferencaPerguntasAcertadas: 0,
         diferencaTaxaDeAcertos: 0,
         temComparacao: false,
      };
   }

   const anterior = await calcularEstatisticasTemporada(sessao.usuario._id, temporadaAnterior);

   // Variação percentual de jogos em relação à temporada anterior.
   const diferencaTotalDeJogos =
      anterior.totalDeJogos > 0 ? Math.round(((atual.totalDeJogos - anterior.totalDeJogos) / anterior.totalDeJogos) * 100) : 0;

   return {
      ...atual,
      diferencaTotalDeJogos,
      diferencaTotalGanhos: atual.totalGanhos - anterior.totalGanhos,
      diferencaPerguntasAcertadas: atual.perguntasAcertadas - anterior.perguntasAcertadas,
      diferencaTaxaDeAcertos: Number((atual.taxaDeAcertos - anterior.taxaDeAcertos).toFixed(1)),
      temComparacao: true,
   };
}
