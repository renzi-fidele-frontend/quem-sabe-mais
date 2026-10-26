"use server";
import { dbConnect } from "@/lib/db/dbConnect";
import Temporada from "@/models/Temporada";
import { finalizarTemporada } from "./finalizarTemporada";

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

   // Se a última temporada terminou, finalizá-la e criar a próxima.
   if (ultimaTemporada.dataFim.getTime() <= agora.getTime()) {
      const finalizada = await finalizarTemporada(ultimaTemporada._id.toString());

      // Se outra chamada já a finalizou, verificar se existe uma temporada atual.
      if (!finalizada) {
         const temporadaEmAndamento = await Temporada.findOne({
            status: "em_andamento",
            dataInicio: { $lte: new Date() },
            dataFim: { $gt: new Date() },
         });

         if (temporadaEmAndamento) {
            return temporadaEmAndamento;
         }
      }

      // Criar a próxima temporada.
      try {
         return await Temporada.create({
            numero: ultimaTemporada.numero + 1,
            dataInicio: agora,
            dataFim: new Date(agora.getTime() + DURACAO_TEMPORADA),
            status: "em_andamento",
         });
      } catch (error) {
         // Outra chamada pode ter criado a temporada entretanto.
         const temporadaCriada = await Temporada.findOne({
            status: "em_andamento",
            dataInicio: { $lte: new Date() },
            dataFim: { $gt: new Date() },
         });

         if (temporadaCriada) {
            return temporadaCriada;
         }

         // Se não existir uma temporada ativa, propagar o erro original.
         throw error;
      }
   }

   throw new Error("Não foi possível determinar a temporada atual.");
}
