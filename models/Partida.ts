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

   // Deverei incrementar aqui quando uma pergunta for acertada
   /** Número da pergunta que o jogador está respondendo atualmente */
   perguntaAtual: number;
   valorAtual: number;

   // Deverei incrementar aqui quando um checkpoint for alcançado
   /** Último valor de checkpoint alcançado pelo jogador */
   valorGarantido: number;

   status: StatusPartida;

   ajuda50Usada: boolean;
   pularPerguntaUsado: boolean;
   ajudaPublicaUsada: boolean;

   // Investigar como tornar inválido após ultrapassar o intervalo de 5 minutos
   dataInicio: Date;
   dataFim?: Date;

   createdAt: Date;
   updatedAt: Date;
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
         default: Date.now,
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
   { collection: "Partidas", timestamps: true },
);

partidaSchema.index({ usuarioId: 1, createdAt: -1 });

const Partida = models.Partida || model<IPartida>("Partida", partidaSchema);

export default Partida;
