import Container from "@/components/layout/Container";
import Button from "@/components/shared/Button";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <div>
         {/* Background */}
         <div className="absolute inset-0">
            <Image className="absolute -z-2" width={1920} height={1500} src="/fundo-palco.webp" alt="Palco do quem sabe mais" />
            {/* Overlay */}
            <div className="inset-0 absolute -z-1 bg-fundo opacity-67 w-full h-full" />
         </div>
         {/* Conteúdo principal */}
         <div>
            {/* Hero */}
            <Container className="py-30">
               <section className="[&_span]:text-tema flex items-center gap-16 flex-nowrap">
                  {/* Esquerda */}
                  <div className="basis-[60%] space-y-8">
                     <h6 className="text-tema border-tema border rounded-lg px-4 py-1.5 bg-tema/13 text-sm w-fit font-sora">
                        🏆 O MAIOR QUIZ DE CONHECIMENTOS DE MOÇAMBIQUE
                     </h6>
                     <div className="text-white">
                        <div className="space-y-5">
                           <h1 className="text-7xl font-black">
                              QUEM SABE <span>MAIS?</span>
                           </h1>
                           <p className="text-3xl font-bold">
                              Mostre o que você sabe. <span>Conquiste o seu prêmio.</span>
                           </p>
                           <p className="text-lg text-[#E8E9EA] pe-30 font-sora mb-6">
                              Responda a perguntas desafiadoras sobre ciência, geografia, história, desporto e a nossa rica cultura moçambicana.
                              Suba nos rankings de liderança e <span className="font-bold">concorra a recompensas reais todas as épocas!</span>
                           </p>
                           <Link href="/jogar">
                              <Button className="px-9 py-4.5 gap-3.5">
                                 <Play /> COMEÇAR A JOGAR
                              </Button>
                           </Link>
                        </div>
                        <p className="text-sm text-[#E9EBEE] mt-4.25 font-sora opacity-80">É grátis para começar • Jogue diretamente do navegador</p>
                     </div>
                  </div>
                  {/* Direita */}
                  <div
                     className="**:font-sora border-2 border-tema bg-[#0d1127]/90 p-12 rounded-[28px] grow"
                     style={{ boxShadow: "0px 16px 48px 0 rgba(255,199,44,0.2)" }}
                  >
                     <div className="text-center">
                        <p className="text-tema text-sm">🥇 PRÉMIO que será distribuído</p>
                        <p className="">1000.00 MT</p>
                     </div>
                  </div>
               </section>
            </Container>
         </div>
      </div>
   );
}
