import { Shield } from "lucide-react";
import obterProgressoXpUsuario from "../../partida/_lib/obterProgresso";

const CardNivelJogador = ({ xp }: { xp: number }) => {
   const progresso = obterProgressoXpUsuario(xp);

   return (
      <div className="flex gap-8 items-stretch border-2 border-tema bg-azul-escuro2/90 rounded-[24px] p-8 font-sora">
         {/* Ícone */}
         <i className="border-3 rounded-full border-tema bg-tema/13 p-7">
            <Shield className="size-12 stroke-tema" />
         </i>
         <div className="grow">
            {/* Heading */}
            <div className="flex justify-between items-end">
               <p className="text-[28px] font-black text-white font-outfit flex gap-3">
                  Nível {progresso.nivel} <span>•</span> <span className="text-tema font-semibold">{progresso.titulo}</span>
               </p>
               {progresso.xpProximoNivel !== null ? (
                  <span className="text-tema text-sm font-semibold">
                     {progresso.xpAtual} / <span className="text-white text-[16px]">{progresso.xpProximoNivel} XP</span>
                  </span>
               ) : (
                  <span className="text-tema text-sm font-semibold">NÍVEL MÁXIMO</span>
               )}
            </div>
            {/* Barra do progresso */}
            <div className="bg-azul-leve relative inset-y-0 h-3 my-3 rounded-[6px]">
               <div className={`h-3 bg-tema rounded-[inherit]`} style={{ width: `${progresso.percentual}%` }}></div>
            </div>
            {/* Detalhes */}
            <div className="flex justify-between">
               {progresso.xpProximoNivel !== null ? (
                  <p className="text-tema font-semibold text-[13px]">
                     {progresso.xpRestante} XP para alcançar o nível {progresso.proximoNivel.nivel}
                  </p>
               ) : (
                  <p className="text-tema font-semibold text-[13px]">Parabéns! Alcançaste o nível máximo!</p>
               )}
               <span className="text-xs">Continue jogando para ganhar XP e desbloquear novas recompensas.</span>
            </div>
         </div>
      </div>
   );
};
export default CardNivelJogador;
