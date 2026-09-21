"use client";
import { useState } from "react";
import { responderPergunta } from "../_actions";

type Props = {
   idAlternativa: string;
   textoAlternativa: string;
   partidaId: string;
};

const CardAlternativa = ({ idAlternativa, textoAlternativa, partidaId }: Props) => {
   const [loading, setLoading] = useState(false);
   const [acertou, setAcertou] = useState<boolean | undefined>(undefined);

   async function handleClick() {
      setLoading(true);
      try {
         const resposta = await responderPergunta(partidaId, idAlternativa);
         if (!resposta) return;
         setLoading(false);
         setAcertou(resposta.correta);

         // TODO: Redirecionar para a página de resultado final da partida
         if (resposta.correta === false) {
         }
      } catch (error) {
         // TODO: Mais tarde lidar com o problema do erro
      }
   }

   return (
      <button
         onClick={handleClick}
         disabled={loading || acertou !== undefined}
         className={`border border-cor-borda bg-azul-leve px-6 py-5.5 rounded-[12px] font-sora  transition ${acertou === undefined ? "hover:bg-tema/7 hover:border-tema cursor-pointer" : ""} group relative ${acertou ? "bg-green-600" : ""} ${acertou === false ? "bg-red-500" : ""}`}
      >
         <span
            className={`uppercase font-outfit font-black px-3 py-1.5 rounded-[6px] bg-tema/13 me-4 text-tema  ${acertou === undefined ? "group-hover:text-black group-hover:bg-tema" : ""} transition`}
         >
            {idAlternativa}
         </span>{" "}
         {textoAlternativa}
         {/* Overlay de loading */}
         {loading && <div className="size-full inset-0 absolute bg-tema rounded-[inherit] animate-caret-blink animation-duration-[500ms]"></div>}
      </button>
   );
};

export default CardAlternativa;
