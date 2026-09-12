/* Guarda credenciais, dados para premiação via M-Pesa e estatísticas globais desnormalizadas para renderização rápida no Dashboard. */

import { Document, model, models, Schema } from "mongoose";

export interface IUsuario extends Document {
   nomeCompleto: string; // Para validação com mpesa
   nickname: string; // Ex: @renzifidele (exibido na liderança e perfil)
   email: string;
   passwordHash: string;
   phoneMpesa?: string;
   role: "player" | "admin";
   avatarUrl: string;

   // Gamificação / Progressão
   xp: number;
   nivel: number;
   title: string; // "Iniciante" | "Curioso" | "Conhecedor" | "Especialista" | "Mestre" | "Lenda"

   // Preferências (Tela de Perfil)
   preferencias: {
      notificacoes: boolean;
      efeitosDeSom: boolean;
      tema: "dark" | "light" | "system";
   };

   // Estatísticas Globais (Tela "Meu Progresso")
   estatisticas: {
      totalDePartidas: number;
      nrVitorias: number; // Venceu a final
      vezesDesistidas: number; // Abandonadas/Paradas com valor
      nrEliminacoes: number;
      totalGanho: number;
      totalAcertos: number;
      totalDePerguntasPuladas: number;
      maiorGanhoEmUmaPartida: number; // Ex: 2.500 MT
      melhorSequenciaDeAcertos: number; // Ex: 12 acertos seguidos
   };

   ativo: boolean; // Banir ou não
   createdAt: Date;
   updatedAt: Date;
}

const schemaDoUsuario = new Schema<IUsuario>(
   {
      nomeCompleto: { type: String, required: true, trim: true },
      nickname: { type: String, required: true, unique: true, lowercase: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true, select: false },
      role: { type: String, enum: ["player", "admin"], default: "player" },
      phoneMpesa: { type: String, trim: true, unique: true },
      avatarUrl: { type: String },

      xp: { type: Number, default: 0 },
      nivel: { type: Number, default: 1 },
      title: { type: String, default: "Iniciante" },

      preferencias: {
         notificacoes: { type: Boolean, default: true },
         efeitosDeSom: { type: Boolean, default: true },
         tema: { type: String, enum: ["dark", "light", "system"], default: "dark" },
      },

      estatisticas: {
         totalDePartidas: { type: Number, default: 0 },
         nrVitorias: { type: Number, default: 0 },
         vezesDesistidas: { type: Number, default: 0 },
         nrEliminacoes: { type: Number, default: 0 },
         totalGanho: { type: Number, default: 0 },
         totalAcertos: { type: Number, default: 0 },
         totalDePerguntasPuladas: { type: Number, default: 0 },
         maiorGanhoEmUmaPartida: { type: Number, default: 0 },
         melhorSequenciaDeAcertos: { type: Number, default: 0 },
      },
      ativo: { type: Boolean, default: true },
   },
   { timestamps: true, collection: "Usuarios" },
);

export const Usuario = models.Usuario || model<IUsuario>("Usuario", schemaDoUsuario);
