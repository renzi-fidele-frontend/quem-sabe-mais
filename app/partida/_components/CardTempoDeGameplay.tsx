import { Clock } from "lucide-react";
import calcularDuracao from "../[id]/resultado/_lib/calcularDuracao";
import { IRespostaPartida } from "@/models/Partida";

type Props = {
   cardStyle: string;
   dataInicio: Date;
   dataFim?: Date;
   respondidas: IRespostaPartida[];
};

const CardTempoDeGameplay = ({ cardStyle, dataInicio, dataFim, respondidas }: Props) => {
   // TODO: Calcular a média de tempo por pergunta
   const mediaTempoPorPerguntaMs = (dataFim!.getTime() - dataInicio.getTime()) / respondidas.length;
   const mediaTempoPorPergunta = mediaTempoPorPerguntaMs / 1000;

   return (
      <div className={cardStyle}>
         <h6 className="flex items-center gap-2 font-bold text-white">
            <Clock className="stroke-tema" /> Seu tempo
         </h6>
         <div className="my-4 flex items-center justify-between">
            {/* Tempo total */}
            <div>
               <p className="text-tema font-extrabold text-2xl mb-0.5 tracking-wider">{calcularDuracao(dataInicio, dataFim!)}</p>
               <p className="text-xs font-sora">Tempo total</p>
            </div>
            {/* Média / pergunta */}
            <div className="text-end">
               <p className="text-white font-extrabold text-2xl mb-0.5">{mediaTempoPorPergunta.toFixed(1)}s</p>
               <p className="text-xs font-sora">Média / pergunta</p>
            </div>
         </div>
         {/* TODO: Calcular o quão rápido foi o jogador atual em comparação aos outros jogadores */}
         <p className="text-tema font-sora text-xs">Você respondeu mais rápido que 64% dos jogadores.</p>
      </div>
   );
};
export default CardTempoDeGameplay;
