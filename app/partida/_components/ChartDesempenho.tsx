"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const ChartDesempenho = () => {
   const chartData = [
      { tipo: "correto", quantidade: 13, fill: "var(--tema)" },
      { tipo: "errado", quantidade: 1, fill: "var(--destructive)" },
      { tipo: "nao_respondida", quantidade: 1, fill: "var(--cor-borda)" },
   ];

   const chartConfig = {
      acerto: {
         label: "Acerto",
      },
      correto: {
         label: "Corretas",
         color: "var(--tema)",
      },
      errado: {
         label: "Erradas",
         color: "var(--destructive)",
      },
      nao_respondida: {
         label: "Em falta",
         color: "var(--cor-borda)",
      },
   } satisfies ChartConfig;

   return (
      <ChartContainer config={chartConfig} className="aspect-square max-h-62.5">
         <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantidade" nameKey="tipo" innerRadius={60} strokeWidth={5}>
               <Label
                  content={({ viewBox }) => {
                     if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                           <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-tema text-3xl font-bold">
                                 85%
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-texto-1">
                                 ACERTO
                              </tspan>
                           </text>
                        );
                     }
                  }}
               />
            </Pie>
         </PieChart>
      </ChartContainer>
   );
};
export default ChartDesempenho;
