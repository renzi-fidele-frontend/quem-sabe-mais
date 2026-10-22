import Container from "@/components/layout/Container";
import { CheckCheck, Coins, Gamepad, Target } from "lucide-react";
import Image from "next/image";
import CardEstatistica from "./_components/CardEstatistica";
import CardGraficoDesempenho from "./_components/CardGraficoDesempenho";
import CardResumoDaPerformace from "./_components/CardResumoDaPerformace";
import CardNivelJogador from "./_components/CardNivelJogador";

// TODO: Após implementar o sistema de temporadas, deverei dar continuidade nesta página
export default async function MeuProgresso() {
   const chartData = [
      { data: "Out", valor: 1000 },
      { data: "Nov", valor: 500 },
      { data: "Dez", valor: 800 },
      { data: "Jan", valor: 500 },
      { data: "Fev", valor: 1000 },
      { data: "Atual", valor: 1300 },
   ];

   // Dados da seção da primeira linha
   const estatisticas = {
      totalDeJogos: 128,
      diferencaTotalDeJogos: 12,
      totalGanhos: 10075,
      diferencaTotalGanhos: 2300,
      perguntasAcertadas: 842,
      diferencaPerguntasAcertadas: 48,
      taxaDeAcertos: 78.4,
      diferencaTaxaDeAcertos: 3.2,
   };

   return (
      <div className="relative">
         {/* Fundo com overlay */}
         <Image
            width={1920}
            height={1087}
            src="/img/fundo-palco-gameplay.webp"
            className="inset-0 size-full object-cover object-top -z-2 absolute"
            alt="Imagem de fundo do palco"
         />
         <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-75"></div>
         <Container className="pt-10 pb-20">
            <h1 className="text-[40px] font-black text-white mb-3">Meu Progresso</h1>
            <p className="font-sora text-[15px] mb-10">Acompanhe sua evolução, suas conquistas e seu desempenho no Quem Sabe Mais.</p>
            <main className="flex flex-col gap-10">
               {/* Primeira Linha */}
               <section className="flex flex-nowrap gap-6 *:basis-1/4">
                  {/* TOTAL DE JOGOS */}
                  <CardEstatistica
                     titulo="TOTAL DE JOGOS"
                     Icone={Gamepad}
                     valor={`${estatisticas.totalDeJogos}`}
                     diferenca={estatisticas.diferencaTotalDeJogos}
                     textoDiferenca={String(estatisticas.diferencaTotalDeJogos)}
                     tipoPercentual={true}
                  />
                  {/* TOTAL DE GANHOS */}
                  <CardEstatistica
                     titulo="TOTAL DE GANHOS"
                     Icone={Coins}
                     valor={`${estatisticas.totalGanhos} MT`}
                     diferenca={estatisticas.diferencaTotalGanhos}
                     textoDiferenca={`+${estatisticas.diferencaTotalGanhos} MT`}
                  />
                  {/* PERGUNTAS ACERTADAS */}
                  <CardEstatistica
                     titulo="PERGUNTAS ACERTADAS"
                     Icone={CheckCheck}
                     valor={`${estatisticas.perguntasAcertadas}`}
                     diferenca={estatisticas.diferencaPerguntasAcertadas}
                     textoDiferenca={String(estatisticas.diferencaPerguntasAcertadas)}
                  />
                  {/* TAXA DE ACERTO */}
                  <CardEstatistica
                     titulo="TAXA DE ACERTO"
                     Icone={Target}
                     valor={`${estatisticas.taxaDeAcertos}%`}
                     diferenca={estatisticas.diferencaTaxaDeAcertos}
                     textoDiferenca={String(estatisticas.diferencaTaxaDeAcertos)}
                     tipoPercentual={true}
                  />
               </section>
               {/* Segunda Linha */}
               <section className="flex gap-8 flex-nowrap *:grow *:basis-1/2 font-sora">
                  <CardGraficoDesempenho chartData={chartData} />
                  <CardGraficoDesempenho chartData={chartData} />
               </section>
               {/* Terceira Linha */}
               <section>
                  <CardResumoDaPerformace />
               </section>
               {/* Quarta Linha */}
               <section>
                  <CardNivelJogador />
               </section>
               {/* Quinta Linha */}
               <section></section>
               {/* Sexta Linha */}
               <section></section>
            </main>
         </Container>
      </div>
   );
}
