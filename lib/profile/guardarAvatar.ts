"use server";

import { Usuario } from "@/models/Usuario";
import { obterSessaoComUsuario } from "../auth/session";
import { dbConnect } from "../dbConnect";

export async function guardarAvatar(path: string) {
   await dbConnect();

   try {
      const user = await obterSessaoComUsuario();
      await Usuario.updateOne({ _id: user?.usuario._id }, { avatarUrl: path });
   } catch (error) {
      console.log("Erro ao salvar o avatar:", error);
   }
}
