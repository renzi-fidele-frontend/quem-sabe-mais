"use client";
import Container from "@/components/layout/Container";
import Button from "@/components/shared/Button";
import { avatars } from "@/data/avatars";
import { guardarAvatar } from "@/lib/profile/guardarAvatar";
import { Loader, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AvatarPage() {
   const router = useRouter();
   const [avatarSelecionado, setAvatarSelecionado] = useState<{
      id: number;
      src: string;
   } | null>(null);
   const [loadingSave, setLoadingSave] = useState(false);

   async function handleSave() {
      setLoadingSave(true);
      if (avatarSelecionado) {
         await guardarAvatar(avatarSelecionado.src);
      }
      setLoadingSave(false);
      router.push("/");
   }

   return (
      <Container className="text-center py-5 relative">
         <h1 className="text-3xl font-bold mb-13 text-tema">Escolha um avatar para si:</h1>
         {/* Listagem de avatares */}
         <div className="flex flex-wrap justify-center gap-8">
            {avatars.map((avatar) => (
               <Image
                  className={`rounded-full transition-all hover:scale-110 cursor-pointer ${avatarSelecionado?.id === avatar.id ? "outline-tema outline-3 scale-110" : ""}`}
                  onClick={() => setAvatarSelecionado(avatar)}
                  key={avatar.id}
                  src={avatar.src}
                  alt="Avatar"
                  width={100}
                  height={100}
               />
            ))}
         </div>
         <Button onClick={handleSave} disabled={!avatarSelecionado} className="mx-auto mt-11 px-7 py-3">
            <Save />
            Selecionar avatar
         </Button>
         {/* Overlay */}
         {loadingSave && (
            <div className="absolute size-full inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 ">
               <Loader className="animate-spin size-9 stroke-3" />
               <p className="font-semibold text-lg">Salvando o avatar...</p>
            </div>
         )}
      </Container>
   );
}
