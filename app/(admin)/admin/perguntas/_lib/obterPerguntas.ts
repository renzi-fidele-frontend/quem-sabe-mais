"use server";

import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import { IPergunta, Pergunta } from "@/models/Pergunta";
import { Categoria } from "@/models/Categoria";
console.log(Categoria);
export interface IPerguntaComCategoria extends Omit<IPergunta, "categoria"> {
   categoria: {
      _id: string;
      nome: string;
   };
}

export async function obterPerguntas(paginaAtual = 1, limitePorPagina = 10) {
   await dbConnect();

   // Verificar autenticação e autorização
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Utilizador não autenticado.");
   }

   if (sessao.usuario.role !== "admin") {
      throw new Error("Não tens permissão para aceder a esta área.");
   }

   // Obter o total de perguntas
   const totalPerguntas = await Pergunta.countDocuments();

   // Calcular o total de páginas
   const totalPaginas = Math.max(1, Math.ceil(totalPerguntas / limitePorPagina));

   // Garantir que a página solicitada é válida
   paginaAtual = Math.min(Math.max(1, Math.floor(paginaAtual)), totalPaginas);

   // Calcular quantos documentos ignorar
   const skip = (paginaAtual - 1) * limitePorPagina;

   // Obter perguntas da página atual
   const perguntas = await Pergunta.find()
      .populate("categoria")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitePorPagina)
      .lean<IPerguntaComCategoria[]>();

   return {
      perguntas,
      totalPerguntas,
      totalPaginas,
      paginaAtual,
      limitePorPagina,
   };
}
