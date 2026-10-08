import Container from "@/components/layout/Container";
import Image from "next/image";

export default async function HistoricoPage() {
   return (
      <div className="relative">
         {/* Fundo com overlay */}
         <Image
            width={1920}
            height={1087}
            src="/img/fundo-palco-gameplay.webp"
            className="inset-0 size-full object-cover -z-2 absolute"
            alt=""
         />
         <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-70"></div>
         <Container className="pt-10 pb-20">
            <h1 className="text-[40px] font-black text-white mb-3">Histórico de partidas</h1>
            <p className="font-sora text-[15px]">Veja todas as suas partidas, resultados, prémios e desempenho ao longo do tempo.</p>
            {/* Filtragem */}
            <section></section>
            {/* Conteúdo principal */}
            <section>
               {/* Esquerda */}
               <div>
                  {/* Listagem das partidas */}
                  <div></div>
               </div>
               {/* Direita */}
               <div>
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
