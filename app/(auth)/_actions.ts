"use server";
import { criarSessao } from "@/lib/auth/session";
import { criptografarSenha } from "@/lib/auth/password";
import { IUsuario, Usuario } from "@/models/Usuario";
import { dbConnect } from "@/lib/dbConnect";
import { redirect } from "next/navigation";
import * as argon2 from "argon2";

export async function criarConta(formData: FormData) {
   await dbConnect();

   const nomeCompleto = formData.get("nome_real") as string;
   const nickname = formData.get("username") as string;
   const email = formData.get("email") as string;
   const senha = formData.get("senha") as string;
   const confirmacao_senha = formData.get("confirmacao_senha") as string;
   const phoneMpesa = formData.get("telefone") as string;
   const passwordHash = await criptografarSenha(senha);

   try {
      // Resolvendo os erros
      if (confirmacao_senha !== senha) {
         throw new Error("As senhas devem ser iguais!");
      }
      if (senha.length < 8) {
         throw new Error("A senha deve ter pelo menos 8 caracteres!");
      }

      const usuario = new Usuario({ nomeCompleto, nickname, email, passwordHash, phoneMpesa }) as IUsuario;
      await usuario.save();

      await criarSessao(usuario._id.toString());

      redirect("/cadastro/escoher-avatar");
   } catch (error) {
      console.log(error);
   }
}

// TODO: Adicionar a funcionalidade de logar
export async function login(formData: FormData) {
   await dbConnect();

   const email = formData.get("email") as string;
   const senha = formData.get("senha") as string;

   try {
      const usuario = await Usuario.findOne({ email: email.trim().toLocaleLowerCase() }).select("+passwordHash").lean<IUsuario>();

      if (!usuario) {
         throw new Error("Email ou senha incorretos.");
      }

      if (!usuario.ativo) {
         throw new Error("Esta conta está desativada.");
      }

      const senhaValida = await argon2.verify(usuario.passwordHash, senha);

      if (!senhaValida) {
         throw new Error("Email ou senha incorretos.");
      }

      await criarSessao(usuario._id.toString());
   } catch (error) {
      console.log("Erro ao fazer login!");
      console.log(error);
   } finally {
      redirect("/");
   }
}

// TODO: Adicionar a funcionalidade de deslogar
export async function logout(formData: FormData) {}
