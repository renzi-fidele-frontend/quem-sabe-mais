"use server";
import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import { redirect } from "next/navigation";

export type DadoDesempenhoPerguntas = {
   data: string;
   valor: number;
};

export async function obterDesempenhoPerguntas(dias: number = 7): Promise<DadoDesempenhoPerguntas[]> {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      redirect("/entrar");
   }

   const agora = new Date();

   // Data de hoje à meia-noite em Maputo
   const dataHoje = new Date(
      agora.toLocaleDateString("en-CA", {
         timeZone: "Africa/Maputo",
      }) + "T00:00:00+02:00",
   );

   const dataFinal = new Date(dataHoje);
   dataFinal.setDate(dataFinal.getDate() + 1);

   const dataInicial = new Date(dataHoje);

   if (dias > 0) {
      dataInicial.setDate(dataInicial.getDate() - (dias - 1));
   }

   const filtroDatas =
      dias > 0
         ? {
              "respondidas.respondidaEm": {
                 $gte: dataInicial,
                 $lt: dataFinal,
              },
           }
         : {};

   return Partida.aggregate([
      {
         $match: {
            usuarioId: sessao.usuario._id,
         },
      },
      {
         $unwind: "$respondidas",
      },
      //    Filtra as partidas por data
      { $match: filtroDatas },
      //   Agrupa as partidas por dia e soma o valor das respostas corretas
      {
         $group: {
            _id: {
               $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$respondidas.respondidaEm",
                  timezone: "Africa/Maputo",
               },
            },
            valor: {
               $sum: {
                  $cond: [{ $eq: ["$respondidas.correta", true] }, 1, 0],
               },
            },
         },
      },
      {
         $project: {
            _id: 0,
            data: {
               $dateFromString: {
                  dateString: "$_id",
                  timezone: "Africa/Maputo",
               },
            },
            valor: 1,
         },
      },
      //   Densifica os dados para preencher os dias faltantes
      {
         $densify: {
            field: "data",
            range: {
               step: 1,
               unit: "day",
               bounds: dias > 0 ? [dataInicial, dataFinal] : "full",
            },
         },
      },
      //   Preenche os dias sem respostas com 0
      {
         $fill: {
            output: {
               valor: { value: 0 },
            },
         },
      },
      {
         $project: {
            _id: 0,
            data: {
               $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$data",
                  timezone: "Africa/Maputo",
               },
            },
            valor: 1,
         },
      },
      {
         $sort: {
            data: 1,
         },
      },
   ]);
}
