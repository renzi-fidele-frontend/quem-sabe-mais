import { model, models, Schema, Types } from "mongoose";

export type StatusTemporada = "agendada" | "em_andamento" | "finalizada";

export interface IVencedorTemporada {
   usuarioId: Types.ObjectId;
   posicao: number;
   pontuacao: number;
   premio: number;
}

export interface ITemporada {
   numero: number;
   dataInicio: Date;
   dataFim: Date;
   status: StatusTemporada;
   /** Guarda os três jogadores premiados */
   vencedores: IVencedorTemporada[];
   /** Regista quando a temporada foi efectivamente encerrada */
   dataFinalizacao?: Date;
   _id: Types.ObjectId;
}

const vencedorTemporadaSchema = new Schema<IVencedorTemporada>(
   {
      usuarioId: {
         type: Schema.Types.ObjectId,
         ref: "Usuario",
         required: true,
      },
      posicao: {
         type: Number,
         required: true,
         min: 1,
         max: 3,
      },
      pontuacao: {
         type: Number,
         required: true,
         min: 0,
      },
      premio: {
         type: Number,
         required: true,
         min: 0,
      },
   },
   { _id: false },
);

const temporadaSchema = new Schema<ITemporada>(
   {
      numero: { type: Number, required: true, unique: true },
      dataInicio: { type: Date, required: true },
      dataFim: { type: Date, required: true },
      status: { type: String, required: true, enum: ["agendada", "em_andamento", "finalizada"] },
      vencedores: {
         type: [vencedorTemporadaSchema],
         default: [],
      },
      dataFinalizacao: {
         type: Date,
      },
   },
   { collection: "temporadas" },
);

// Garante que só existe uma temporada em andamento
temporadaSchema.index(
   { status: 1 },
   {
      unique: true,
      partialFilterExpression: {
         status: "em_andamento",
      },
   },
);

const Temporada = models.Temporada || model<ITemporada>("Temporada", temporadaSchema);

export default Temporada;
