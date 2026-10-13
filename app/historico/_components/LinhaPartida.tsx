import { TableCell, TableRow } from "@/components/ui/table";
import { StatusPartida } from "@/models/Partida";
import { Eye } from "lucide-react";
import formatarData from "../_lib/formatarData";
import { TOTAL_PERGUNTAS } from "@/data/jogo";
import { formatarPremio } from "../_lib/formatarPremio";
import { estilosStatus } from "../_lib/estiiloStatus";
import Link from "next/link";

type Props = {
   partida: {
      id: string;
      data: Date;
      status: StatusPartida;
      acertos: number;
      totalRespondidas: number;
      valorAtual: number;
      numero: number;
   };
};

const LinhaPartida = ({ partida }: Props) => {
   const estilo = estilosStatus[partida.status];

   return (
      <TableRow className="text-[#D1D6E0] *:py-4.5 hover:bg-cor-borda">
         {/* Data */}
         <TableCell className="text-[13px]">{formatarData(partida.data)}</TableCell>
         {/* Partida */}
         <TableCell className="text-white text-sm font-semibold">Partida #{partida.numero}</TableCell>
         {/* Acertos */}
         <TableCell className="text-[13px]">
            {partida.acertos} / {TOTAL_PERGUNTAS}
         </TableCell>
         {/* Prémio */}
         <TableCell className="text-tema font-outfit font-extrabold text-xs">{formatarPremio(partida.valorAtual)}</TableCell>
         {/* Resultado */}
         <TableCell>
            <span className={`text-xs px-2.5 py-1 rounded-[20px] border w-fit font-semibold whitespace-nowrap ${estilo.classe}`}>
               ● <span className="ms-0.5">{estilo.label}</span>
            </span>
         </TableCell>
         {/* Ações */}
         <TableCell>
            <Link href={`/partida/${partida.id}/resultado`} className="flex items-center gap-1 text-tema text-xs font-semibold">
               <Eye className="size-4.5" /> Ver detalhes
            </Link>
         </TableCell>
      </TableRow>
   );
};
export default LinhaPartida;
