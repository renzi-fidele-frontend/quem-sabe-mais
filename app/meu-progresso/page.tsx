import Container from "@/components/layout/Container";
import { CheckCheck, Coins, Gamepad, Target } from "lucide-react";
import Image from "next/image";
import CardEstatistica from "./_components/CardEstatistica";
import CardGraficoDesempenho from "./_components/CardGraficoDesempenho";
import CardResumoDaPerformace from "./_components/CardResumoDaPerformace";
import CardNivelJogador from "./_components/CardNivelJogador";

export default async function MeuProgresso() {
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
                     valor={"128"}
                     diferenca={12}
                     textoDiferenca={String(12)}
                     tipoPercentual={true}
                  />
                  {/* TOTAL DE GANHOS */}
                  <CardEstatistica titulo="TOTAL DE GANHOS" Icone={Coins} valor={"18.750 MT"} diferenca={2300} textoDiferenca={"+2.300 MT"} />
                  {/* PERGUNTAS ACERTADAS */}
                  <CardEstatistica titulo="PERGUNTAS ACERTADAS" Icone={CheckCheck} valor={"842"} diferenca={48} textoDiferenca={String(48)} />
                  {/* TAXA DE ACERTO */}
                  <CardEstatistica
                     titulo="TAXA DE ACERTO"
                     Icone={Target}
                     valor={"78,4%"}
                     diferenca={3.2}
                     textoDiferenca={String(3.2)}
                     tipoPercentual={true}
                  />
               </section>
               {/* Segunda Linha */}
               <section className="flex gap-8 flex-nowrap *:grow font-sora">
                  <CardGraficoDesempenho />
                  <CardGraficoDesempenho />
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
