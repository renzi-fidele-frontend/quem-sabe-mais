import { Document, model, models, Schema, Types } from "mongoose";

export type StatusPartida = "em_andamento" | "vitoria" | "eliminado" | "abandonado";

export interface IRespostaPartida {
   perguntaId: Types.ObjectId;
   numero: number;
   respostaEscolhida?: string;
   correta?: boolean;
   valor: number;
   respondidaEm?: Date;
}

export interface IPartida extends Document {
   usuarioId: Types.ObjectId;

   perguntas: Types.ObjectId[];

   respondidas: IRespostaPartida[];

   perguntaAtual: number;

   valorAtual: number;
   valorGarantido: number;

   status: StatusPartida;

   ajuda50Usada: boolean;
   pularPerguntaUsado: boolean;
   ajudaPublicaUsada: boolean;

   dataInicio: Date;
   dataFim?: Date;
}

const respostaPartidaSchema = new Schema<IRespostaPartida>(
   {
      perguntaId: {
         type: Schema.Types.ObjectId,
         ref: "Pergunta",
         required: true,
      },

      numero: {
         type: Number,
         required: true,
         min: 1,
         max: 15,
      },

      respostaEscolhida: {
         type: String,
         trim: true,
      },

      correta: {
         type: Boolean,
      },

      valor: {
         type: Number,
         required: true,
         min: 0,
      },

      respondidaEm: {
         type: Date,
      },
   },
   { _id: false },
);

const partidaSchema = new Schema<IPartida>(
   {
      usuarioId: {
         type: Schema.Types.ObjectId,
         ref: "Usuario",
         required: true,
         index: true,
      },

      perguntas: {
         type: [Schema.Types.ObjectId],
         ref: "Pergunta",
         required: true,
      },

      respondidas: {
         type: [respostaPartidaSchema],
         required: true,
         default: [],
      },

      perguntaAtual: {
         type: Number,
         required: true,
         default: 1,
         min: 1,
         max: 15,
      },

      valorAtual: {
         type: Number,
         required: true,
         default: 0,
         min: 0,
      },

      valorGarantido: {
         type: Number,
         required: true,
         default: 0,
         min: 0,
      },

      status: {
         type: String,
         enum: ["em_andamento", "vitoria", "eliminado", "abandonado"],
         default: "em_andamento",
         index: true,
      },

      ajuda50Usada: {
         type: Boolean,
         default: false,
      },

      pularPerguntaUsado: {
         type: Boolean,
         default: false,
      },

      ajudaPublicaUsada: {
         type: Boolean,
         default: false,
      },

      dataInicio: {
         type: Date,
         required: true,
         default: Date.now,
      },

      dataFim: {
         type: Date,
      },
   },
   { collection: "Partidas" },
);

partidaSchema.index({ usuarioId: 1 });

const Partida = models.Partida || model<IPartida>("Partida", partidaSchema);

export default Partida;
