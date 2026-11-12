import { CHECKPOINTS, VALORES_PARTIDA } from "@/data/jogo";
import { Lock, Star } from "lucide-react";

type Props = {
   perguntaAtual: number;
   valorGarantido: number;
   valorAtual: number;
};

export default function EscadaPremios({ perguntaAtual, valorGarantido, valorAtual }: Props) {
   return (
      <>
         {/* Escala de premios */}
         <div className="p-6 border border-cor-borda rounded-[20px] bg-azul-escuro2">
            <h3 className="text-xs font-sora font-bold">ESCALA DE PRÉMIOS</h3>
            <hr className="border-cor-borda mt-2 mb-4" />
            <div>
               {[...VALORES_PARTIDA].reverse().map((valor, index) => {
                  const nivel = VALORES_PARTIDA.length - index;
                  return (
                     <div
                        className={`flex justify-between px-4 py-2 rounded-[6px] text-sm ${valor <= valorAtual ? "opacity-40" : ""} ${CHECKPOINTS.includes(valor) ? "border border-tema/36 my-1" : ""} ${nivel === perguntaAtual ? "bg-tema **:text-black **:font-bold my-1" : ""}`}
                        key={nivel}
                     >
                        {/* Nivel */}
                        <span className="flex items-center gap-1.5 font-bold text-[#4D5975]">
                           {nivel < 10 ? `0${nivel}` : nivel}{" "}
                           {CHECKPOINTS.includes(valor) && <Star className="stroke-tema size-2.5 fill-tema" />}
                        </span>
                        {/* Valor */}
                        <span className={`${CHECKPOINTS.includes(valor) ? "font-bold text-tema" : "text-white"}`}>
                           {valor.toLocaleString("pt-MZ")} MT
                        </span>
                     </div>
                  );
               })}
            </div>
         </div>
         {/* Acumulado garantido */}
         <div className="p-6 border border-cor-borda rounded-[20px] bg-azul-escuro2">
            <h3 className="text-xs font-sora font-bold">SEU SALDO ATUAL</h3>
            <div className="flex justify-between items-center mt-4">
               <div>
                  <p className="text-tema font-extrabold text-3xl mb-3">{valorAtual.toLocaleString("pt-MZ")} MT</p>
                  <p className="font-sora text-xs">
                     Saldo Garantido: <span className="text-tema font-semibold">{valorGarantido.toLocaleString("pt-MZ")}MT</span>
                  </p>
                  <p className="text-xs w-[80%] mt-3 opacity-60">* Se você for eliminado ficas com o saldo garantido.</p>
               </div>
               <p className="flex items-center bg-[#4D5975]/13 rounded-[20px] text-xs gap-1.5 py-2.5 px-4 font-sora font-semibold whitespace-nowrap">
                  <Lock className="size-3.5 stroke-3" /> Nível {perguntaAtual}
               </p>
            </div>
         </div>
      </>
   );
}
