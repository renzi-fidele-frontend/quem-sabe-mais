"use server";

import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import Temporada, { ITemporada } from "@/models/Temporada";
import { redirect } from "next/navigation";

export type DadoEvolucaoDinheiro = {
   data: string;
   valor: number;
};

const TIMEZONE = "Africa/Maputo";

function obterDataLocal(data: Date): string {
   return data.toLocaleDateString("en-CA", {
      timeZone: TIMEZONE,
   });
}

function gerarIntervaloDeDias(dataInicial: string, dataFinal: string): string[] {
   const datas: string[] = [];

   const cursor = new Date(`${dataInicial}T00:00:00Z`);
   const fim = new Date(`${dataFinal}T00:00:00Z`);

   while (cursor <= fim) {
      datas.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
   }

   return datas;
}

export async function obterEvolucaoDinheiroAcumulado(quantidadeTemporadas: number = 1): Promise<DadoEvolucaoDinheiro[]> {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      redirect("/entrar");
   }

   const agora = new Date();

   // Modo diário: temporada atual.
   if (quantidadeTemporadas === 1) {
      const temporada = await Temporada.findOne({
         status: "em_andamento",
         dataInicio: { $lte: agora },
         dataFim: { $gt: agora },
      }).lean<ITemporada>();

      if (!temporada) {
         return [];
      }

      const dataInicial = obterDataLocal(temporada.dataInicio);
      const dataFinal = obterDataLocal(agora);

      const resultados = await Partida.aggregate([
         {
            $match: {
               usuarioId: sessao.usuario._id,
               temporadaId: temporada._id,
               status: {
                  $in: ["vitoria", "eliminado", "abandonada"],
               },
               dataFim: {
                  $exists: true,
                  $ne: null,
                  $gte: temporada.dataInicio,
                  $lte: agora,
               },
            },
         },
         {
            $group: {
               _id: {
                  $dateToString: {
                     format: "%Y-%m-%d",
                     date: "$dataFim",
                     timezone: TIMEZONE,
                  },
               },
               valor: { $sum: "$valorAtual" },
            },
         },
      ]);

      const ganhosPorDia = new Map<string, number>(resultados.map((resultado) => [resultado._id, resultado.valor]));

      // Inclui também os dias em que não houve partidas.
      return gerarIntervaloDeDias(dataInicial, dataFinal).map((data) => ({
         data,
         valor: ganhosPorDia.get(data) ?? 0,
      }));
   }

   // Modo por temporada: últimas 5, últimas 10 ou todas.
   let consultaTemporadas = Temporada.find().sort({ numero: -1 });

   if (quantidadeTemporadas > 0) {
      consultaTemporadas = consultaTemporadas.limit(quantidadeTemporadas);
   }

   const temporadas = await consultaTemporadas.lean<ITemporada[]>();

   if (temporadas.length === 0) {
      return [];
   }

   temporadas.reverse();

   const idsTemporadas = temporadas.map((temporada) => temporada._id);

   const resultados = await Partida.aggregate([
      {
         $match: {
            usuarioId: sessao.usuario._id,
            temporadaId: { $in: idsTemporadas },
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
         $group: {
            _id: "$temporadaId",
            valor: { $sum: "$valorAtual" },
         },
      },
   ]);

   const ganhosPorTemporada = new Map<string, number>(resultados.map((resultado) => [resultado._id.toString(), resultado.valor]));

   return temporadas.map((temporada) => ({
      data: `Ep. ${temporada.numero}`,
      valor: ganhosPorTemporada.get(temporada._id.toString()) ?? 0,
   }));
}
