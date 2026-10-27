import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import { redirect } from "next/navigation";

export type DadoDesempenhoPerguntas = {
   data: string;
   valor: number;
};

export async function obterDesempenhoPerguntas(): Promise<DadoDesempenhoPerguntas[]> {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      redirect("/entrar");
   }

   return Partida.aggregate([
      {
         $match: {
            usuarioId: sessao.usuario._id,
         },
      },
      {
         $unwind: "$respondidas",
      },
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
               bounds: "full",
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
