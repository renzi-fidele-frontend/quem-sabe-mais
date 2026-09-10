import Container from "@/components/layout/Container";
import { Check } from "lucide-react";
import Image from "next/image";
import FundoAuth from "./_components/FundoAuth";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="py-6">
         <Container className="[&_span]:text-tema flex flex-nowrap gap-18 ">
            {/* Esquerda */}
            <div className="relative flex flex-col justify-between p-16 basis-[55%] gap-18 overflow-hidden">
               <FundoAuth />
               {/* Overlay */}
               <div className="size-full inset-0 absolute bg-fundo/65 -z-1"></div>
               {/* Logo do site */}
               <Image src="/logo.png" width={214} height={38} className="mb-2.75" alt="Logo do site" />
               <div>
                  <h4 className="text-[44px] leading-tight font-black text-white mb-3">
                     Seu conhecimento pode levar você <span>ao topo.</span>
                  </h4>
                  <p className="font-sora mb-6">Teste seus conhecimentos. Compita. Conquiste.</p>
                  <div className="space-y-3 *:flex *:gap-2 *:items-center [&_svg]:stroke-tema [&_svg]:size-5 text-white">
                     <p>
                        <Check /> Prêmios mensais em dinheiro real (MT)
                     </p>
                     <p>
                        <Check /> Mais de 8.000 perguntas sobre Moçambique e o Mundo
                     </p>
                  </div>
               </div>
               <p className="text-[12px]">O maior quiz de Moçambique • Jogue no telemóvel ou computador</p>
            </div>
            {/* Direita */}
            <div className="grow flex flex-col justify-center font-sora py-12 min-h-185">{children}</div>
         </Container>
      </div>
   );
}
