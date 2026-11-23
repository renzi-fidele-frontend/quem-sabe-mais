import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { DificuldadePergunta } from "@/models/Pergunta";
import { Ellipsis, Eye, Pause, Pencil, Play, Trash } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IPerguntaComCategoria } from "../_lib/obterPerguntas";
import { alternarEstadoPergunta, removerPergunta } from "../_lib/gerenciarPerguntas";

const LinhaPergunta = ({ pergunta }: { pergunta: IPerguntaComCategoria }) => {
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

   const acoes = [
      {
         nome: "Visualizar pergunta",
         Icone: Eye,
         acao: async () => {
            "use server";
         },
         danger: false,
      },
      {
         nome: "Editar pergunta",
         Icone: Pencil,
         acao: async () => {
            "use server";
            redirect(`/admin/perguntas/${pergunta._id.toString()}/editar`);
         },
         danger: false,
      },
      {
         nome: pergunta.ativa ? "Desativar pergunta" : "Ativar pergunta",
         Icone: pergunta.ativa ? Pause : Play,
         acao: async () => {
            "use server";
            await alternarEstadoPergunta(pergunta._id.toString());
         },
         danger: false,
      },
      {
         nome: "Eliminar pergunta",
         Icone: Trash,
         acao: async () => {
            "use server";
            await removerPergunta(pergunta._id.toString());
         },
         danger: true,
      },
   ];

   return (
      <TableRow className="hover:bg-azul-leve *:px-6">
         {/* Enunciado e imagem */}
         <TableCell>
            <div className="flex items-center gap-3.5">
               <Image className="object-cover w-12 h-8 rounded-[5px]" width={48} height={32} src={pergunta.imagem} alt="Foto da pergunta" />
               <p className="font-medium text-[13px] text-white! truncate line-clamp-1 max-w-135">{pergunta.enunciado}</p>
            </div>
         </TableCell>
         {/* Categoria */}
         <TableCell className="text-xs">{pergunta.categoria.nome}</TableCell>
         {/* Dificuldade */}
         <TableCell>
            <div
               className={`capitalize w-18 px-3 py-2 text-green-400! bg-green-400/10 rounded-[5px] text-[11px] font-medium ${analisarFundoDificuldade(pergunta.dificuldade)}`}
            >
               {pergunta.dificuldade}
            </div>
         </TableCell>
         {/* Resposta correta */}
         <TableCell>
            <span className="uppercase font-semibold text-[13px] px-3 py-2 rounded-[6px] bg-azul-leve w-fit text-white!">
               {pergunta.respostaCorreta}
            </span>
         </TableCell>
         {/* Estado */}
         <TableCell>
            <div className={`flex items-center gap-2 px-2.5 py-2 font-medium rounded-[12px] text-[11px] ${analisarFundoEstado(pergunta.ativa)}`}>
               <span>●</span> <span>{pergunta.ativa ? "Ativa" : "Inativa"}</span>
            </div>
         </TableCell>
         {/* Criado em */}
         <TableCell className="text-xs">{new Date(pergunta.createdAt).toLocaleDateString()}</TableCell>
         {/* Ações */}
         <TableCell>
            <Popover>
               <PopoverTrigger className="cursor-pointer">
                  <Ellipsis />
               </PopoverTrigger>
               <PopoverContent className="max-w-54 me-10 bg-azul-escuro2 border-2 border-cor-borda">
                  <div className="flex flex-col">
                     {acoes.map((item, key) => (
                        <form action={item.acao} key={key}>
                           <button
                              className={`w-full flex items-center gap-3 p-3 text-sm text-white cursor-pointer transition hover:bg-cor-borda ${item.danger ? "text-red-400! border-t border-cor-borda" : ""}`}
                              key={key}
                           >
                              <item.Icone className={`size-4.5 ${item.danger ? "stroke-red-400!" : "stroke-texto-1"}`} /> {item.nome}
                           </button>
                        </form>
                     ))}
                  </div>
               </PopoverContent>
            </Popover>
         </TableCell>
      </TableRow>
   );
};
export default LinhaPergunta;
