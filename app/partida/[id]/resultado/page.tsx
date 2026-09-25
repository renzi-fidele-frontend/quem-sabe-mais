import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import { Award, TrendingUp } from "lucide-react";
import { dbConnect } from "@/lib/dbConnect";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import Partida, { IPartida } from "@/models/Partida";
import { notFound } from "next/navigation";
import ListaResumoPerguntas from "../../_components/ListaResumoPerguntas";
import CaminhoAoPremio from "../../_components/CaminhoAoPremio";
import CardTempoDeGameplay from "../../_components/CardTempoDeGameplay";
import CardDesempenho from "../../_components/CardDesempenho";

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
               <CardDesempenho respondidas={partida.respondidas} cardStyle={cardStyle} headingStyle={headingStyle} />
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
                  <CardTempoDeGameplay
                     respondidas={partida.respondidas}
                     dataInicio={partida.dataInicio}
                     dataFim={partida.dataFim}
                     cardStyle={cardStyle2}
                  />
               </div>
               {/* Linhas de apoio utilizadas */}
               {/* Conquistas alcançadas */}
            </div>
         </div>
      </Container>
   );
}
