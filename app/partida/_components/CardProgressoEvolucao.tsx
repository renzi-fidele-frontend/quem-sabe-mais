import { IProgressoXp } from "@/lib/game/obterProgresso";

type Props = { cardStyle: string; headingStyle: string; progresso: IProgressoXp; xpGanho: number };
const CardProgressoEvolucao = ({ cardStyle, headingStyle, progresso, xpGanho }: Props) => {
   return (
      <div className={cardStyle}>
         <div className="flex justify-between items-center mb-6">
            <h6 className={headingStyle}>Seu progresso & Evolução</h6>
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
               <div style={{width: `${progresso.percentual}%`}} className="absolute top-0 left-0 bottom-0 bg-tema rounded-[inherit]"></div>
            </div>
            <p className="text-xs">
               Faltam {progresso.xpRestante} XP para alcançar o nível {progresso.proximoNivel.nivel}.
            </p>
         </div>
         <hr className="my-6 border-cor-borda" />
         {/* TODO: Adicionar a seção da comparação com a última partida */}
      </div>
   );
};
export default CardProgressoEvolucao;
