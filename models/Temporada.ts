import { model, models, Schema, Types } from "mongoose";

export type StatusTemporada = "agendada" | "em_andamento" | "finalizada";

export interface ITemporada {
   numero: number;
   dataInicio: Date;
   dataFim: Date;
   status: StatusTemporada;
   _id: Types.ObjectId;
}

const temporadaSchema = new Schema<ITemporada>({
   numero: { type: Number, required: true, unique: true },
   dataInicio: { type: Date, required: true, unique: true },
   dataFim: { type: Date, required: true, unique: true },
   status: { type: String, required: true, enum: ["agendada", "em_andamento", "finalizada"] },
});

const Temporada = models.Temporada || model<ITemporada>("Temporada", temporadaSchema);

export default Temporada;
