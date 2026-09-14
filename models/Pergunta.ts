import { Document, model, models, Schema, Types } from "mongoose";

export type DificuldadePergunta = "fácil" | "média" | "difícil";

export interface IAlternativa {
   id: string;
   texto: string;
}

export interface IPergunta extends Document {
   enunciado: string;
   imagem: string;
   alternativas: IAlternativa[];
   respostaCorreta: string;
   categoria: Types.ObjectId; // Projeção
   dificuldade: DificuldadePergunta;
   ativa: boolean;
   createdAt: Date;
   updatedAt: Date;
}

const alternativaSchema = new Schema<IAlternativa>(
   {
      id: {
         type: String,
         required: true,
      },
      texto: {
         type: String,
         required: true,
         trim: true,
      },
   },
   { _id: false },
);

const perguntaSchema = new Schema<IPergunta>(
   {
      enunciado: {
         type: String,
         required: true,
         trim: true,
      },

      imagem: {
         type: String,
         required: true,
      },

      alternativas: {
         type: [alternativaSchema],
         required: true,
         validate: {
            validator: (alternativas: IAlternativa[]) => alternativas.length === 4,
            message: "A pergunta deve possuir exatamente 4 alternativas.",
         },
      },

      respostaCorreta: {
         type: String,
         required: true,
      },

      categoria: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: "Categoria",
         index: true,
      },

      dificuldade: {
         type: String,
         enum: ["fácil", "média", "difícil"],
         required: true,
      },

      ativa: {
         type: Boolean,
         default: true,
      },
   },
   {
      timestamps: true,
      collection: "Perguntas",
   },
);

export const Pergunta = models.Pergunta || model<IPergunta>("Pergunta", perguntaSchema);
