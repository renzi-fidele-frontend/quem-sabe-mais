"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function FecharModalBtn() {
   const router = useRouter();

   return (
      <button
         type="button"
         onClick={() => router.back()}
         aria-label="Fechar modal"
         className="p-3 h-fit border border-cor-borda rounded-[8px] bg-azul-escuro2 cursor-pointer"
      >
         <X />
      </button>
   );
}
