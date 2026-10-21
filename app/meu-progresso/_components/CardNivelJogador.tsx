import { Shield } from "lucide-react";

const CardNivelJogador = () => {
   return (
      <div className="flex gap-8 items-stretch border-2 border-tema bg-azul-escuro2/90 rounded-[24px] p-8 font-sora">
         {/* Ícone */}
         <i className="border-3 rounded-full border-tema bg-tema/13 p-7">
            <Shield className="size-12 stroke-tema" />
         </i>
         <div className="grow">
            {/* Heading */}
            <div className="flex justify-between items-end">
               <p className="text-[28px] font-black text-white font-outfit">Nível 8</p>
               <span className="text-tema text-sm font-semibold">2.450 / 3.000 XP</span>
            </div>
            {/* Barra do progresso */}
            <div className="bg-azul-leve relative inset-y-0 h-3 my-3 rounded-[6px]">
               <div className="h-3 bg-tema w-[70%] rounded-[inherit]"></div>
            </div>
            {/* Detalhes */}
            <div className="flex justify-between">
               <p className="text-tema font-semibold text-[13px]">550 XP para alcançar o nível 9</p>
               <span className="text-xs">Continue jogando para ganhar XP e desbloquear novas recompensas.</span>
            </div>
         </div>
      </div>
   );
};
export default CardNivelJogador;
