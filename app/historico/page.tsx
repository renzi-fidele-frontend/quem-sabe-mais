import Container from "@/components/layout/Container";
import Image from "next/image";
import ListagemDasPartidas from "./_components/ListagemDasPartidas";

export default async function HistoricoPage() {
   return (
      <div className="relative">
         {/* Fundo com overlay */}
         <Image
            width={1920}
            height={1087}
            src="/img/fundo-palco-gameplay.webp"
            className="inset-0 size-full object-cover object-top -z-2 absolute"
            alt=""
         />
         <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-75"></div>
         <Container className="pt-10 pb-20">
            <h1 className="text-[40px] font-black text-white mb-3">Histórico de partidas</h1>
            <p className="font-sora text-[15px] mb-10">Veja todas as suas partidas, resultados, prémios e desempenho ao longo do tempo.</p>

            {/* TODO: Ao escalar adicionar a seção de filtragem */}

            {/* Conteúdo principal */}
            <section className="flex">
               {/* Esquerda */}
               <div className="basis-[69%]">
                  {/* Listagem das partidas */}
                  <ListagemDasPartidas />
               </div>
               {/* Direita */}
               <div className="basis-[31%]">
                  {/* Resumo do período */}
                  <div></div>
                  {/* Melhor partida de todos os tempos */}
                  <div></div>
               </div>
            </section>
         </Container>
      </div>
   );
}
