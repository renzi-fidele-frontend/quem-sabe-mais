import { IProgressoXp } from "@/lib/game/obterProgresso";
import { ArrowUp } from "lucide-react";

type Props = { cardStyle: string; headingStyle: string; progresso: IProgressoXp; xpGanho: number };
const CardProgressoEvolucao = ({ cardStyle, headingStyle, progresso, xpGanho }: Props) => {
   return (
      <div className={cardStyle}>
         <div className="flex justify-between items-center mb-6">
            <h5 className={headingStyle}>Seu progresso & Evolução</h5>
            <p className="text-tema font-sora text-sm font-semibold">Nível {progresso.nivel}</p>
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
         {/* TODO: Adicionar a seção da comparação com a última partida */}
         <div>
            <h5 className="font-sora text-[13px] font-bold mb-3 uppercase">Comparado à sua última partida</h5>
            <div className="flex flex-nowrap gap-4 *:grow *:bg-azul-leve/90 *:p-3 *:rounded-[8px] *:space-y-1.5 [&_p]:text-white [&_p]:text-lg [&_p]:font-bold [&_span]:text-tema [&_span]:font-bold [&_span]:text-xs [&_span]:flex [&_span]:items-center [&_span]:gap-0.5 [&_svg]:size-4 [&_h6]:text-xs [&_h6]:font-sora">
               <div>
                  <h6>Taxa de acerto</h6>
                  <p>70%</p>
                  <span>
                     <ArrowUp /> 8%
                  </span>
               </div>
               <div>
                  <h6>Prêmio ganho</h6>
                  <p>7.500 MT</p>
                  <span>
                     <ArrowUp /> 5.500 MT
                  </span>
               </div>
               <div>
                  <h6>Acertos</h6>
                  <p>7 corretas</p>
                  <span>
                     <ArrowUp /> 2
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};
export default CardProgressoEvolucao;
