export default function calcularDuracao(dataInicio: Date, dataFim: Date) {
   const diferencaMs = dataFim.getTime() - dataInicio.getTime();

   const segundosTotais = Math.floor(diferencaMs / 1000);

   const minutos = Math.floor(segundosTotais / 60);
   const segundos = segundosTotais % 60;

   return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}
