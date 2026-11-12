import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";

export async function obterXp() {
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      return null;
   }

   return sessao.usuario.xp;
}
