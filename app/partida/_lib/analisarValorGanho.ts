export default function analisarValorGanho(valorAtual: number) {
   if (valorAtual < 1000) {
      return "Partida azarada";
   } else if (valorAtual >= 1000 && valorAtual < 7500) {
      return "Boa tentativa";
   } else if (valorAtual >= 7500 && valorAtual < 100000) {
      return "Excelente partida";
   } else if (valorAtual >= 100000) {
      return "Partida extraordinária";
   }
}
