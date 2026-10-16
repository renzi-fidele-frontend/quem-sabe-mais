import { buscarResumoHistorico } from "../_actions";
import ChartResumoHistorico from "./ChartResumoHistorico";

const CardResumoDoDesempenho = async () => {
   const res = (await buscarResumoHistorico())[0];
   const totalPartidasConcluidas = res.totalVitorias + res.totalEliminado + res.totalAbandonado;
   const taxaVitoria = totalPartidasConcluidas > 0 ? (res.totalVitorias / totalPartidasConcluidas) * 100 : 0;

   return (
      <div className="p-6 bg-azul-escuro2/90 rounded-[24px] border border-cor-borda">
         <h4 className="text-lg font-black mb-0 text-white">Resumo do desempenho</h4>
         <div className="flex items-center">
            <ChartResumoHistorico totalVitorias={res.totalVitorias} totalEliminado={res.totalEliminado} totalAbandonado={res.totalAbandonado} />
            <div className="font-sora space-y-3.5 text-sm [&_span]:pe-2 relative right-6">
               <div>
                  <span className="text-green-500">●</span> Vitórias ({res.totalVitorias})
               </div>
               <div>
                  <span className="text-destructive">●</span> Eliminado ({res.totalEliminado})
               </div>
               <div>
                  <span className="text-cor-borda">●</span> Abandonado ({res.totalAbandonado})
               </div>
            </div>
         </div>

         <div className="*:border-b *:border-cor-borda *:py-2 *:flex *:items-center *:justify-between [&_p]:font-sora [&_p]:text-[13px] [&_span]:font-extrabold [&_span]:text-sm">
            {/* Partidas realizadas */}
            <div>
               <p>Partidas realizadas</p>
               <span className="text-white">{res.totalPartidas}</span>
            </div>
            {/* Vitórias */}
            <div>
               <p>Vitórias</p>
               <span className="text-green-500">{res.totalVitorias}</span>
            </div>
            {/* Eliminado */}
            <div>
               <p>Eliminado</p>
               <span className="text-red-500">{res.totalEliminado}</span>
            </div>
            {/* Abandonadas */}
            <div>
               <p>Abandonadas</p>
               <span className="text-white">{res.totalAbandonado}</span>
            </div>
            {/* Taxa de vitória */}
            <div>
               <p>Taxa de vitória</p>
               <span className="text-tema">
                  {taxaVitoria.toLocaleString("pt-MZ", {
                     minimumFractionDigits: 1,
                     maximumFractionDigits: 1,
                  })}
                  %
               </span>
            </div>
            {/* Total ganho */}
            <div>
               <p>Total ganho</p>
               <span className="text-tema">{new Intl.NumberFormat("pt-MZ").format(res.totalGanho || 0)} MT</span>
            </div>
         </div>
      </div>
   );
};
export default CardResumoDoDesempenho;
