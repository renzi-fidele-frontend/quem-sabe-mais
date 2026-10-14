import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusPartida } from "@/models/Partida";
import LinhaPartida from "./LinhaPartida";
import Paginacao from "@/components/shared/Paginacao";

type Props = {
   partidas: {
      id: string;
      data: Date;
      status: StatusPartida;
      acertos: number;
      totalRespondidas: number;
      valorAtual: number;
      numero: number;
   }[];
   total: number;
   paginaAtual: number;
   totalPaginas: number;
};

const ListagemDasPartidas = ({ partidas, total, paginaAtual, totalPaginas }: Props) => {
   return (
      <div className="p-8 bg-azul-escuro2/90 rounded-[24px] border border-cor-borda">
         {/* Heading */}
         <div className="flex items-center justify-between mb-6">
            <h4 className="text-white text-[22px] font-black">Todas as partidas</h4>
            <span className="text-tema px-2.5 py-1 rounded-[20px] bg-cor-borda font-sora text-sm font-bold">
               {total} {total === 1 ? "partida" : "partidas"}
            </span>
         </div>
         {/* Listagem */}
         <Table className="**:font-sora mb-3 **:border-cor-borda">
            <TableHeader className="**:text-texto-1 **:text-[11px] **:font-bold uppercase">
               <TableRow className="hover:bg-cor-borda border-cor-borda">
                  <TableHead>Data</TableHead>
                  <TableHead>Partida</TableHead>
                  <TableHead>Acertos</TableHead>
                  <TableHead>Prémio</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {partidas.length > 0 ? (
                  partidas.map((partida) => <LinhaPartida partida={partida} key={partida.id} />)
               ) : (
                  <>Ainda não existem partidas</>
               )}
            </TableBody>
         </Table>
         <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} />
      </div>
   );
};

export default ListagemDasPartidas;
