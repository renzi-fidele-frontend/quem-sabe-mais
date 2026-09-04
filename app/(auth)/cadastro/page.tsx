import Container from "@/components/layout/Container";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Check, SearchIcon } from "lucide-react";
import Image from "next/image";

const page = () => {
   return (
      <Container className="[&_span]:text-tema flex flex-nowrap gap-18">
         {/* Esquerda */}
         <div className="relative flex flex-col justify-between p-16 basis-[55%] gap-18">
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
               <h4 className="text-5xl font-black text-white mb-3">
                  Seu conhecimento pode levar você <span>ao topo.</span>
               </h4>
               <p className="font-sora text-lg mb-6">Teste seus conhecimentos. Compita. Conquiste.</p>
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
         <form className="grow">
            <h6>Comece sua jornada!</h6>
            <p>Crie sua conta e entre na competição.</p>
            <div>
               {/* Nome completo */}
               <InputGroup>
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon>
                     <SearchIcon />
                  </InputGroupAddon>
               </InputGroup>
               {/* Nome de usuário */}
               <fieldset></fieldset>
               {/* E-mail */}
               <fieldset></fieldset>
               {/* Senha */}
               <fieldset></fieldset>
               {/* Confirmar senha */}
               <fieldset></fieldset>
            </div>
            {/* Confirmação da política do site */}
         </form>
      </Container>
   );
};
export default page;
