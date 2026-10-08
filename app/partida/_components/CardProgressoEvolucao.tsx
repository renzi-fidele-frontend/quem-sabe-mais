import { IProgressoXp } from "@/lib/game/obterProgresso";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
   cardStyle: string;
   headingStyle: string;
   progresso: IProgressoXp;
   xpGanho: number;
   comparacaoUltimaPartida: {
      taxaAcerto: number;
      diferencaTaxaAcerto: number;
      premio: number;
      diferencaPremio: number;
      acertos: number;
      diferencaAcertos: number;
   };
};
const CardProgressoEvolucao = ({ cardStyle, headingStyle, progresso, xpGanho, comparacaoUltimaPartida }: Props) => {
   function retornarIconeAltoOuBaixo(diferenca: number) {
      if (diferenca < 0) {
         return <ArrowDown />;
      } else if (diferenca > 0) {
         return <ArrowUp />;
      } else {
         return null;
      }
   }

   function retornarCorAltoOuBaixo(diferenca: number) {
      if (diferenca < 0) {
         return "text-red-600";
      } else if (diferenca > 0) {
         return "text-green-600";
      } else {
         return "text-tema";
      }
   }

   return (
      <div className={cardStyle}>
         <div className="flex justify-between items-center mb-6">
            <h5 className={headingStyle}>Seu progresso & Evolução</h5>
            <p className="text-tema font-sora text-sm font-semibold">
               Nível {progresso.nivel} <span className="mx-1">•</span> {progresso.titulo}{" "}
            </p>
         </div>
         <div className="font-sora">
            <div className="flex justify-between items-center">
               <p className="text-[13px]">
                  XP Atual: <span className="text-tema">{progresso.xpAtual}</span> / {progresso.xpProximoNivel} XP
               </p>
               <span className="text-tema text-xs font-bold font-outfit">+{xpGanho} XP nesta partida</span>
            </div>
            <div className="relative h-2.5 w-full bg-cor-borda my-2" style={{ borderRadius: "5px" }}>
               <div style={{ width: `${progresso.percentual}%` }} className="absolute top-0 left-0 bottom-0 bg-tema rounded-[inherit]"></div>
            </div>
            <p className="text-xs">
               Faltam {progresso.xpRestante} XP para alcançar o nível {progresso.proximoNivel.nivel}.
            </p>
         </div>
         <hr className="my-6 border-cor-borda" />
         {/* Seção da comparação com a última partida */}
         <div>
            <h5 className="font-sora text-[13px] font-bold mb-3 uppercase">Comparado à sua última partida</h5>
            <div
               className={`flex flex-nowrap gap-4 *:grow *:bg-azul-leve/90 *:p-3 *:rounded-[8px] *:space-y-1.5 [&_p]:text-white [&_p]:text-lg [&_p]:font-bold [&_span]:font-bold [&_span]:text-xs [&_span]:flex [&_span]:items-center [&_span]:gap-0.5 [&_svg]:size-3.5 [&_h6]:text-xs [&_h6]:font-sora`}
            >
               <div>
                  <h6>Taxa de acerto</h6>
                  <p>{comparacaoUltimaPartida.taxaAcerto.toFixed(2)}%</p>
                  <span className={retornarCorAltoOuBaixo(comparacaoUltimaPartida.diferencaTaxaAcerto)}>
                     {retornarIconeAltoOuBaixo(comparacaoUltimaPartida.diferencaTaxaAcerto)}{" "}
                     {comparacaoUltimaPartida.diferencaTaxaAcerto.toFixed(2)}%
                  </span>
               </div>
               <div>
                  <h6>Prêmio ganho</h6>
                  <p>{new Intl.NumberFormat("pt-MZ").format(comparacaoUltimaPartida.premio)} MT</p>
                  <span className={retornarCorAltoOuBaixo(comparacaoUltimaPartida.diferencaPremio)}>
                     {retornarIconeAltoOuBaixo(comparacaoUltimaPartida.diferencaPremio)}{" "}
                     {new Intl.NumberFormat("pt-MZ").format(comparacaoUltimaPartida.diferencaPremio)} MT
                  </span>
               </div>
               <div>
                  <h6>Acertos</h6>
                  <p>{comparacaoUltimaPartida.acertos} corretas</p>
                  <span className={retornarCorAltoOuBaixo(comparacaoUltimaPartida.diferencaAcertos)}>
                     {retornarIconeAltoOuBaixo(comparacaoUltimaPartida.diferencaAcertos)} {comparacaoUltimaPartida.diferencaAcertos}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};
export default CardProgressoEvolucao;
