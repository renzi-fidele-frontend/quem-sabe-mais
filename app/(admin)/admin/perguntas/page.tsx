import Button from "@/components/shared/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ellipsis, Lock, Plus } from "lucide-react";
import { obterPerguntas } from "./_lib/obterPerguntas";
import Image from "next/image";

export default async function PerguntasPage() {
   const perguntas = await obterPerguntas();

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
            <Button className="rounded-[8px] py-3">
               <Plus /> Nova pergunta
            </Button>
         </div>
         {/* Listagem */}
         <div className="bg-azul-escuro rounded-[14px] overflow-hidden">
            <div className="">
               <div className="py-5 px-6 flex items-center">
                  <span className="font-sora text-lg font-semibold me-6 text-white">Banco de perguntas</span>{" "}
                  <span className="px-3 py-1 text-xs bg-azul-leve rounded-[5px] font-medium">1.248</span>
               </div>
               <hr className="border-cor-borda" />
               {/* Filtragem */}
               {/* Listagem */}
               <Table className="**:text-texto-1">
                  <TableHeader>
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
                  {/* TODO: Renderizar a lista de perguntas */}
                  <TableBody>
                     {perguntas.map((pergunta, k) => (
                        <TableRow key={k} className="hover:bg-azul-leve *:px-6">
                           <TableCell>
                              <div className="flex items-center gap-2">
                                 <Image width={48} height={32} src={pergunta.imagem} alt="Foto da pergunta" />
                                 <p>{pergunta.enunciado}</p>
                              </div>
                           </TableCell>
                           <TableCell>{pergunta.categoria.nome}</TableCell>
                           <TableCell>
                              <span>{pergunta.dificuldade}</span>
                           </TableCell>
                           <TableCell>{pergunta.respostaCorreta}</TableCell>
                           <TableCell>{pergunta.ativa ? "Ativa" : "Inativa"}</TableCell>
                           <TableCell>{new Date(pergunta.createdAt).toLocaleDateString()}</TableCell>
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
