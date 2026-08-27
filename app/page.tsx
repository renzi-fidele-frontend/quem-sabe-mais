import Container from "@/components/layout/Container";
import Button from "@/components/shared/Button";
import { Info, Play, Shield, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <div>
         {/* Background */}
         <div className="absolute inset-0 -z-2">
            <div className="relative">
               <Image className="" width={1920} height={1500} src="/img/fundo-palco.webp" alt="Palco do quem sabe mais" />
               {/* Overlay */}
               <div className="inset-0 absolute bg-fundo opacity-70 size-full" />
            </div>
         </div>
         {/* Conteúdo principal */}
         <div>
            {/* Hero */}
            <Container className="pt-23 pb-20">
               <section className="[&_span]:text-tema flex items-center gap-16 flex-nowrap">
                  {/* Esquerda */}
                  <div className="basis-[75%] space-y-7">
                     <h6 className="text-tema border-tema border rounded-lg px-4 py-1.5 bg-tema/12 text-sm w-fit font-sora font-bold">
                        🏆 O MAIOR QUIZ DE CONHECIMENTOS DE MOÇAMBIQUE
                     </h6>
                     <div className="text-white">
                        <div className="space-y-6">
                           <h1 className="text-7xl font-black">
                              QUEM SABE <span>MAIS?</span>
                           </h1>
                           <p className="text-3xl font-bold">
                              Mostre o que você sabe. <span>Conquiste o seu prêmio.</span>
                           </p>
                           <p className="text-lg text-[#E8E9EA] pe-30 font-sora mb-8">
                              Responda a perguntas desafiadoras sobre ciência, geografia, história, desporto e a nossa rica cultura moçambicana.
                              Suba nos rankings de liderança e <span className="font-bold">concorra a recompensas reais todas as épocas!</span>
                           </p>
                           <Link href="/jogar">
                              <Button className="px-9 py-4.5 gap-3.5 font-black!">
                                 <Play className="stroke-3" /> COMEÇAR A JOGAR
                              </Button>
                           </Link>
                        </div>
                        <p className="text-sm text-[#E9EBEE] mt-4.5 font-sora opacity-80">
                           É grátis para começar • Jogue diretamente do navegador
                        </p>
                     </div>
                  </div>
                  {/* Direita */}
                  <div
                     className="**:font-sora border-2 border-tema bg-azul-escuro2/90 p-12 rounded-[28px] grow space-y-6"
                     style={{ boxShadow: "0px 16px 48px 0 rgba(255,199,44,0.2)" }}
                  >
                     <div className="text-center space-y-5">
                        <p className="text-tema text-sm font-extrabold uppercase">
                           🥇 PRÉMIO que será distribuído entre os top 3 melhores jogagores
                        </p>
                        <p className="font-outfit text-5xl text-tema text-shadow-md text-shadow-tema font-black">1000.00 MT</p>
                        <Image src="/img/maleta-com-dinheiro.webp" width={534} height={299} alt="" />
                        <p className="text-white font-semibold">Para o grande campeão do mês!</p>
                     </div>
                     <hr className="border-[#1E254A]" />
                     <div className="*:gap-3 space-y-4 text-sm [&_svg]:size-5">
                        <p className="flex items-center">
                           <Star className="stroke-tema" /> Mostre seu conhecimento e conquiste o topo
                        </p>
                        <p className="flex items-center">
                           <Shield className="stroke-tema" /> Suba nos níveis e seja um grande vencedor
                        </p>
                     </div>
                     <Link
                        className="uppercase text-tema text-center bg-tema/13 p-4 rounded-xl flex items-center grow justify-center text-sm font-bold "
                        href="central-de-ajuda"
                     >
                        <Info className="size-4.75 me-2" /> Saiba mais sobre o prêmio
                     </Link>
                  </div>
               </section>
            </Container>
            {/* Estatísticas */}
            <div className="bg-azul-escuro2 border border-cor-borda rounded-2xl uppercase [&_p]:text-tema [&_p]:text-2xl [&_p]:font-black [&_span]:font-semibold [&_span]:font-sora [&_span]:text-[12px] flex max-w-7xl px-10 py-6 justify-between items-center">
               <div>
                  <p>10.000+</p>
                  <span>Jogadores ativos</span>
               </div>
               <div className="h-9 border-r-2 border-cor-borda"></div>
               <div>
                  <p>500.000+</p>
                  <span>Perguntas respondidas</span>
               </div>
               <div className="h-9 border-r-2 border-cor-borda"></div>
               <div>
                  <p>100.000 MT</p>
                  <span>em prémios mensais</span>
               </div>
               <div className="h-9 border-r-2 border-cor-borda"></div>
               <div>
                  <p>15</p>
                  <span>perguntas por partida</span>
               </div>
            </div>
         </div>
      </div>
   );
}
