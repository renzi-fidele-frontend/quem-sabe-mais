"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

const InputUploadImagem = () => {
   const [previa, setPrevia] = useState<string | ArrayBuffer | null>(null);
   // imagemRef.current.files[0]
   const imagemRef = useRef<HTMLInputElement | null>(null);

   function renderizarPrevia(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) return;
      const reader = new FileReader();
      reader.onload = () => {
         setPrevia(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
   }

   return (
      <label htmlFor="imagem">
         <input onChange={renderizarPrevia}  type="file" id="imagem" name="imagem" ref={imagemRef} className="hidden" />
         <div className="flex items-center gap-4.5 rounded-[8px] bg-azul-escuro2 px-7 py-8 border border-dashed border-cor-borda mt-2.5 cursor-pointer">
            <Upload className="stroke-tema size-7" />
            <div className="space-y-1.75">
               <p className="text-white font-medium text-sm">Clique para adicionar uma imagem</p>
               <p className="text-xs">JPG, PNG ou WebP · proporção recomendada 16:9</p>
               <p className="text-[11px]">A imagem é opcional.</p>
            </div>
         </div>
      </label>
   );
};
export default InputUploadImagem;
