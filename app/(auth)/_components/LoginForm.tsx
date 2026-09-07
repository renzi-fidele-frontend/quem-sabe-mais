"use client";
import Button from "@/components/shared/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowRight, AtSign, Lock, Mail, User } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
   return (
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
   );
};
export default LoginForm;
