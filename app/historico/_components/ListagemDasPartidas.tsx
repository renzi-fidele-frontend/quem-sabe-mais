import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IPartida } from "@/models/Partida";
import { Eye, Trophy } from "lucide-react";

type Props = {
   partidas: IPartida[];
};

const ListagemDasPartidas = ({ partidas }: Props) => {
   return (
      <div className="p-8 bg-azul-escuro2/90 rounded-[24px] border border-cor-borda">
         {/* Heading */}
         <div className="flex items-center justify-between mb-6">
            <h4 className="text-white text-[22px] font-black">Todas as partidas</h4>
            <span className="text-tema px-2.5 py-1 rounded-[20px] bg-cor-borda font-sora text-sm font-bold">128 partidas</span>
         </div>
         {/* Listagem */}
         <Table className="**:font-sora">
            <TableHeader className="**:text-texto-1 **:text-[11px] **:font-bold uppercase">
               <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Partida</TableHead>
                  <TableHead>Acertos</TableHead>
                  <TableHead>Prémio</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {Array.from({ length: 8 }).map((_, index) => (
                  <TableRow className="text-[#D1D6E0] *:py-4.5">
                     {/* Data */}
                     <TableCell className="text-[13px]">Hoje</TableCell>
                     {/* Partida */}
                     <TableCell className="text-white text-sm font-semibold">Partida #128</TableCell>
                     {/* Acertos */}
                     <TableCell className="text-[13px]">12 / 15</TableCell>
                     {/* Prémio */}
                     <TableCell className="text-tema font-outfit font-extrabold text-xs">+1.000 MT</TableCell>
                     {/* Resultado */}
                     <TableCell>
                        <span className="text-xs text-green-500 px-2.5 py-1 rounded-[20px] border border-green-500 bg-green-600/10 w-fit font-semibold">
                           ● <span className="ms-0.5">Vitória</span>
                        </span>
                     </TableCell>
                     {/* Ações */}
                     <TableCell>
                        <span className="flex items-center gap-1 text-tema text-xs font-semibold">
                           <Eye className="size-4.5" /> Ver detalhes
                        </span>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default ListagemDasPartidas;
