const formatarData = (data: Date) => {
   const hoje = new Date();
   const ontem = new Date(hoje);

   hoje.setHours(0, 0, 0, 0);
   ontem.setHours(0, 0, 0, 0);
   ontem.setDate(ontem.getDate() - 1);

   const dataPartida = new Date(data);
   const diaPartida = new Date(dataPartida);

   diaPartida.setHours(0, 0, 0, 0);

   if (diaPartida.getTime() === hoje.getTime()) {
      return "Hoje";
   }

   if (diaPartida.getTime() === ontem.getTime()) {
      return "Ontem";
   }

   return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "short",
   }).format(dataPartida);
};

export default formatarData;
