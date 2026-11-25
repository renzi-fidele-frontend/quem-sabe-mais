import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";

export default async function verificarPermissaoAdmin() {
   await dbConnect();

   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Utilizador não autenticado.");
   }

   if (sessao.usuario.role !== "admin") {
      throw new Error("Não tens permissão para realizar esta operação.");
   }
}
