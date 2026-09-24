import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import { ArrowUp, Award, Check, Minus, TrendingUp, X } from "lucide-react";
import ChartDesempenho from "../../_components/ChartDesempenho";
import { dbConnect } from "@/lib/dbConnect";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import Partida, { IPartida } from "@/models/Partida";
import { notFound } from "next/navigation";
import ListaResumoPerguntas from "../../_components/ListaResumoPerguntas";
import CaminhoAoPremio from "../../_components/CaminhoAoPremio";
import CardTempoDeGameplay from "../../_components/CardTempoDeGameplay";

const cardStyle = "bg-azul-escuro2/90 border border-cor-borda rounded-[20px] p-6";
const cardStyle2 = "bg-azul-escuro2/90 border border-cor-borda rounded-[20px] p-5";
const headingStyle = "text-white font-bold text-xl";

export default async function ResultadoPage({ params }: { params: Promise<{ id: string }> }) {
   await dbConnect();
   const { id } = await params;
   const usuario = await obterSessaoComUsuario();
   const partida = await Partida.findOne({ _id: id, usuarioId: usuario?.usuario._id })
      .lean<IPartida>()
      .populate({ path: "respondidas.perguntaId", select: "enunciado alternativas" });

   // Caso a partida ainda esteja em andamento
   if (!partida || partida.status === "em_andamento") {
      return notFound();
   }

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
         <div className="pt-8 flex flex-nowrap gap-8">
            {/* Esquerda */}
            <div className="space-y-8 basis-[68%]">
               {/* Desempenho */}
               <div className={`${cardStyle}`}>
                  <h6 className={`${headingStyle}`}>Seu desempenho</h6>
                  <div className="flex items-center">
                     {/* Gráfico de percentagem dos acertos */}
                     <div className="basis-54">
                        <ChartDesempenho />
                     </div>
                     {/* Número de acertos */}
                     <div className="text-white basis-auto [&_i]:p-1.5 [&_i]:rounded-[6px] *:flex *:gap-3 *:items-center [&_svg]:size-5 [&_svg]:stroke-4 font-sora space-y-4 text-sm">
                        <div>
                           <i className="bg-[#177D2D]/13">
                              <Check className="stroke-green-600" />
                           </i>
                           7 respostas corretas
                        </div>
                        <div>
                           <i className="bg-destructive/13">
                              <X className="stroke-destructive" />
                           </i>
                           2 respostas erradas
                        </div>
                        <div>
                           <i className="bg-texto-1/13">
                              <Minus className="stroke-texto-1" />
                           </i>
                           1 não respondida
                        </div>
                     </div>
                  </div>
                  <hr className="mb-6 border-cor-borda" />
                  <div className="p-4 rounded-[12px] font-sora bg-azul-leve flex items-center justify-between">
                     <div>
                        <p className="text-xs font-semibold mb-2.5 uppercase">Sua taxa vs Média global</p>
                        <p className="text-sm">
                           <span className="font-outfit me-3 text-xl font-bold text-tema">70%</span> vs 61% média
                        </p>
                     </div>
                     <p className="flex items-center text-tema text-[14px] px-3 py-1.5 bg-tema/13 rounded-[8px] font-bold font-outfit">
                        <TrendingUp className="stroke-3 me-2" /> <ArrowUp className="size-5" /> 9% acima da média
                     </p>
                  </div>
               </div>
               {/* Resumo das perguntas */}
               <ListaResumoPerguntas lista={JSON.parse(JSON.stringify(partida.respondidas))} cardStyle={cardStyle} headingStyle={headingStyle} />

               {/* Progresso e evolução */}
               <div></div>
            </div>
            {/* Direita */}
            <div className="basis-[32%] space-y-8">
               {/* Caminho até o prêmio */}
               <div>
                  <CaminhoAoPremio respondidas={partida.respondidas} cardStyle={cardStyle2} />
               </div>
               {/* Tempo de gameplay */}
               <div>
                  <CardTempoDeGameplay cardStyle={cardStyle2} />
               </div>
               {/* Linhas de apoio utilizadas */}
               {/* Conquistas alcançadas */}
            </div>
         </div>
      </Container>
   );
}
