"use server";

import { MAX_PARTIDAS_DIARIAS, TOTAL_PERGUNTAS } from "@/data/jogo";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import { dbConnect } from "@/lib/dbConnect";
import Partida from "@/models/Partida";
import { Pergunta } from "@/models/Pergunta";
import { Types } from "mongoose";
import { redirect } from "next/navigation";

export async function iniciarPartida() {
   await dbConnect();
   let partida;

   try {
      const usuario = await obterSessaoComUsuario();

      if (!usuario) {
         throw new Error("Usuário não encontrado");
      }

      const inicioDoDia = new Date();
      inicioDoDia.setHours(0, 0, 0, 0);

      const fimDoDia = new Date();
      fimDoDia.setHours(23, 59, 59, 999);

      const partidasHoje = await Partida.countDocuments({
         usuarioId: usuario.usuario._id,
         createdAt: {
            $gte: inicioDoDia,
            $lte: fimDoDia,
         },
      });

      //    Caso se exceda o limite diário
      if (partidasHoje >= MAX_PARTIDAS_DIARIAS) {
         throw new Error("Limite de partidas diárias atingido");
      }

      //    Buscando 15 perguntas aleatórias
      //    TODO: Mais tarde buscar as perguntas por dificuldade para melhoria da experiência
      const perguntas = await Pergunta.aggregate([{ $sample: { size: TOTAL_PERGUNTAS } }, { $project: { respostaCorreta: -1 } }]);

      //    Caso não se ache o total de 15 perguntas
      //   TODO: Após testes bloqueiar cas de perguntas insuficientes
      /* if (perguntas.length < TOTAL_PERGUNTAS) {
         console.log(perguntas.length, TOTAL_PERGUNTAS);
         throw new Error("Não foram encontradas perguntas suficientes");
      } */

      //    Criando a partida
      partida = await Partida.create({
         usuarioId: new Types.ObjectId(usuario.usuario._id),
         perguntas: perguntas.map((pergunta) => pergunta._id),
         respondidas: [],
         perguntaAtual: 1,
         valorAtual: 0,
         valorGarantido: 0,
         status: "em_andamento",
         ajuda50Usada: false,
         pularPerguntaUsado: false,
         ajudaPublicaUsada: false,
         dataInicio: new Date(),
      });
   } catch (error) {
      console.log("Erro ao inicializar uma partida!");
      console.log(error);
   } finally {
      redirect("/partida/" + partida._id.toString());
   }
}
