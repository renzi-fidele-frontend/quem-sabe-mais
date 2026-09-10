"use client";
import Button from "@/components/shared/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { verificarForcaSenha } from "@/lib/verificarForcaSenha";
import { ArrowRight, AtSign, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { criarConta } from "../_actions";

const SignUpForm = () => {
   const [senha, setSenha] = useState("");
   const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
   const [mostrarSenha, setMostrarSenha] = useState(false);

   const nivelSegurancaDaSenha = useMemo(() => verificarForcaSenha(senha), [senha]);

   const senhasCoincidem = senha.length > 0 && confirmacaoSenha.length > 0 && senha === confirmacaoSenha;

   const senhaForte = nivelSegurancaDaSenha.score >= 2;

   function analisarCorNivel(nivel: number) {
      switch (nivel) {
         case 0:
            return "bg-red-500";
         case 1:
            return "bg-red-500";
         case 2:
            return "bg-orange-500";
         case 3:
            return "bg-yellow-500";
         case 4:
            return "bg-green-500";
         default:
            return "bg-thema";
      }
   }

   return (
      <form
         action={criarConta}
         className="space-y-3.5 [&_fieldset]:flex [&_fieldset]:flex-col [&_fieldset]:gap-1.5 [&_label]:text-[13px] [&_label]:font-semibold"
      >
         {/* Nome completo */}
         <fieldset>
            <label htmlFor="nome_real">Nome completo</label>
            <InputGroup className="bg-azul-escuro2 border-cor-borda">
               <InputGroupInput required name="nome_real" placeholder="Digite seu nome completo" />
               <InputGroupAddon>
                  <User />
               </InputGroupAddon>
            </InputGroup>
         </fieldset>
         {/* Nome de usuário */}
         <fieldset>
            <label htmlFor="username">Nome de usuário</label>
            <InputGroup className="bg-azul-escuro2 border-cor-borda">
               <InputGroupInput required name="username" placeholder="Escolha seu nome de usuário" />
               <InputGroupAddon>
                  <AtSign />
               </InputGroupAddon>
            </InputGroup>
         </fieldset>
         {/* E-mail */}
         <fieldset>
            <label htmlFor="email">Email</label>
            <InputGroup className="bg-azul-escuro2 border-cor-borda">
               <InputGroupInput required type="email" name="email" placeholder="Digite seu email" />
               <InputGroupAddon>
                  <Mail />
               </InputGroupAddon>
            </InputGroup>
         </fieldset>
         {/* Telefone */}
         <fieldset>
            <label htmlFor="telefone">Telefone</label>
            <InputGroup className="bg-azul-escuro2 border-cor-borda">
               <InputGroupInput required type="tel" name="telefone" placeholder="Digite seu telefone" />
               <InputGroupAddon>+258</InputGroupAddon>
            </InputGroup>
         </fieldset>
         {/* Senha */}
         <fieldset>
            <label htmlFor="senha">Senha</label>
            <InputGroup className="bg-azul-escuro2 border-cor-borda relative">
               <InputGroupInput
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  required
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
               />
               <InputGroupAddon>
                  <Lock />
               </InputGroupAddon>
               <button
                  type="button"
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent cursor-pointer"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
               >
                  {mostrarSenha ? <EyeOff className="size-4 text-muted-foreground" /> : <Eye className="size-4 text-muted-foreground" />}
               </button>
            </InputGroup>
            {/* Indicador de segurança */}
            {senha.length > 0 && (
               <div className="space-y-2 mt-1">
                  {/* Barra */}
                  <div className="flex gap-1">
                     {[0, 1, 2, 3, 4].map((nivel) => (
                        <div
                           key={nivel}
                           className={`h-1.5 flex-1 rounded-full transition-colors ${
                              nivel <= nivelSegurancaDaSenha.score ? analisarCorNivel(nivelSegurancaDaSenha.score) : "bg-cor-borda"
                           }`}
                        />
                     ))}
                  </div>

                  {/* Texto */}
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-gray-400">Segurança da senha</span>

                     <span className="text-xs font-semibold">{nivelSegurancaDaSenha.label}</span>
                  </div>
               </div>
            )}
         </fieldset>
         {/* Confirmar senha */}
         <fieldset>
            <label htmlFor="confirmacao_senha">Confirmar senha</label>
            <InputGroup className="bg-azul-escuro2 border-cor-borda">
               <InputGroupInput required type="password" name="confirmacao_senha" placeholder="Digite a senha novamente" />
               <InputGroupAddon>
                  <Lock />
               </InputGroupAddon>
            </InputGroup>
         </fieldset>
         {/* Termos e condições */}
         <fieldset className="my-6">
            <div className="flex gap-2">
               <Checkbox required id="termos_condicoes" className="size-4.5 mt-0.5" />
               <label htmlFor="termos_condicoes" className="[&_a]:text-tema text-sm! cursor-pointer">
                  Li e concordo com os <Link href="/termos_e_condicoes">Termos e Condições</Link> e a{" "}
                  <Link href="/politica_de_privacidade">Política de Privacidade</Link>.
               </label>
            </div>
         </fieldset>
         {/* Botão de submit */}
         <Button type="submit" className="w-full py-4">
            CRIAR CONTA <ArrowRight className="stroke-3" />
         </Button>
      </form>
   );
};
export default SignUpForm;
