"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

export type ResumoDesempenhoProps = {
   totalVitorias: number;
   totalEliminado: number;
   totalAbandonado: number;
};

const ChartResumoHistorico = ({ totalVitorias, totalEliminado, totalAbandonado }: ResumoDesempenhoProps) => {
   const chartData = [
      { tipo: "Vitórias", quantidade: totalVitorias, fill: "var(--color-green-500)" },
      { tipo: "Eliminado", quantidade: totalEliminado, fill: "var(--destructive)" },
      { tipo: "Abandonado", quantidade: totalAbandonado, fill: "var(--cor-borda)" },
   ];

   const chartConfig = {
      partida: {
         label: "Partidas",
      },
      vitorias: {
         label: "Vitórias",
         color: "var(--green-500)",
      },
      eliminado: {
         label: "Eliminado",
         color: "var(--destructive)",
      },
      abandonado: {
         label: "Abandonado",
         color: "var(--cor-borda)",
      },
   } satisfies ChartConfig;

   return (
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-30 -ms-3">
         <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantidade" nameKey="tipo" innerRadius={30} />
         </PieChart>
      </ChartContainer>
   );
};
export default ChartResumoHistorico;
