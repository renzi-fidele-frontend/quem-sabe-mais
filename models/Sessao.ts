import { Document, model, models, Schema, Types } from "mongoose";

export interface ISessao extends Document {
   usuarioId: Types.ObjectId;
   tokenHash: string;
   expiresAt: Date;
   createdAt: Date;
   updatedAt: Date;
}

const schemaDaSessao = new Schema<ISessao>(
   {
      usuarioId: {
         type: Schema.Types.ObjectId,
         ref: "Usuario",
         required: true,
         index: true,
      },

      tokenHash: {
         type: String,
         required: true,
         unique: true,
      },

      expiresAt: {
         type: Date,
         required: true,
      },
   },
   {
      timestamps: true,
      collection: "Sessoes",
   },
);

// O índice TTL faz o MongoDB remover automaticamente as sessões expiradas.
schemaDaSessao.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Sessao = models.Sessao || model<ISessao>("Sessao", schemaDaSessao);
