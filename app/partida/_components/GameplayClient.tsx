"use client";
import { useEffect, useState } from "react";
import CardAlternativa from "./CardAlternativa";
import LinhasDeApoio from "./LinhasDeApoio";
import { IAlternativa } from "@/models/Pergunta";

type Props = { perguntaId: string; alternativas: IAlternativa[]; partidaId: string; ajuda50Usada: boolean };

const GameplayClient = ({ perguntaId, partidaId, alternativas, ajuda50Usada }: Props) => {
   const [alternativasIncorretas5050, setAlternativasIncorretas5050] = useState<string[] | null>(null);

   // Limpa alternativas incorretas 50/50 ao mudar de pergunta
   useEffect(() => {
      setAlternativasIncorretas5050(null);
   }, [perguntaId]);

   return (
      <>
         {/* Alternativas */}
         <div className="grid grid-cols-2 gap-5 *:text-start text-lg">
            {alternativas.map((alternativa, k) => (
               <CardAlternativa
                  efeitoAjuda50={alternativasIncorretas5050?.includes(alternativa.id)!}
                  idAlternativa={alternativa.id}
                  textoAlternativa={alternativa.texto}
                  partidaId={partidaId}
                  key={`${perguntaId}-${alternativa.id}`}
               />
            ))}
         </div>
         {/* Separador */}
         <hr className="border-cor-borda my-9" />
         {/* Linhas de Apoio */}
         <LinhasDeApoio ajuda50utilizado={ajuda50Usada} aoUsarAjuda50={(alternativas) => setAlternativasIncorretas5050(alternativas)} partidaId={partidaId} />
      </>
   );
};
export default GameplayClient;
