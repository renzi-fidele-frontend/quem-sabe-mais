"use server";

import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import { carregar_imagem, remover_imagem } from "@/lib/upload/cloudinary";
import { Categoria } from "@/models/Categoria";
import { Pergunta, DificuldadePergunta } from "@/models/Pergunta";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

const DIFICULDADES: DificuldadePergunta[] = ["fácil", "média", "difícil"];
const TIPOS_IMAGEM = ["image/jpeg", "image/png", "image/webp"];
const TAMANHO_MAXIMO_IMAGEM = 5 * 1024 * 1024; // 5 MB

export async function criarPergunta(formData: FormData) {
   await dbConnect();

   // 1. Verificar autenticação e autorização
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Utilizador não autenticado.");
   }

   if (sessao.usuario.role !== "admin") {
      throw new Error("Não tens permissão para realizar esta operação.");
   }

   // 2. Obter os dados do formulário
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

   // 3. Validar os dados
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

   if (!DIFICULDADES.includes(dificuldade)) {
      throw new Error("Seleciona uma dificuldade válida.");
   }

   const categoriaExiste = await Categoria.exists({
      _id: categoriaId,
      ativa: true,
   });

   if (!categoriaExiste) {
      throw new Error("A categoria selecionada não existe ou está inativa.");
   }

   // 4. Validar a imagem, caso tenha sido enviada
   let imagem: File | null = null;

   if (ficheiro instanceof File && ficheiro.size > 0) {
      if (!TIPOS_IMAGEM.includes(ficheiro.type)) {
         throw new Error("A imagem deve estar no formato JPG, PNG ou WebP.");
      }

      if (ficheiro.size > TAMANHO_MAXIMO_IMAGEM) {
         throw new Error("A imagem não pode ultrapassar 5 MB.");
      }

      imagem = ficheiro;
   }

   // 5. Carregar imagem e guardar pergunta
   let publicIdImagem: string | null = null;

   try {
      let imagemUrl = "";

      if (imagem) {
         const upload = await carregar_imagem(imagem);

         imagemUrl = upload.secure_url;
         publicIdImagem = upload.public_id;
      }

      await Pergunta.create({
         enunciado,
         imagem: imagemUrl,
         idImagem: publicIdImagem,
         alternativas,
         respostaCorreta,
         categoria: new Types.ObjectId(categoriaId),
         dificuldade,
         ativa,
      });
   } catch (error) {
      // Se a gravação falhar depois do upload, remover a imagem do Cloudinary
      if (publicIdImagem) {
         await remover_imagem(publicIdImagem);
      }

      console.error("Erro ao criar pergunta:", error);

      throw new Error("Não foi possível guardar a pergunta. Tenta novamente.");
   }

   // 6. Atualizar a listagem e fechar o modal
   revalidatePath("/admin/perguntas");
   redirect("/admin/perguntas?sucesso=criada");
}
