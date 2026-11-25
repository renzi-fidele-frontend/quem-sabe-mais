import { Types } from "mongoose";

export default function validarIdPergunta(id: string) {
   if (!Types.ObjectId.isValid(id)) {
      throw new Error("Identificador de pergunta inválido.");
   }
}
