"use server";
import { IUsuario, Usuario } from "@/models/Usuario";

// TODO: Adicionando a funcionalidade de criar uma conta
export async function criarConta(formData: FormData) {
   const nomeCompleto = formData.get("nome_real") as string;
   const nickname = formData.get("username") as string;
   const email = formData.get("email") as string;
   const passwordHash = formData.get("senha") as string;
   const confirmacao_senha = formData.get("confirmacao_senha") as string;
   const phoneMpesa = formData.get("telefone") as string;

   try {
      // Resolvendo os erros
      if (confirmacao_senha !== passwordHash) {
         throw new Error("As senhas devem ser iguais!");
      }
      if (passwordHash.length < 8) {
         throw new Error("A senha deve ter pelo menos 8 caracteres!");
      }

      const usuario = new Usuario({ nomeCompleto, nickname, email, passwordHash, phoneMpesa }) as IUsuario;
      await usuario.save();

      return { usuario };

      // TODO: Implementar autenticação
   } catch (error) {
      console.log(error);
   }
}

// TODO: Adicionar a funcionalidade de logar
export async function login(formData: FormData) {}

// TODO: Adicionar a funcionalidade de deslogar
export async function logout(formData: FormData) {}

// TODO: Adicionar a funcionalidade de verificar se o usuário está logado
export async function isLoggedIn() {}
