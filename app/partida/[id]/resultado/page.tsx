import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import { Award, TrendingUp } from "lucide-react";

export default async function ResultadoPage() {
   return (
      <Container>
         {/* TODO: Adicionar a seção do hero a página  */}
         {/* Hero */}
         <div className="pb-12">
            <SectionIntro
               className="pb-10!"
               subtitulo={
                  <>
                     <Award className="size-4.5 me-1.5" /> Partida Concluída!
                  </>
               }
               descricao={`Você chegou até a pergunta 10 e terminou a partida com um ótimo desempenho.`}
               titulo={`Excelente trabalho, Renzi!`}
            />
            <div className="text-center space-y-2">
               <p className="font-black text-[80px] text-tema leading-tight">7.500 MT</p>
               {/* Caso o usuário suba de nivel */}
               <p className="uppercase font-sora font-semibold">Prêmio conquistado</p>
               <span className="flex items-center gap-2 px-3 py-1 rounded-[6px] bg-green-700 text-white w-fit mx-auto font-bold text-sm">
                  <TrendingUp className="size-5 stroke-3" /> Nível 5 alcançado
               </span>
            </div>
         </div>
         {/* Feedback */}
         <div className="flex items-center gap-6 p-5 rounded-[12px] bg-tema/5">
            <Award className="stroke-tema size-7" />
            <div>
               <p className="font-bold text-tema text-lg">Mandou bem!</p>
               <p className="font-sora text-sm">
                  Você teve um desempenho acima da média nesta partida. Continue jogando para subir de nível e chegar ainda mais perto dos
                  100.000 MT.
               </p>
            </div>
         </div>
         {/* Estatísticas */}
         <div className="pt-8">
            {/* Esquerda */}
            <div>
               {/* Desempenho */}
               <div></div>
               {/* Resumo das perguntas */}
               <div></div>
               {/* Progresso e evolução */}
               <div></div>
            </div>
            {/* Direita */}
            <div>
               {/* Caminho até o prêmio */}
               <div></div>
               {/* Tempo de gameplay */}
               <div></div>
               {/* Linhas de apoio utilizadas */}
               {/* Conquistas alcançadas */}
            </div>
         </div>
      </Container>
   );
}
