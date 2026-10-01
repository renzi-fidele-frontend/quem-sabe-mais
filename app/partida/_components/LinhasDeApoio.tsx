"use client";
import { ArrowRight, Percent, Users } from "lucide-react";
import { usarAjuda50, usarPularPergunta } from "../_actions";
import { useState } from "react";

type Props = {
   partidaId: string;
   aoUsarAjuda50: (alternativas: string[]) => void;
   ajuda50utilizado: boolean;
   ajudaPularPerguntaUtilizado: boolean;
};

const LinhasDeApoio = ({ partidaId, aoUsarAjuda50, ajuda50utilizado, ajudaPularPerguntaUtilizado }: Props) => {
   const [loading, setLoading] = useState(false);

   const linhasDeApoio = [
      {
         Icone: Percent,
         texto: "50/50",
         acao: async () => {
            setLoading(true);
            const alternativasIncorretas = await usarAjuda50(partidaId);
            aoUsarAjuda50(alternativasIncorretas);
            setLoading(false);
         },
         utilizado: ajuda50utilizado,
      },
      {
         Icone: ArrowRight,
         texto: "Pular Pergunta",
         acao: async () => {
            setLoading(true);
            await usarPularPergunta(partidaId);
            setLoading(false);
         },
         utilizado: ajudaPularPerguntaUtilizado,
      },
      {
         Icone: Users,
         texto: "Ajuda Pública",
         acao: async () => {},
         utilizado: false,
      },
   ];

   return (
      <div className="flex justify-between items-center text-sm font-sora">
         <p className="uppercase text-[12px] text-texto-1 font-semibold">* Linhas de Apoio Disponíveis:</p>
         <div className="flex gap-3.5 font-semibold">
            {linhasDeApoio.map((linha, k) => (
               <button
                  disabled={linha.utilizado || loading}
                  onClick={linha.acao}
                  key={k}
                  className={`flex gap-2 items-center bg-azul-leve/90 px-4 py-3 rounded-[8px] cursor-pointer ${linha.utilizado ? "opacity-50 cursor-not-allowed! outline-2 outline-destructive" : ""}`}
               >
                  <linha.Icone className="stroke-tema size-5" />
                  {linha.texto}
               </button>
            ))}
         </div>
      </div>
   );
};
export default LinhasDeApoio;
