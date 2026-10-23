import { dbConnect } from "@/lib/db/dbConnect";
import Temporada from "@/models/Temporada";

// 14 dias
const DURACAO_TEMPORADA = 14 * 24 * 60 * 60 * 1000;

export async function obterTemporadaAtual() {
   await dbConnect();

   const agora = new Date();

   // Procurar uma temporada que esteja dentro do seu período.
   const temporadaAtual = await Temporada.findOne({
      status: "em_andamento",
      dataInicio: { $lte: agora },
      dataFim: { $gt: agora },
   });

   if (temporadaAtual) {
      return temporadaAtual;
   }

   // Procurar a temporada mais recente.
   const ultimaTemporada = await Temporada.findOne().sort({ numero: -1 });

   // Primeira execução: criar a Temporada 1.
   if (!ultimaTemporada) {
      try {
         return await Temporada.create({
            numero: 1,
            dataInicio: agora,
            dataFim: new Date(agora.getTime() + DURACAO_TEMPORADA),
            status: "em_andamento",
         });
      } catch (error) {
         // Se outra chamada criou a temporada simultaneamente,
         // recuperar o registo já criado.
         const temporadaCriada = await Temporada.findOne({
            status: "em_andamento",
            dataInicio: { $lte: new Date() },
            dataFim: { $gt: new Date() },
         });

         if (temporadaCriada) {
            return temporadaCriada;
         }

         throw error;
      }
   }

   // Não iniciar outra temporada sem processar a anterior.
   if (ultimaTemporada.dataFim.getTime() <= agora.getTime()) {
      throw new Error("A temporada anterior precisa de ser finalizada antes de iniciar a seguinte.");
   }

   throw new Error("Não foi possível determinar a temporada atual.");
}
