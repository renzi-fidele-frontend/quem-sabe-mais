const CardResumoDoDesempenho = () => {
   return (
      <div className="p-6 bg-azul-escuro2/90 rounded-[24px] border border-cor-borda">
         <h4 className="text-lg font-black mb-5 text-white">Resumo do desempenho</h4>
         {/* TODO: Renderizar o gráfico representando: Vitórias, Eliminado e Abandonado  */}
         <div className="*:border-b *:border-cor-borda *:py-2 *:flex *:items-center *:justify-between [&_p]:font-sora [&_p]:text-[13px] [&_span]:font-extrabold [&_span]:text-sm">
            {/* Partidas realizadas */}
            <div>
               <p>Partidas realizadas</p>
               <span className="text-white">24</span>
            </div>
            {/* Vitórias */}
            <div>
               <p>Vitórias</p>
               <span className="text-green-500">11</span>
            </div>
            {/* Eliminado */}
            <div>
               <p>Eliminado</p>
               <span className="text-red-500">12</span>
            </div>
            {/* Abandonadas */}
            <div>
               <p>Abandonadas</p>
               <span className="text-white">1</span>
            </div>
            {/* Taxa de vitória */}
            <div>
               <p>Taxa de vitória</p>
               <span className="text-tema">45,5%</span>
            </div>
            {/* Total ganho */}
            <div>
               <p>Total ganho</p>
               <span className="text-tema">5.750 MT</span>
            </div>
         </div>
      </div>
   );
};
export default CardResumoDoDesempenho;
