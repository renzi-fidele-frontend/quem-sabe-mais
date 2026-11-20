"use server";
import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import { remover_imagem } from "@/lib/upload/cloudinary";
import { Pergunta } from "@/models/Pergunta";
import Partida from "@/models/Partida";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

async function verificarPermissaoAdmin() {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Utilizador não autenticado.");
   }

   if (sessao.usuario.role !== "admin") {
      throw new Error("Não tens permissão para realizar esta operação.");
   }
}

function validarIdPergunta(id: string) {
   if (!Types.ObjectId.isValid(id)) {
      throw new Error("Identificador de pergunta inválido.");
   }
}

// Desativar ou reativar pergunta
export async function alternarEstadoPergunta(id: string) {
   await verificarPermissaoAdmin();
   validarIdPergunta(id);

   const pergunta = await Pergunta.findById(id).select("ativa");

   if (!pergunta) {
      throw new Error("Pergunta não encontrada.");
   }

   pergunta.ativa = !pergunta.ativa;
   await pergunta.save();

   revalidatePath("/admin/perguntas");
}

