"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const InputUploadImagem = () => {
   const [previa, setPrevia] = useState<string | ArrayBuffer | null>(null);
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
         <input onChange={renderizarPrevia} type="file" id="imagem" name="imagem" ref={imagemRef} className="hidden" />
         <div className="flex items-center gap-4.5 rounded-[8px] bg-azul-escuro2 px-7 py-8 border border-dashed border-cor-borda mt-2.5 cursor-pointer">
            {!previa && <Upload className="stroke-tema size-7" />}
            {previa && <Image className="object-cover" src={previa.toString()} width={164} height={92} alt="Foto de pré-visualização" />}

            <div className="space-y-1.75">
               <p className="text-white font-medium text-sm">Clique para adicionar uma imagem</p>
               <p className="text-xs">JPG, PNG ou WebP · proporção recomendada 16:9</p>
               <p className="text-[11px]">A resolução deve ser (812x434)</p>
            </div>
         </div>
      </label>
   );
};
export default InputUploadImagem;
