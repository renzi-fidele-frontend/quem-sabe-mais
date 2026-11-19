"use client";

import { useRouter } from "next/navigation";

const CancelarModal = () => {
   const router = useRouter();

   return (
      <button onClick={() => router.back()} className="border border-cor-borda bg-azul-escuro2">
         Cancelar
      </button>
   );
};
export default CancelarModal;
