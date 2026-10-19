import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
   titulo: string;
   valor: string;
   Icone: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
   diferenca: number;
   textoDiferenca: string;
   tipoPercentual?: boolean;
   destacar?: boolean;
};
const CardEstatistica = ({ Icone, diferenca, titulo, valor, destacar, tipoPercentual, textoDiferenca }: Props) => {
   return (
      <div className="border border-cor-borda rounded-[16px] p-6 bg-azul-escuro2/90">
         {/* Heading */}
         <div className="flex justify-between">
            <h6 className="font-sora text-xs font-semibold uppercase">{titulo}</h6>
            <Icone className="size-9 stroke-tema stroke-2" />
         </div>
         {/* Valor */}
         <p className={`text-[32px] font-black mb-2.5 ${destacar ? "text-tema" : "text-white"}`}>{valor}</p>
         {/* Diferencial */}
         <p className="font-sora text-[11px] flex items-center gap-1.5 font-semibold">
            <span
               className={`px-2 py-0.5 rounded-[10px] font-bold ${diferenca >= 0 ? "text-green-400 bg-green-400/13 " : "text-red-400 bg-red-400/13"} `}
            >
               {diferenca >= 0 ? "+" : "-"} {textoDiferenca}
               {tipoPercentual ? "%" : ""}
            </span>
            este mês
         </p>
      </div>
   );
};
export default CardEstatistica;
