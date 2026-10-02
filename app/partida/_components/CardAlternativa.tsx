"use client";
import { useState } from "react";
import { responderPergunta } from "../_actions";

type Props = {
   idAlternativa: string;
   textoAlternativa: string;
   partidaId: string;
   efeitoAjuda50: boolean;
   percentualAjudaPublica: number;
};

const CardAlternativa = ({ idAlternativa, textoAlternativa, partidaId, efeitoAjuda50, percentualAjudaPublica }: Props) => {
   const [loading, setLoading] = useState(false);
   const [acertou, setAcertou] = useState<boolean | undefined>(undefined);

   async function handleClick() {
      setLoading(true);
      try {
         const resposta = await responderPergunta(partidaId, idAlternativa);
         if (!resposta) return;
         setLoading(false);
         setAcertou(resposta.correta);
      } catch (error) {
         // TODO: Mais tarde lidar com o problema do erro
      }
   }

   return (
      <button
         onClick={handleClick}
         disabled={loading || acertou !== undefined || efeitoAjuda50}
         className={`border border-cor-borda bg-azul-leve px-6 py-5.5 rounded-[12px] font-sora  transition ${acertou === undefined && !efeitoAjuda50 ? "hover:bg-tema/7 hover:border-tema cursor-pointer" : ""} group relative ${acertou ? "bg-green-600" : ""} ${acertou === false ? "bg-red-500" : ""} ${efeitoAjuda50 ? "bg-destructive opacity-80 cursor-not-allowed!" : ""}`}
      >
         <div className="relative z-2">
            <span
               className={`uppercase font-outfit font-black px-3 py-1.5 rounded-[6px] ${percentualAjudaPublica > 0 ? "bg-black border border-tema" : "bg-tema/13"} me-4 text-tema  ${acertou === undefined && !efeitoAjuda50 ? "group-hover:text-black group-hover:bg-tema" : ""} transition`}
            >
               {idAlternativa}
            </span>{" "}
            {textoAlternativa}
         </div>
         {/* Overlay de loading */}
         {loading && <div className="size-full inset-0 absolute bg-tema rounded-[inherit] animate-caret-blink animation-duration-[500ms]"></div>}
         {/* Percentual ajuda publica */}
         {percentualAjudaPublica > 0 && (
            <span className="absolute top-1 right-2 text-tema text-[13px] tracking-wider">{percentualAjudaPublica}%</span>
         )}
         <div className="absolute rounded-r-xl left-0 top-0 bottom-0 bg-green-600/50" style={{ width: `${percentualAjudaPublica}%` }}></div>
      </button>
   );
};

export default CardAlternativa;
