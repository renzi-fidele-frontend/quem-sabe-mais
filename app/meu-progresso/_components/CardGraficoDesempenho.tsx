"use client";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
   valor: {
      label: "Ganho:",
      color: "var(--tema)",
   },
} satisfies ChartConfig;

type Props = {
   titulo: string;
   descricao: string;
   chartData: { data: string; valor: number }[];
   filterOptions: { label: string; value: number }[];
};

const CardGraficoDesempenho = ({ chartData, filterOptions, titulo, descricao }: Props) => {
   return (
      <div className="p-7 bg-azul-escuro2/90 border border-cor-borda rounded-[24px]">
         {/* Heading */}
         <div className="flex justify-between gap-6 ">
            <div>
               <h6 className="text-white text-lg font-bold mb-1">{titulo}</h6>
               <p className="text-xs mb-5">{descricao}</p>
            </div>
            {/* Opções */}
            {filterOptions && (
               <div>
                  <Select items={filterOptions} >
                     <SelectTrigger className="bg-azul-leve border-0 *:text-sm!">
                        <SelectValue placeholder={filterOptions[0].label} className="text-white" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {filterOptions.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                 {item.label}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>
            )}
         </div>
         <div>
            <ChartContainer className="w-full" config={chartConfig}>
               <AreaChart
                  responsive
                  accessibilityLayer
                  data={chartData}
                  margin={{
                     left: 12,
                     right: 12,
                  }}
               >
                  {/* Gradients */}
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--color-tema)" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="var(--color-tema)" stopOpacity={0.1} />
                  </linearGradient>

                  <CartesianGrid strokeDasharray="5" className="stroke-cor-borda! stroke-2" vertical={false} />
                  <XAxis
                     fontWeight={800}
                     fontStyle={"italic"}
                     dataKey="data"
                     tickLine={true}
                     axisLine={false}
                     tickMargin={8}
                     tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area
                     dataKey="valor"
                     type="linear"
                     stackId="a"
                     fill="url(#fillDesktop)"
                     fillOpacity={0.3}
                     stroke="var(--color-tema)"
                     strokeWidth={2}
                  />
               </AreaChart>
            </ChartContainer>
         </div>
      </div>
   );
};

export default CardGraficoDesempenho;
