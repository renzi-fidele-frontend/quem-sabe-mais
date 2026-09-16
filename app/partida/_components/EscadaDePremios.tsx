import { Star } from "lucide-react";

type Props = {
   perguntaAtual: number;
   valorGarantido: number;
};

export default function EscadaPremios({ perguntaAtual, valorGarantido }: Props) {
   const valoresPremios = [100, 200, 300, 500, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 25000, 50000, 100000];
   const checkpoints = [1000, 7500, 100000];

   return (
      <>
         {/* Escala de premios */}
         <div className="p-6 border border-cor-borda rounded-[20px] bg-azul-escuro2">
            <h3 className="text-xs font-sora font-bold">ESCALA DE PRÉMIOS</h3>
            <hr className="border-cor-borda mt-2 mb-4" />
            <div>
               {[...valoresPremios].reverse().map((valor, index) => {
                  const nivel = valoresPremios.length - index;

                  return (
                     <div
                        className={`flex justify-between px-4 py-2 rounded-[6px] text-sm ${checkpoints.includes(valor) ? "border border-tema/36 my-1" : ""}`}
                        key={nivel}
                     >
                        {/* Nivel */}
                        <span className="flex items-center gap-1.5 font-bold text-[#4D5975]">
                           {nivel < 10 ? `0${nivel}` : nivel} {checkpoints.includes(valor) && <Star className="stroke-tema size-2.5 fill-tema" />}
                        </span>
                        {/* Valor */}
                        <span className={`${checkpoints.includes(valor) ? "font-bold text-tema" : "text-white"}`}>
                           {valor.toLocaleString("pt-MZ")} MT
                        </span>
                     </div>
                  );
               })}
            </div>
         </div>
         {/* Acumulado garantido */}
         <div className="p-6 border border-cor-borda rounded-[20px] bg-azul-escuro2"></div>
      </>
   );
}
