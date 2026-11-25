"use server";
import { remover_imagem } from "@/lib/upload/cloudinary";
import { IPergunta, Pergunta } from "@/models/Pergunta";
import Partida from "@/models/Partida";
import { revalidatePath } from "next/cache";
import verificarPermissaoAdmin from "./verificarPermissaoAdmin";
import validarIdPergunta from "./validarIdPergunta";

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

// Remover pergunta permanentemente
export async function removerPergunta(id: string) {
   await verificarPermissaoAdmin();
   validarIdPergunta(id);

   const pergunta = await Pergunta.findById<IPergunta>(id).select(["idImagem", "ativa"]);

   if (!pergunta) {
      throw new Error("Pergunta não encontrada.");
   }

   // Impedir a remoção de perguntas utilizadas em partidas
   const perguntaUtilizada = await Partida.exists({
      $or: [{ perguntas: pergunta._id }, { "respondidas.perguntaId": pergunta._id }],
   });

   if (perguntaUtilizada) {
      throw new Error("Esta pergunta já foi utilizada numa partida. Desativa-a em vez de a remover.");
   }

   // Remover o documento do MongoDB
   await Pergunta.findByIdAndDelete(id);

   // Remover a imagem do Cloudinary, caso exista
   if (pergunta.idImagem) {
      try {
         await remover_imagem(pergunta.idImagem);
      } catch (error) {
         console.error("Erro ao remover imagem do Cloudinary:", error);
         // A pergunta já foi removida do banco de dados.
         // O erro da imagem deve ser tratado como uma limpeza pendente.
      }
   }

   revalidatePath("/admin/perguntas");
}
