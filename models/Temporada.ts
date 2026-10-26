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
      dataInicio: { type: Date, required: true, unique: true },
      dataFim: { type: Date, required: true, unique: true },
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

const Temporada = models.Temporada || model<ITemporada>("Temporada", temporadaSchema);

export default Temporada;
