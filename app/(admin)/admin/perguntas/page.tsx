import Button from "@/components/shared/Button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Plus } from "lucide-react";

export default function PerguntasPage() {
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
         <div>
            <div>
               <div className="py-5 px-6 flex items-center">
                  <span className="font-sora text-lg font-semibold me-6 text-white">Banco de perguntas</span>{" "}
                  <span className="px-3 py-1 text-xs bg-azul-leve rounded-[5px] font-medium">1.248</span>
               </div>
               <hr />
               {/* Filtragem */}
               {/* Listagem */}
               <Table className="**:text-texto-1">
                  <TableHeader>
                     <TableRow className="*:px-6">
                        <TableHead>Pergunta</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Dificuldade</TableHead>
                        <TableHead>Resposta correta</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Criada em</TableHead>
                        <TableHead>Ações</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody></TableBody>
               </Table>
            </div>
         </div>
      </div>
   );
}
