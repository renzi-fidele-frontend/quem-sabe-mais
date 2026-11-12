import { ResumoDaPerformance } from "../_lib/obterResumoDaPerformance";

type Props = { resumoDaPerformance: ResumoDaPerformance };
const CardResumoDaPerformace = ({ resumoDaPerformance }: Props) => {
   const data = [
      { titulo: "Melhor sequência", dado: `${resumoDaPerformance.melhorSequencia} acertos` },
      { titulo: "Maior prêmio", dado: `${new Intl.NumberFormat("pt-MZ").format(resumoDaPerformance.maiorPremio)} MT` },
      { titulo: "Máx. perguntas/partida", dado: `${resumoDaPerformance.melhorSequencia}/15` },
      { titulo: "Média perguntas/partida", dado: resumoDaPerformance.mediaPerguntasPartida },
      { titulo: "Total respondidas", dado: resumoDaPerformance.totalRespondidas },
      { titulo: "Respostas erradas", dado: resumoDaPerformance.respostasErradas },
      { titulo: "Partidas vencidas", dado: resumoDaPerformance.partidasVencidas },
      { titulo: "Partidas abandonadas", dado: resumoDaPerformance.partidasAbandonadas },
   ];

   return (
      <div className="border border-cor-borda p-8 rounded-[24px] bg-azul-escuro2/90">
         <h6 className="font-sora text-lg font-bold text-white mb-6">Resumo da performace</h6>
         <div className="flex flex-wrap gap-4">
            {data.map((item, k) => (
               <div className="grow basis-[calc(25%-(--spacing(4)))] p-4 border border-cor-borda rounded-[12px] bg-azul-leve/90" key={k}>
                  <p className="mb-2 text-[11px] uppercase font-sora font-semibold">{item.titulo}</p>
                  <span className="text-white font-bold text-[20px]">{item.dado}</span>
               </div>
            ))}
         </div>
      </div>
   );
};
export default CardResumoDaPerformace;
