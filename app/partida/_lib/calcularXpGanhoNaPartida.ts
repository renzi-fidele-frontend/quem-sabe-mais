import { TOTAL_PERGUNTAS } from "@/data/jogo";

export function calcularXPGanhoNaPartida(quantidadeAcertos: number): number {
   const XP_POR_ACERTO = 20;

   let xp = quantidadeAcertos * XP_POR_ACERTO;

   // Bônus de conclusão
   if (quantidadeAcertos === TOTAL_PERGUNTAS) {
      xp += 50;
   }

   // Bônus de excelência
   if (quantidadeAcertos >= 10 && quantidadeAcertos <= 11) {
      xp += 20;
   } else if (quantidadeAcertos >= 12 && quantidadeAcertos <= 13) {
      xp += 40;
   } else if (quantidadeAcertos === 14) {
      xp += 60;
   } else if (quantidadeAcertos === 15) {
      xp += 100;
   }

   return xp;
}
