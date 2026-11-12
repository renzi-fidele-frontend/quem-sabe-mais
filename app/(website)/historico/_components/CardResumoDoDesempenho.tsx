import { ResultadoBuscarResumoHistorico } from "../_actions";
import ChartResumoHistorico from "./ChartResumoHistorico";

type Props = {
   resumoDesempenho: [ResultadoBuscarResumoHistorico];
};
const CardResumoDoDesempenho = ({ resumoDesempenho: resumoDesempenho }: Props) => {
   const _resumoDesempenho = resumoDesempenho[0];
   const totalPartidasConcluidas = _resumoDesempenho.totalVitorias + _resumoDesempenho.totalEliminado + _resumoDesempenho.totalAbandonado;
   const taxaVitoria = totalPartidasConcluidas > 0 ? (_resumoDesempenho.totalVitorias / totalPartidasConcluidas) * 100 : 0;

   return (
      <div className="p-6 bg-azul-escuro2/90 rounded-[24px] border border-cor-borda">
         <h4 className="text-lg font-black mb-0 text-white">Resumo do desempenho</h4>
         <div className="flex items-center">
            <ChartResumoHistorico
               totalVitorias={_resumoDesempenho.totalVitorias}
               totalEliminado={_resumoDesempenho.totalEliminado}
               totalAbandonado={_resumoDesempenho.totalAbandonado}
            />
            <div className="font-sora space-y-2.5 text-xs [&_span]:pe-2 basis-[64%] ">
               <div>
                  <span className="text-green-500">●</span> Vitórias ({_resumoDesempenho.totalVitorias})
               </div>
               <div>
                  <span className="text-destructive">●</span> Eliminado ({_resumoDesempenho.totalEliminado})
               </div>
               <div>
                  <span className="text-cor-borda">●</span> Abandonado ({_resumoDesempenho.totalAbandonado})
               </div>
            </div>
         </div>

         <div className="*:border-b *:border-cor-borda *:py-2 *:flex *:items-center *:justify-between [&_p]:font-sora [&_p]:text-[13px] [&_span]:font-extrabold [&_span]:text-sm">
            {/* Partidas realizadas */}
            <div>
               <p>Partidas realizadas</p>
               <span className="text-white">{_resumoDesempenho.totalPartidas}</span>
            </div>
            {/* Vitórias */}
            <div>
               <p>Vitórias</p>
               <span className="text-green-500">{_resumoDesempenho.totalVitorias}</span>
            </div>
            {/* Eliminado */}
            <div>
               <p>Eliminado</p>
               <span className="text-red-500">{_resumoDesempenho.totalEliminado}</span>
            </div>
            {/* Abandonadas */}
            <div>
               <p>Abandonadas</p>
               <span className="text-white">{_resumoDesempenho.totalAbandonado}</span>
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
               <span className="text-tema">{new Intl.NumberFormat("pt-MZ").format(_resumoDesempenho.totalGanho || 0)} MT</span>
            </div>
         </div>
      </div>
   );
};
export default CardResumoDoDesempenho;
