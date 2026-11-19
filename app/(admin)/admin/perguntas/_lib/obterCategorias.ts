import { obterSessaoComUsuario } from "@/app/(auth)/_lib/session";
import { dbConnect } from "@/lib/db/dbConnect";
import { Categoria, ICategoria } from "@/models/Categoria";

export async function obterCategorias() {
   await dbConnect();

   // Verificar autenticação e autorização
   const sessao = await obterSessaoComUsuario();

   if (!sessao) {
      throw new Error("Utilizador não autenticado.");
   }

   return await Categoria.find().lean<ICategoria[]>();
}
