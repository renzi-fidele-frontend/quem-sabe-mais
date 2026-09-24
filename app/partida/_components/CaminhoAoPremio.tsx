import { VALORES_PARTIDA } from "@/data/jogo";
import { IRespostaPartida } from "@/models/Partida";
import { Check, Lock } from "lucide-react";

type Props = { respondidas: IRespostaPartida[]; cardStyle: string };

const CaminhoAoPremio = ({ respondidas, cardStyle }: Props) => {
   const ultimoAcertado = respondidas.filter((v, k) => v.correta).slice(-1)[0].numero;

   return (
      <div className={cardStyle}>
         <h6 className="text-[13px] font-sora font-bold mb-1">CAMINHO ATÉ O PRÊMIO</h6>
         <hr className="border-cor-borda border mb-4" />
         <div className="space-y-1">
            {[...VALORES_PARTIDA].reverse().map((item, k) => {
               const nivel = VALORES_PARTIDA.length - k;

               return (
                  <div
                     key={k}
                     className={`flex justify-between items-center px-3 py-1.5 rounded-[6px] text-[13px] font-bold ${ultimoAcertado >= nivel ? "**:text-tema border border-tema/13" : "bg-black/20"}`}
                  >
                     <span className="flex items-center gap-2">
                        {ultimoAcertado >= nivel ? <Check className="size-3 stroke-3" /> : <Lock className="size-3 stroke-3" />}
                        {`${nivel < 10 ? "0" : ""}`}
                        {nivel}
                     </span>
                     <p className="text-white">{item.toLocaleString("pt-MZ")} MT</p>
                  </div>
               );
            })}
         </div>
      </div>
   );
};
export default CaminhoAoPremio;
