import Container from "@/components/layout/Container";
import Button from "@/components/shared/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowRight, AtSign, Check, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
               <form className="space-y-3.5 [&_fieldset]:flex [&_fieldset]:flex-col [&_fieldset]:gap-1.5 [&_label]:text-[13px] [&_label]:font-semibold">
                  {/* Nome completo */}
                  <fieldset>
                     <label htmlFor="nome_real">Nome completo</label>
                     <InputGroup className="bg-azul-escuro2 border-cor-borda">
                        <InputGroupInput name="nome_real" placeholder="Digite seu nome completo" />
                        <InputGroupAddon className="">
                           <User />
                        </InputGroupAddon>
                     </InputGroup>
                  </fieldset>
                  {/* Nome de usuário */}
                  <fieldset>
                     <label htmlFor="username">Nome de usuário</label>
                     <InputGroup className="bg-azul-escuro2 border-cor-borda">
                        <InputGroupInput name="username" placeholder="Escolha seu nome de usuário" />
                        <InputGroupAddon className="">
                           <AtSign />
                        </InputGroupAddon>
                     </InputGroup>
                  </fieldset>
                  {/* E-mail */}
                  <fieldset>
                     <label htmlFor="email">Email</label>
                     <InputGroup className="bg-azul-escuro2 border-cor-borda">
                        <InputGroupInput name="email" placeholder="Digite seu email" />
                        <InputGroupAddon className="">
                           <Mail />
                        </InputGroupAddon>
                     </InputGroup>
                  </fieldset>
                  {/* Senha */}
                  <fieldset>
                     <label htmlFor="senha">Senha</label>
                     <InputGroup className="bg-azul-escuro2 border-cor-borda">
                        <InputGroupInput type="password" name="senha" placeholder="Crie uma senha" />
                        <InputGroupAddon className="">
                           <Lock />
                        </InputGroupAddon>
                     </InputGroup>
                     {/* TODO: Definir o estado que identifica o nível de segurança da senha
                     Deverei instalar o pacote https://zxcvbn-ts.github.io/zxcvbn/guide/getting-started/#installation
                     */}
                  </fieldset>
                  {/* Confirmar senha */}
                  <fieldset>
                     <label htmlFor="confirmacao_senha">Confirmar senha</label>
                     <InputGroup className="bg-azul-escuro2 border-cor-borda">
                        <InputGroupInput type="password" name="confirmacao_senha" placeholder="Digite a senha novamente" />
                        <InputGroupAddon className="">
                           <Lock />
                        </InputGroupAddon>
                     </InputGroup>
                  </fieldset>
                  {/* Termos e condições */}
                  <fieldset className="my-6">
                     <div className="flex gap-2">
                        <Checkbox id="termos_condicoes" className="size-4.5 mt-0.5" />
                        <label htmlFor="termos_condicoes" className="[&_a]:text-tema text-sm!">
                           Li e concordo com os <Link href="/termos_e_condicoes">Termos e Condições</Link> e a{" "}
                           <Link href="/politica_de_privacidade">Política de Privacidade</Link>.
                        </label>
                     </div>
                  </fieldset>
                  {/* Confirmação da política do site */}
                  <Button className="w-full py-4">
                     CRIAR CONTA <ArrowRight className="stroke-3" />
                  </Button>
               </form>
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
               <div className="flex gap-4 justify-center [&_button]:border-cor-borda [&_button]:px-4 [&_button]:py-3 [&_button]:border [&_button]:rounded-2xl [&_button]:bg-azul-escuro2  *:flex *:grow *:justify-center *:gap-2 *:items-center">
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
