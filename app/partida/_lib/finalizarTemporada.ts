"use server";
import { Types } from "mongoose";
import { dbConnect } from "@/lib/db/dbConnect";
import Partida from "@/models/Partida";
import Temporada from "@/models/Temporada";

const PREMIOS = [500, 300, 200] as const;

export async function finalizarTemporada(temporadaId: string) {
   await dbConnect();

   if (!Types.ObjectId.isValid(temporadaId)) {
      throw new Error("ID da temporada inválido.");
   }

   const agora = new Date();

   // Confirmar que a temporada existe e já terminou.
   const temporada = await Temporada.findOne({
      _id: temporadaId,
      status: "em_andamento",
      dataFim: { $lte: agora },
   }).lean();

   if (!temporada) {
      return false;
   }

   // Somar o valor final de todas as partidas concluídas
   // de cada jogador nesta temporada.
   const classificacao = await Partida.aggregate<{
      _id: Types.ObjectId;
      pontuacao: number;
   }>([
      {
         $match: {
            temporadaId: temporada._id,
            status: {
               $in: ["vitoria", "eliminado", "abandonado", "abandonada"],
            },
            dataFim: { $exists: true, $ne: null },
         },
      },
      {
         $group: {
            _id: "$usuarioId",
            pontuacao: { $sum: "$valorAtual" },
         },
      },
      {
         $sort: {
            pontuacao: -1,
            _id: 1,
         },
      },
      {
         $limit: 3,
      },
   ]);

   const vencedores = classificacao.map((jogador, index) => ({
      usuarioId: jogador._id,
      posicao: index + 1,
      pontuacao: jogador.pontuacao,
      premio: PREMIOS[index],
   }));

   // Só uma chamada consegue finalizar a temporada.
   // Chamadas de estranhos não substituem os vencedores depois de a temporada ter sido finalizada.
   const resultado = await Temporada.updateOne(
      {
         _id: temporada._id,
         status: "em_andamento",
         dataFim: { $lte: agora },
      },
      {
         $set: {
            status: "finalizada",
            vencedores,
            dataFinalizacao: agora,
         },
      },
   );

   return resultado.modifiedCount === 1;
}
