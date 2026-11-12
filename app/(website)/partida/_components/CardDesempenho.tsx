import { ArrowUp, Check, Minus, TrendingUp, X } from "lucide-react";
import ChartDesempenho from "./ChartDesempenho";
import { IRespostaPartida } from "@/models/Partida";
import { TOTAL_PERGUNTAS } from "@/data/jogo";

type Props = { cardStyle: string; headingStyle: string; respondidas: IRespostaPartida[] };

const CardDesempenho = ({ cardStyle, headingStyle, respondidas }: Props) => {
   let respostasCorretas = 0;
   let respostasErradas = 0;
   let respostasNaoRespondidas = 0;

   respondidas.forEach((resposta) => {
      if (resposta.correta === true) respostasCorretas++;
      if (resposta.correta === false) respostasErradas++;
   });

   respostasNaoRespondidas = TOTAL_PERGUNTAS - respostasCorretas - respostasErradas;

   const porcentagemAcertos = Math.round((respostasCorretas / TOTAL_PERGUNTAS) * 100);

   const mediaGlobalDosUsuarios = 61;

   return (
      <div className={`${cardStyle}`}>
         <h6 className={`${headingStyle}`}>Seu desempenho</h6>
         <div className="flex items-center">
            {/* Gráfico de percentagem dos acertos */}
            <div className="basis-54">
               <ChartDesempenho
                  porcentagemAcertos={porcentagemAcertos}
                  respostasCorretas={respostasCorretas}
                  respostasErradas={respostasErradas}
                  respostasNaoRespondidas={respostasNaoRespondidas}
               />
            </div>
            {/* Número de acertos */}
            <div className="text-white basis-auto [&_i]:p-1.5 [&_i]:rounded-[6px] *:flex *:gap-3 *:items-center [&_svg]:size-5 [&_svg]:stroke-4 font-sora space-y-4 text-sm">
               <div>
                  <i className="bg-[#177D2D]/13">
                     <Check className="stroke-green-600" />
                  </i>
                  {respostasCorretas} respostas corretas
               </div>
               <div>
                  <i className="bg-destructive/13">
                     <X className="stroke-destructive" />
                  </i>
                  {respostasErradas} respostas erradas
               </div>
               <div>
                  <i className="bg-texto-1/13">
                     <Minus className="stroke-texto-1" />
                  </i>
                  {respostasNaoRespondidas} não respondida
               </div>
            </div>
         </div>
         <hr className="mb-6 border-cor-borda" />
         <div className="p-4 rounded-[12px] font-sora bg-azul-leve flex items-center justify-between">
            <div>
               <p className="text-xs font-semibold mb-2.5 uppercase">Sua taxa vs Média global</p>
               <p className="text-sm">
                  <span className="font-outfit me-3 text-xl font-bold text-tema">{porcentagemAcertos}%</span> vs {mediaGlobalDosUsuarios}% média
               </p>
            </div>
            <p className="flex items-center text-tema text-[14px] px-3 py-1.5 bg-tema/13 rounded-[8px] font-bold font-outfit">
               <TrendingUp className="stroke-3 me-2" /> <ArrowUp className="size-5" /> 9% acima da média
            </p>
         </div>
      </div>
   );
};
export default CardDesempenho;
