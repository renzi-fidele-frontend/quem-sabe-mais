import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import { Award, TrendingUp } from "lucide-react";
import { dbConnect } from "@/lib/dbConnect";
import { obterSessaoComUsuario } from "@/lib/auth/session";
import { Pergunta } from "@/models/Pergunta";
import Partida, { IPartida } from "@/models/Partida";
import { notFound } from "next/navigation";
import ListaResumoPerguntas from "../../_components/ListaResumoPerguntas";
import CaminhoAoPremio from "../../_components/CaminhoAoPremio";
import CardTempoDeGameplay from "../../_components/CardTempoDeGameplay";
import CardDesempenho from "../../_components/CardDesempenho";
import Image from "next/image";
import CardLinhasDeApoioUsadas from "../../_components/CardLinhasDeApoioUsadas";
import obterProgressoXpUsuario from "@/lib/game/obterProgresso";
import { calcularXPGanhoNaPartida } from "@/lib/game/calcularXpGanhoNaPartida";
import CardProgressoEvolucao from "../../_components/CardProgressoEvolucao";
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

   // Apanhar última partida
   const ultimaPartida = await Partida.findOne({
      usuarioId: usuario?.usuario._id,
      // Excluir a partida atual da busca
      _id: { $ne: partida._id },
      status: { $in: ["vitoria", "eliminado", "abandonado"] },
   })
      .sort({ dataFim: -1 })
      .lean<IPartida>();

   // Calculando o número de respostas corretas
   let totalAcertosAtual = 0;
   partida?.respondidas.forEach((resposta) => {
      if (resposta.correta) totalAcertosAtual++;
   });
   let totalAcertosAnterior = 0;
   ultimaPartida?.respondidas.forEach((resposta) => {
      if (resposta.correta) {
         totalAcertosAnterior++;
      }
   });

   // Calculando a taxa de acerto
   const taxaAcertoAtual = partida.respondidas.length > 0 ? (totalAcertosAtual / partida.respondidas.length) * 100 : 0;
   const taxaAcertoAnterior =
      ultimaPartida && ultimaPartida.respondidas.length > 0 ? (totalAcertosAnterior / ultimaPartida.respondidas.length) * 100 : 0;

   // Calculando as diferenças
   const diferencaTaxaAcerto = taxaAcertoAtual - taxaAcertoAnterior;
   const diferencaPremio = partida.valorAtual - (ultimaPartida?.valorAtual ?? 0);
   const diferencaAcertos = totalAcertosAtual - totalAcertosAnterior;

   const comparacaoUltimaPartida = {
      taxaAcerto: taxaAcertoAtual,
      diferencaTaxaAcerto,
      premio: partida.valorAtual,
      diferencaPremio,
      acertos: totalAcertosAtual,
      diferencaAcertos,
   };

   function analisarValorGanho() {
      if (partida?.valorAtual! < 1000) {
         return "Partida azarada";
      } else if (partida?.valorAtual! >= 1000 && partida?.valorAtual! < 7500) {
         return "Boa tentativa";
      } else if (partida?.valorAtual! >= 7500 && partida?.valorAtual! < 100000) {
         return "Excelente partida";
      } else if (partida?.valorAtual! >= 100000) {
         return "Partida extraordinária";
      }
   }

   function analisarDesempenho() {
      if (partida?.perguntaAtual! < 2) {
         return "desempenho péssimo";
      } else if (partida?.perguntaAtual! >= 2 && partida?.perguntaAtual! < 4) {
         return "desempenho ruim";
      } else if (partida?.perguntaAtual! >= 4 && partida?.perguntaAtual! < 7) {
         return "desempenho normal";
      } else if (partida?.perguntaAtual! >= 7 && partida?.perguntaAtual! < 10) {
         return "bom desempenho";
      } else if (partida?.perguntaAtual! >= 10 && partida?.perguntaAtual! < 15) {
         return "excelente desempenho";
      } else if (partida?.perguntaAtual! >= 15) {
         return "desempenho de mestre";
      }
   }

   // Isso também nos permite detectar subida de nível
   // const progressoAnterior = obterProgressoXpUsuario(xpAnterior);
   // const progressoAtual = obterProgressoXpUsuario(xpAtual);
   // const subiuDeNivel = progressoAtual.nivel > progressoAnterior.nivel;

   const xpGanho = calcularXPGanhoNaPartida(totalAcertosAtual);
   const progresso = obterProgressoXpUsuario(usuario?.usuario.xp ?? 0);

   console.log({ progresso });

   return (
      <div className="relative pb-20">
         {/* Fundo com overlay */}
         <Image
            width={1920}
            height={1087}
            src="/img/fundo-palco-gameplay.webp"
            className="inset-0 size-full object-top -z-2 absolute"
            alt="Fundo ilustrando um palco competitivo do Quem sabe mais"
         />
         <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-75"></div>
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
                  descricao={`Você chegou até a pergunta ${partida.perguntaAtual} e terminou a partida com um ${analisarDesempenho()}.`}
                  titulo={`${analisarValorGanho()}, ${usuario?.usuario.nickname}!`}
               />
               {/* TODO: Renderizar caso o usuário tenha subido de nível */}
               <div className="text-center space-y-2">
                  <p className="font-black text-[80px] text-tema leading-tight">
                     {new Intl.NumberFormat("pt-MZ").format(partida.valorAtual)} MT
                  </p>
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
                  <ListaResumoPerguntas
                     lista={JSON.parse(JSON.stringify(partida.respondidas))}
                     cardStyle={cardStyle}
                     headingStyle={headingStyle}
                  />
                  {/* Progresso e evolução */}
                  <div>
                     <CardProgressoEvolucao
                        comparacaoUltimaPartida={comparacaoUltimaPartida}
                        xpGanho={xpGanho}
                        progresso={progresso}
                        cardStyle={cardStyle}
                        headingStyle={headingStyle}
                     />
                  </div>
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
                  <div>
                     <CardLinhasDeApoioUsadas
                        ajuda50Usada={partida.ajuda50Usada}
                        pularPerguntaUsado={partida.pularPerguntaUsado}
                        ajudaPublicaUsada={partida.ajudaPublicaUsada}
                        cardStyle={cardStyle2}
                     />
                  </div>
                  {/* Conquistas alcançadas */}
               </div>
            </div>
         </Container>
      </div>
   );
}
