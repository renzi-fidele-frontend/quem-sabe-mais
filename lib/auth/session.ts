import crypto from "crypto";
import { dbConnect } from "../dbConnect";
import { ISessao, Sessao } from "@/models/Sessao";
import { cookies } from "next/headers";
import { IUsuario, Usuario } from "@/models/Usuario";
import { cache } from "react";

const SESSION_COOKIE = "quiz_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 dias

function hashToken(token: string) {
   return crypto.createHash("sha256").update(token).digest("hex");
}

export async function criarSessao(userId: string) {
   await dbConnect();

   //    Criando o token
   const token = crypto.randomBytes(32).toString("hex");
   const tokenHash = hashToken(token);

   //    Calcular o tempo de expiração da sessão
   const expiresAt = new Date(Date.now() + SESSION_DURATION);

   await Sessao.create({ usuarioId: userId, tokenHash, expiresAt });

   //    Armazendo o token no cookie
   const cookieStore = await cookies();
   cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
   });
}

export const obterSessao = cache(async () => {
   await dbConnect();

   const cookieStore = await cookies();
   const token = cookieStore.get(SESSION_COOKIE)?.value;

   if (!token) {
      return null;
   }

   const tokenHash = hashToken(token);

   const sessao = await Sessao.findOne({ tokenHash, expiresAt: { $gt: new Date() } }).lean<ISessao>();

   return sessao;
});

export const obterSessaoComUsuario = cache(async () => {
   const sessao = await obterSessao();

   if (!sessao) {
      return null;
   }

   const usuario = await Usuario.findById(sessao.usuarioId).lean<IUsuario>();

   // Assim caso eu desative uma conta, ela vai ser removida da sessão
   if (!usuario || !usuario.ativo) {
      await Sessao.deleteOne({
         _id: sessao._id,
      });
      return null;
   }

   return { sessao, usuario };
});
