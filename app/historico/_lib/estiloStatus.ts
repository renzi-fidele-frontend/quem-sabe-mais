import { StatusPartida } from "@/models/Partida";

export const estilosStatus: Record<StatusPartida, { label: string; classe: string }> = {
   vitoria: {
      label: "Vitória",
      classe: "text-green-500 border-green-500! bg-green-600/10!",
   },
   eliminado: {
      label: "Eliminado",
      classe: "text-red-400 border-red-400! bg-red-500/10",
   },
   abandonada: {
      label: "Abandonado",
      classe: "text-orange-400 border-orange-400! bg-orange-500/10",
   },
   em_andamento: {
      label: "Em andamento",
      classe: "text-blue-400 border-blue-400! bg-blue-500/10",
   },
};
