"use server";
import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import { IPergunta, Pergunta } from "@/models/Pergunta";
import { Categoria } from "@/models/Categoria";

export interface IPerguntaComCategoria extends Omit<IPergunta, "categoria"> {
   categoria: {
      _id: string;
      nome: string;
   };
}

export async function obterPerguntas() {
   await dbConnect();

   console.log(Categoria);

   // Verificar autenticação e autorização
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Utilizador não autenticado.");
   }

   if (sessao.usuario.role !== "admin") {
      throw new Error("Não tens permissão para aceder a esta área.");
   }

   const perguntas = await Pergunta.find().populate("categoria").sort({ createdAt: -1 }).lean<IPerguntaComCategoria[]>();

   return perguntas;
}
