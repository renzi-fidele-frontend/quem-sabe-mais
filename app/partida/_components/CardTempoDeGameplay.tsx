import { Clock } from "lucide-react";

type Props = {
   cardStyle: string;
};

const CardTempoDeGameplay = ({ cardStyle }: Props) => {
   return (
      <div className={cardStyle}>
         <h6 className="flex items-center gap-2 font-bold text-white">
            <Clock className="stroke-tema" /> Seu tempo
         </h6>
         <div className="my-4 flex items-center justify-between">
            {/* Tempo total */}
            <div>
               <p className="text-tema font-extrabold text-2xl mb-0.5">02:47</p>
               <p className="text-xs font-sora">Tempo total</p>
            </div>
            {/* Média / pergunta */}
            <div>
               <p className="text-white font-extrabold text-2xl mb-0.5">16.7s</p>
               <p className="text-xs font-sora">Média / pergunta</p>
            </div>
         </div>
         <p className="text-tema font-sora text-xs">Você respondeu mais rápido que 64% dos jogadores.</p>
      </div>
   );
};
export default CardTempoDeGameplay;
