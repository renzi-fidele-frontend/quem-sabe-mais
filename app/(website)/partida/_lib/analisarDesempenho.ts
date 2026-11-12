export default function analisarDesempenho(perguntaAtual: number) {
   if (perguntaAtual! < 2) {
      return "desempenho péssimo";
   } else if (perguntaAtual! >= 2 && perguntaAtual! < 4) {
      return "desempenho ruim";
   } else if (perguntaAtual! >= 4 && perguntaAtual! < 7) {
      return "desempenho normal";
   } else if (perguntaAtual! >= 7 && perguntaAtual! < 10) {
      return "bom desempenho";
   } else if (perguntaAtual! >= 10 && perguntaAtual! < 15) {
      return "excelente desempenho";
   } else if (perguntaAtual! >= 15) {
      return "desempenho de mestre";
   }
}
