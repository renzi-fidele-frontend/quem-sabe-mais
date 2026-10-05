export const VALORES_PARTIDA = [100, 200, 300, 500, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 25000, 50000, 100000] as const;

export const NIVEIS_SEGURANCA = [5, 10] as const;

export const TOTAL_PERGUNTAS = 15;

export const MAX_PARTIDAS_DIARIAS = 5;

export const CHECKPOINTS = [1000, 7500, 100000];

export const NIVEIS = [
   { nivel: 1, titulo: "Iniciante", xpMinimo: 0 },
   { nivel: 2, titulo: "Iniciante", xpMinimo: 100 },
   { nivel: 3, titulo: "Iniciante", xpMinimo: 200 },
   { nivel: 4, titulo: "Iniciante", xpMinimo: 350 },

   { nivel: 5, titulo: "Curioso", xpMinimo: 500 },
   { nivel: 6, titulo: "Curioso", xpMinimo: 750 },
   { nivel: 7, titulo: "Curioso", xpMinimo: 1000 },

   { nivel: 8, titulo: "Conhecedor", xpMinimo: 1500 },
   { nivel: 9, titulo: "Conhecedor", xpMinimo: 2000 },
   { nivel: 10, titulo: "Conhecedor", xpMinimo: 2500 },
   { nivel: 11, titulo: "Conhecedor", xpMinimo: 3000 },
   { nivel: 12, titulo: "Conhecedor", xpMinimo: 3500 },

   { nivel: 13, titulo: "Especialista", xpMinimo: 4000 },
   { nivel: 14, titulo: "Especialista", xpMinimo: 4500 },
   { nivel: 15, titulo: "Especialista", xpMinimo: 5000 },
   { nivel: 16, titulo: "Especialista", xpMinimo: 5500 },
   { nivel: 17, titulo: "Especialista", xpMinimo: 6000 },

   { nivel: 18, titulo: "Mestre", xpMinimo: 6750 },
   { nivel: 19, titulo: "Mestre", xpMinimo: 7500 },
   { nivel: 20, titulo: "Mestre", xpMinimo: 8250 },
   { nivel: 21, titulo: "Mestre", xpMinimo: 9000 },
   { nivel: 22, titulo: "Mestre", xpMinimo: 10000 },

   { nivel: 23, titulo: "Lenda", xpMinimo: 11000 },
   { nivel: 24, titulo: "Lenda", xpMinimo: 11750 },
   { nivel: 25, titulo: "Lenda", xpMinimo: 12500 },
   { nivel: 26, titulo: "Lenda", xpMinimo: 13000 },
   { nivel: 27, titulo: "Lenda", xpMinimo: 13500 },
   { nivel: 28, titulo: "Lenda", xpMinimo: 14000 },
   { nivel: 29, titulo: "Lenda", xpMinimo: 14500 },
   { nivel: 30, titulo: "Lenda", xpMinimo: 15000 },
] as const;
