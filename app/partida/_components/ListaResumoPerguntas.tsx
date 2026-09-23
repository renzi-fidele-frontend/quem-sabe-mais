import { IRespostaPartida } from "@/models/Partida";
import { Check, X } from "lucide-react";

const ListaResumoPerguntas = ({ lista }: { lista: IRespostaPartida[] }) => {
   return (
      <div className="space-y-3">
         {lista.map((item, k) => {
            const escolhida = item.perguntaId.alternativas.find((a) => a.id === item.respostaEscolhida).texto;
            return (
               <div className="p-4 rounded-[12px] bg-azul-leve/90 border-cor-borda flex justify-between items-center" key={k}>
                  {/* Esquerda */}
                  <div className="flex items-center gap-3 text-sm">
                     <span className="font-bold">
                        {item.numero < 10 && "0"}
                        {item.numero}
                     </span>
                     <i className={`*:stroke-4 *:size-5`}>
                        {item.correta ? <Check className="stroke-green-600" /> : <X className="stroke-red-600" />}
                     </i>
                     <div className="font-sora">
                        <p className="text-white font-semibold">{item.perguntaId.enunciado}</p>
                        <span className="text-xs">{escolhida}</span>
                     </div>
                  </div>
                  {/* Direita */}
                  <p
                     className={`px-3 py-1.5 rounded-[6px] text-sm font-bold ${item.correta ? "bg-tema/10 text-tema" : "bg-destructive/10 text-destructive"}`}
                  >
                     {item.correta ? ` + ${item.valor} MT` : "Eliminado"}
                  </p>
               </div>
            );
         })}
      </div>
   );
};
export default ListaResumoPerguntas;
