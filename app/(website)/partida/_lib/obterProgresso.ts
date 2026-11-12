import { NIVEIS } from "@/data/jogo";

export interface IProgressoXp {
   nivel: number;
   titulo: string;
   xpAtual: number;
   xpNivelAtual: number;
   xpProximoNivel: number | null;
   xpRestante: number;
   percentual: number;
   proximoNivel: {
      nivel: number;
      titulo: string;
      xpMinimo: number;
   };
}

export default function obterProgressoXpUsuario(xp: number): IProgressoXp {
   const nivelAtual = [...NIVEIS].reverse().find((nivel) => xp >= nivel.xpMinimo) ?? NIVEIS[0];

   const proximoNivel = NIVEIS.find((nivel) => nivel.xpMinimo > xp);

   // Jogador já chegou ao nível máximo
   if (!proximoNivel) {
      return {
         nivel: nivelAtual.nivel,
         titulo: nivelAtual.titulo,
         xpAtual: xp,
         xpNivelAtual: nivelAtual.xpMinimo,
         xpProximoNivel: null,
         xpRestante: 0,
         percentual: 100,
         proximoNivel: NIVEIS[NIVEIS.length - 1],
      };
   }

   const xpDoNivel = proximoNivel.xpMinimo - nivelAtual.xpMinimo;

   const xpConquistadoNoNivel = xp - nivelAtual.xpMinimo;

   const percentual = Math.floor((xpConquistadoNoNivel / xpDoNivel) * 100);

   return {
      nivel: nivelAtual.nivel,
      titulo: nivelAtual.titulo,
      xpAtual: xp,
      xpNivelAtual: nivelAtual.xpMinimo,
      xpProximoNivel: proximoNivel.xpMinimo,
      xpRestante: proximoNivel.xpMinimo - xp,
      percentual,
      proximoNivel,
   };
}
