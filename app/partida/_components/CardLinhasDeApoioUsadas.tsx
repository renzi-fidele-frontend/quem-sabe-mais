import { ArrowRight, Percent, Users } from "lucide-react";

type Props = { cardStyle: string; ajuda50Usada: boolean; pularPerguntaUsado: boolean; ajudaPublicaUsada: boolean };

const CardLinhasDeApoioUsadas = ({ cardStyle, ajuda50Usada, pularPerguntaUsado, ajudaPublicaUsada }: Props) => {
   const linhas = [
      { Icone: Percent, texto: "50/50", utilizada: ajuda50Usada },
      { Icone: ArrowRight, texto: "Pular Pergunta", utilizada: pularPerguntaUsado },
      { Icone: Users, texto: "Ajuda Pública", utilizada: ajudaPublicaUsada },
   ];

   return (
      <div className={cardStyle}>
         <h6 className="font-bold text-white mb-4">Linhas de apoio utilizadas</h6>
         <div className="space-y-2.5">
            {linhas.map((item, k) => (
               <div
                  className={`p-2 rounded-[8px] flex items-center justify-between ${item.utilizada ? "bg-azul-leve/90" : "opacity-60 border border-cor-borda"}`}
                  key={k}
               >
                  <p className={`flex items-center gap-2 font-sora text-[13px] ${item.utilizada ? "text-white" : ""}`}>
                     <item.Icone className={`size-4 stroke-3 ${item.utilizada ? "stroke-tema" : ""}`} /> {item.texto}
                  </p>
                  <span className={`uppercase text-[11px] font-bold ${item.utilizada ? "text-tema" : ""}`}>
                     {item.utilizada ? "Utilizada" : "Disponível"}
                  </span>
               </div>
            ))}
         </div>
      </div>
   );
};
export default CardLinhasDeApoioUsadas;
