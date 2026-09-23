"use client";
import { IRespostaPartida } from "@/models/Partida";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";

type Props = { lista: IRespostaPartida[]; headingStyle: string; cardStyle: string };
const ListaResumoPerguntas = ({ lista, headingStyle, cardStyle }: Props) => {
   const [mostrarTodas, setMostrarTodas] = useState(false);

   function analisarArray() {
      if (mostrarTodas) {
         return lista;
      } else {
         return lista.slice(0, 5);
      }
   }

   return (
      <div className={cardStyle}>
         <div className="flex items-center justify-between mb-6">
            <h6 className={`${headingStyle}`}>Resumo das perguntas</h6>
            <p className="">
               Mostrando {lista.length <= 5 ? lista.length : mostrarTodas ? lista.length : 5} de {lista.length}
            </p>
         </div>
         <div className="space-y-3">
            {analisarArray().map((item, k) => {
               const escolhida = item.perguntaId.alternativas.find((a) => a.id === item.respostaEscolhida).texto;
               return (
                  <div className="p-4 rounded-[12px] bg-azul-leve/90 border border-cor-borda flex justify-between items-center" key={k}>
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
                           <p className="text-white font-semibold line-clamp-1">{item.perguntaId.enunciado}</p>
                           <span className="text-xs">{escolhida}</span>
                        </div>
                     </div>
                     {/* Direita */}
                     <p
                        className={`px-3 py-1.5 rounded-[6px] text-sm font-bold whitespace-nowrap ${item.correta ? "bg-tema/10 text-tema" : "bg-destructive/10 text-destructive"}`}
                     >
                        {item.correta ? ` + ${item.valor} MT` : "Eliminado"}
                     </p>
                  </div>
               );
            })}
            {lista.length > 5 && (
               <button
                  onClick={() => setMostrarTodas(!mostrarTodas)}
                  className="mt-6 flex items-center gap-2 font-sora font-semibold text-white px-5 py-2.5 border border-cor-borda rounded-[10px] w-full justify-center bg-azul-leve/90 cursor-pointer"
               >
                  {!mostrarTodas ? (
                     <>
                        Ver todas as respostas <ChevronDown />
                     </>
                  ) : (
                     <>
                        Ver menos respostas <ChevronUp />
                     </>
                  )}
               </button>
            )}
         </div>
      </div>
   );
};
export default ListaResumoPerguntas;
