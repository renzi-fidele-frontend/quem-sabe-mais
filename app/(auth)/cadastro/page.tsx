import Container from "@/components/layout/Container";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

const page = () => {
   return (
      <div className="py-6">
         <Container className="[&_span]:text-tema flex flex-nowrap gap-18 ">
            {/* Esquerda */}
            <div className="relative flex flex-col justify-between p-16 basis-[55%] gap-18 overflow-hidden">
               <Image
                  className="absolute inset-0 object-cover -z-2"
                  width={1920}
                  height={1500}
                  src="/img/fundo-palco-cadastro.webp"
                  alt="Palco do quem sabe mais"
               />
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
            <div className="grow flex flex-col justify-center font-sora py-12">
               <h6 className="text-3xl font-black text-white">Comece sua jornada!</h6>
               <p className="text-sm mb-6">Crie sua conta e entre na competição.</p>
               <LoginForm />
               <p className="mt-4 text-sm mb-6 text-center">
                  Já possui uma conta?{" "}
                  <Link className="ms-1 text-tema font-bold" href="/login">
                     Entrar
                  </Link>
               </p>
               <div className="flex items-center gap-2 flex-nowrap mb-4">
                  <hr className="flex grow" />
                  <p className="text-[11px]">ou cadastre-se com</p>
                  <hr className="flex grow" />
               </div>
               {/* Redes sociais */}
               <div className="flex gap-4 justify-center [&_button]:border-cor-borda [&_button]:px-4 [&_button]:py-3 [&_button]:border [&_button]:rounded-xl [&_button]:bg-azul-escuro2 *:flex *:grow *:justify-center *:gap-3.5 *:items-center text-white font-semibold text-sm">
                  <button>
                     <Image className="invert-100" src="/icons/google.svg" alt="Icone do google" width={16} height={16} />
                     Google
                  </button>
                  <button>
                     <Image className="invert-100" src="/icons/facebook.svg" alt="Icone do google" width={16} height={16} />
                     Facebook
                  </button>
               </div>
               <p className="flex gap-1.5 mt-6 text-[11px] items-center justify-center">
                  <Lock className="size-3.5" /> Seus dados estão protegidos.
               </p>
            </div>
         </Container>
      </div>
   );
};
export default page;
