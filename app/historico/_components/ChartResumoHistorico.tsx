"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

export type ResumoDesempenhoProps = {
   resumo: {
      totalVitorias: number;
      totalEliminado: number;
      totalAbandonado: number;
   };
};

const ChartResumoHistorico = ({ resumo }: ResumoDesempenhoProps) => {
   const chartData = [
      { tipo: "Vitórias", quantidade: 2, fill: "var(--color-green-500)" },
      { tipo: "Eliminado", quantidade: 6, fill: "var(--destructive)" },
      { tipo: "Abandonado", quantidade: 3, fill: "var(--cor-borda)" },
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
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-50 -ms-6">
         <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantidade" nameKey="tipo" innerRadius={60}  />
         </PieChart>
      </ChartContainer>
   );
};
export default ChartResumoHistorico;
