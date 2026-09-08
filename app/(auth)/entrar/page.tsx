"use client";
import Button from "@/components/shared/Button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthCta from "../_components/AuthCta";

export default function Page() {
   const [mostrarSenha, setMostrarSenha] = useState(false);
   const [senha, setSenha] = useState("");

   return (
      <>
         <h6 className="text-3xl font-black text-white font-outfit">Bem-vindo de volta!</h6>
         <p className="text-sm mb-6">Entre na sua conta e continue sua jornada.</p>
         <form className="space-y-3.5 [&_fieldset]:flex [&_fieldset]:flex-col [&_fieldset]:gap-1.5 [&_label]:text-[13px] [&_label]:font-semibold">
            {/* E-mail */}
            <fieldset>
               <label htmlFor="email">Email</label>
               <InputGroup className="bg-azul-escuro2 border-cor-borda">
                  <InputGroupInput name="email" placeholder="Digite seu email" />
                  <InputGroupAddon>
                     <Mail />
                  </InputGroupAddon>
               </InputGroup>
            </fieldset>
            {/* Senha */}
            <fieldset>
               <label htmlFor="senha">Senha</label>
               <InputGroup className="bg-azul-escuro2 border-cor-borda relative">
                  <InputGroupInput
                     type={mostrarSenha ? "text" : "password"}
                     name="senha"
                     placeholder="Digite sua senha"
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
            </fieldset>
         </form>
         <Link href="" className="text-end text-tema font-semibold mt-3 mb-8">
            Esqueceu sua senha?
         </Link>
         <Button className="py-4">
            Entrar <ArrowRight />
         </Button>

         <AuthCta modo="login" />
         {/* TODO: Amanhã cedo finalizar esta seção */}
      </>
   );
}
