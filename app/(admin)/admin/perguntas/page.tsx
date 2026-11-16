import Button from "@/components/shared/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Lock, Plus } from "lucide-react";
import { obterPerguntas } from "./_lib/obterPerguntas";
import Image from "next/image";
import { DificuldadePergunta } from "@/models/Pergunta";

export default async function PerguntasPage() {
   const perguntas = await obterPerguntas();

   function analisarFundoDificuldade(dificuldade: DificuldadePergunta) {
      switch (dificuldade) {
         case "fácil":
            return "bg-sky-400/13 text-sky-400!";
         case "média":
            return "bg-yellow-400/13 text-yellow-400!";
         case "difícil":
            return "bg-violet-400/13 text-violet-400!";
      }
   }

   function analisarFundoEstado(estado: boolean) {
      switch (estado) {
         case true:
            return "bg-green-400/13 *:text-green-400!";
         case false:
            return "bg-red-400/13 *:text-red-400!";
      }
   }

   return (
      <div>
         {/* Breadcrumb */}
         <div className="flex items-center justify-between mb-6">
            <p className="flex items-center gap-4 text-sm">
               <span>Painel administrativo</span> / <span className="text-white">Perguntas</span>
            </p>
            <div className="flex items-center text-xs gap-2">
               <Lock className="stroke-green-500 size-3.5 stroke-3" /> Área privada
            </div>
         </div>
         {/* Heading */}
         <div className="flex justify-between items-center">
            <div>
               <h1 className="mb-2 font-sora font-semibold text-[30px] text-white">Gestão de perguntas</h1>
               <p className="mb-10">Crie, organize e controle as perguntas utilizadas nas partidas do quiz.</p>
            </div>
            <Button className="rounded-[8px] py-2.5">
               <Plus /> Nova pergunta
            </Button>
         </div>
         {/* Listagem */}
         <div className="bg-azul-escuro rounded-[14px] overflow-hidden">
            <div>
               <div className="py-5 px-6 flex items-center">
                  <span className="font-sora text-lg font-semibold me-6 text-white">Banco de perguntas</span>{" "}
                  <span className="px-3 py-1 text-xs bg-azul-leve rounded-[5px] font-medium">1.248</span>
               </div>
               <hr className="border-cor-borda" />
               {/* Filtragem */}
               {/* Listagem */}
               <Table className="**:text-texto-1 **:border-cor-borda">
                  <TableHeader className="**:border-none bg-azul-escuro2">
                     <TableRow className="*:px-6 *:text-xs">
                        <TableHead>Pergunta</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Dificuldade</TableHead>
                        <TableHead>Resposta correta</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Criada em</TableHead>
                        <TableHead>Ações</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {perguntas.map((pergunta, k) => (
                        <TableRow key={k} className="hover:bg-azul-leve *:px-6">
                           <TableCell>
                              <div className="flex items-center gap-3.5">
                                 <Image
                                    className="object-cover w-12 h-8 rounded-[5px]"
                                    width={48}
                                    height={32}
                                    src={pergunta.imagem}
                                    alt="Foto da pergunta"
                                 />
                                 <p className="font-medium text-[13px] text-white! line-clamp-1">{pergunta.enunciado}</p>
                              </div>
                           </TableCell>
                           {/* FIXME: Resolver o problema de tipagem */}
                           <TableCell className="text-xs">{pergunta.categoria.nome}</TableCell>
                           <TableCell>
                              <div
                                 className={`capitalize w-18 px-3 py-2 text-green-400! bg-green-400/10 rounded-[5px] text-[11px] font-medium ${analisarFundoDificuldade(pergunta.dificuldade)}`}
                              >
                                 {pergunta.dificuldade}
                              </div>
                           </TableCell>
                           <TableCell>
                              <span className="uppercase font-semibold text-[13px] px-3 py-2 rounded-[6px] bg-azul-leve w-fit text-white!">
                                 {pergunta.respostaCorreta}
                              </span>
                           </TableCell>
                           <TableCell>
                              <div
                                 className={`flex items-center gap-2 px-2.5 py-2 font-medium rounded-[12px] text-[11px] ${analisarFundoEstado(pergunta.ativa)}`}
                              >
                                 <span>●</span> <span>{pergunta.ativa ? "Ativa" : "Inativa"}</span>
                              </div>
                           </TableCell>
                           <TableCell className="text-xs">{new Date(pergunta.createdAt).toLocaleDateString()}</TableCell>
                           <TableCell>
                              <Ellipsis />{" "}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         </div>
      </div>
   );
}
