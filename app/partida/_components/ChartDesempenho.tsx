"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

type Props = {
   respostasCorretas: number;
   respostasErradas: number;
   respostasNaoRespondidas: number;
   porcentagemAcertos: number;
};

const ChartDesempenho = ({ respostasCorretas, respostasErradas, respostasNaoRespondidas, porcentagemAcertos }: Props) => {
   const chartData = [
      { tipo: "correto", quantidade: respostasCorretas, fill: "var(--tema)" },
      { tipo: "errado", quantidade: respostasErradas, fill: "var(--destructive)" },
      { tipo: "nao_respondida", quantidade: respostasNaoRespondidas, fill: "var(--cor-borda)" },
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
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-58 -ms-6">
         <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantidade" nameKey="tipo" innerRadius={60} strokeWidth={5}>
               <Label
                  content={({ viewBox }) => {
                     if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                           <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-tema text-3xl font-bold">
                                 {porcentagemAcertos}%
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
