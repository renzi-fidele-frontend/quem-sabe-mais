import { TOTAL_PERGUNTAS } from "@/data/jogo";
import { IPartida } from "@/models/Partida";
import { Trophy } from "lucide-react";

const CardMelhorPartida = ({ partida }: { partida: IPartida }) => {
   const dataFormatada = new Intl.DateTimeFormat("pt-MZ", {
      day: "2-digit",
      month: "long",
      year: "numeric",
   }).format(partida.updatedAt);

   const nrAcertos = partida.respondidas.filter((r) => r.correta).length;

   return (
      <div className="p-6 border border-tema bg-tema/13 rounded-[20px]">
         <h4 className="text-tema font-black text-lg flex items-center gap-2 mb-6">
            <Trophy className="size-5.5 stroke-3" /> Sua melhor partida
         </h4>
         {/* Destaques */}
         <div className="mb-4 [&_p]:text-xs [&_p]:font-bold [&_p]:mb-1] [&_p]:font-sora space-y-3 ">
            <div>
               <p>AUGE DE DESEMPENHO</p>
               <span className="text-white font-black text-[28px] ">
                  {nrAcertos}/{TOTAL_PERGUNTAS} acertos
               </span>
            </div>
            <div>
               <p>PRÉMIO ACUMULADO</p>
               <span className="text-tema font-extrabold text-[20px] ">{new Intl.NumberFormat("pt-MZ").format(partida.valorAtual)} MT</span>
            </div>
            <div>
               <p>DATA DA PROVA</p>
               <span className="text-zinc-200 font-sora text-[13px]">{dataFormatada}</span>
            </div>
         </div>
         <p className="text-center text-tema py-2 bg-tema/20 rounded-[8px] font-sora font-bold text-sm">Sequência perfeita! ⚡</p>
      </div>
   );
};
export default CardMelhorPartida;
