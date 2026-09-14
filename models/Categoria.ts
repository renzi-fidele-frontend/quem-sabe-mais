import { Document, model, models, Schema } from "mongoose";

export interface ICategoria extends Document {
   nome: string;

   descricao?: string;
}

const categoriaSchema = new Schema<ICategoria>(
   {
      nome: {
         type: String,
         required: true,
         trim: true,
      },

      descricao: {
         type: String,
         trim: true,
      },
   },
   { collection: "Categorias" },
);

export const Categoria = models.Categoria || model<ICategoria>("Categoria", categoriaSchema);
