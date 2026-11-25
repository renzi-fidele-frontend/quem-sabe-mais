"use server";
import { DificuldadePergunta, Pergunta } from "@/models/Pergunta";
import validarIdPergunta from "./validarIdPergunta";
import verificarPermissaoAdmin from "./verificarPermissaoAdmin";
import { Types } from "mongoose";
import { carregar_imagem, remover_imagem } from "@/lib/upload/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Categoria } from "@/models/Categoria";

export default async function editarPergunta(formData: FormData) {
   console.log("Iniciando a editar a pergunta...");
   await verificarPermissaoAdmin();

   const TIPOS_IMAGEM = ["image/jpeg", "image/png", "image/webp"];
   const TAMANHO_MAXIMO_IMAGEM = 5 * 1024 * 1024; // 5 MB

   const perguntaId = String(formData.get("perguntaId") ?? "");
   validarIdPergunta(perguntaId);

   const pergunta = await Pergunta.findById(perguntaId);

   if (!pergunta) {
      throw new Error("Pergunta não encontrada.");
   }

   // 1. Obter os dados do formulário
   const enunciado = String(formData.get("enunciado") ?? "").trim();

   const alternativas = [
      { id: "A", texto: String(formData.get("alternativa_a") ?? "").trim() },
      { id: "B", texto: String(formData.get("alternativa_b") ?? "").trim() },
      { id: "C", texto: String(formData.get("alternativa_c") ?? "").trim() },
      { id: "D", texto: String(formData.get("alternativa_d") ?? "").trim() },
   ];

   const respostaCorreta = String(formData.get("respostaCorreta") ?? "");
   const categoriaId = String(formData.get("categoria") ?? "");
   const dificuldade = String(formData.get("dificuldade") ?? "") as DificuldadePergunta;
   const ativa = formData.get("pergunta_ativa") === "on";
   const ficheiro = formData.get("imagem");

   // 2. Validar os campos
   if (!enunciado) {
      throw new Error("O enunciado da pergunta é obrigatório.");
   }

   if (alternativas.some((alternativa) => !alternativa.texto)) {
      throw new Error("Preenche as quatro alternativas.");
   }

   if (!["A", "B", "C", "D"].includes(respostaCorreta)) {
      throw new Error("Seleciona uma resposta correta válida.");
   }

   if (!Types.ObjectId.isValid(categoriaId)) {
      throw new Error("Seleciona uma categoria válida.");
   }

   const categoriaExiste = await Categoria.exists({
      _id: categoriaId,
      ativa: true,
   });

   if (!categoriaExiste) {
      throw new Error("A categoria selecionada não existe ou está inativa.");
   }

   // 3. Validar o ficheiro, se uma nova imagem foi selecionada
   let novaImagem: File | null = null;

   if (ficheiro instanceof File && ficheiro.size > 0) {
      if (!TIPOS_IMAGEM.includes(ficheiro.type)) {
         throw new Error("A imagem deve estar no formato JPG, PNG ou WebP.");
      }

      if (ficheiro.size > TAMANHO_MAXIMO_IMAGEM) {
         throw new Error("A imagem não pode ultrapassar 5 MB.");
      }

      novaImagem = ficheiro;
   }

   // Se não houver imagem atual nem uma nova, não é possível guardar
   if (!novaImagem && (!pergunta.imagem || !pergunta.idImagem)) {
      throw new Error("Adiciona uma imagem à pergunta.");
   }

   const imagemAntigaId = pergunta.idImagem;
   let novaImagemId: string | null = null;

   try {
      // 4. Carregar a nova imagem, se foi selecionada
      if (novaImagem) {
         const upload = await carregar_imagem(novaImagem);

         pergunta.imagem = upload.secure_url;
         pergunta.idImagem = upload.public_id;
         novaImagemId = upload.public_id;
      }

      // 5. Atualizar os restantes campos
      pergunta.enunciado = enunciado;
      pergunta.alternativas = alternativas;
      pergunta.respostaCorreta = respostaCorreta;
      pergunta.categoria = new Types.ObjectId(categoriaId);
      pergunta.dificuldade = dificuldade;
      pergunta.ativa = ativa;

      await pergunta.save();
   } catch (error) {
      // Se o upload ocorreu, mas a gravação falhou, limpar a imagem nova
      if (novaImagemId) {
         try {
            await remover_imagem(novaImagemId);
         } catch (erroLimpeza) {
            console.error("Erro ao limpar a nova imagem após falha na edição:", erroLimpeza);
         }
      }

      console.error("Erro ao editar pergunta:", error);
      throw new Error("Não foi possível guardar as alterações. Tenta novamente.");
   }

   // 6. A pergunta já foi guardada; agora é seguro remover a imagem antiga
   if (novaImagemId && imagemAntigaId && imagemAntigaId !== novaImagemId) {
      try {
         await remover_imagem(imagemAntigaId);
      } catch (error) {
         console.error("Erro ao remover a imagem antiga do Cloudinary:", error);
      }
   }

   revalidatePath("/admin/perguntas");
   redirect("/admin/perguntas?sucesso=editada");
}
