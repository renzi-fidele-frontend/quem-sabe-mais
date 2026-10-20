const CardResumoDaPerformace = () => {
   const data = [
      { titulo: "Melhor sequência", dado: "12 acertos" },
      { titulo: "Maior prêmio", dado: "2.500 MT" },
      { titulo: "Máx. perguntas/partida", dado: "15/15" },
      { titulo: "Média perguntas/partida", dado: "11,2" },
      { titulo: "Total respondidas", dado: "1.078" },
      { titulo: "Respostas erradas", dado: "236" },
      { titulo: "Partidas vencidas", dado: "47" },
      { titulo: "Partidas abandonadas", dado: "3" },
   ];

   return (
      <div className="border border-cor-borda p-8 rounded-[24px] bg-azul-escuro2/90">
         <h6 className="font-sora text-lg font-bold text-white mb-6">Resumo da performace</h6>
         <div className="flex flex-wrap gap-4">
            {data.map((item, k) => (
               <div className="grow basis-[calc(25%-(--spacing(4)))] p-4 border border-cor-borda rounded-[12px] bg-azul-leve/90" key={k}>
                  <p className="mb-2 text-[11px] uppercase font-sora font-semibold">{item.titulo}</p>
                  <span className="text-white font-bold text-[20px]">{item.dado}</span>
               </div>
            ))}
         </div>
      </div>
   );
};
export default CardResumoDaPerformace;
