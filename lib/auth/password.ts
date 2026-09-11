import * as argon2 from "argon2";

export async function criptografarSenha(senha: string) {
   return await argon2.hash(senha, { type: argon2.argon2id });
}

export async function verificarSenha(senha: string, senhaCriptografada: string) {
   return await argon2.verify(senhaCriptografada, senha);
}
