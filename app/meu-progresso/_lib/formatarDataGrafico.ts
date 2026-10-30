export default function formatarDataGrafico(data: string, dias: number) {
   const [ano, mes, dia] = data.split("-").map(Number);

   // Evita problemas de fuso horário ao interpretar a data
   const dataFormatada = new Date(ano, mes - 1, dia);

   if (dias === 7) {
      return new Intl.DateTimeFormat("pt-PT", {
         weekday: "short",
      })
         .format(dataFormatada)
         .slice(0, 3);
   }

   if (dias === 30) {
      return new Intl.DateTimeFormat("pt-PT", {
         day: "2-digit",
         month: "2-digit",
      }).format(dataFormatada);
   }

   return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
   }).format(dataFormatada);
}
