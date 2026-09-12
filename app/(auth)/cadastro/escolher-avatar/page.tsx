"use client";
import Container from "@/components/layout/Container";
import Button from "@/components/shared/Button";
import { avatars } from "@/data/avatars";
import { Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AvatarPage() {
   const [avatarSelecionado, setAvatarSelecionado] = useState<{
      id: number;
      src: string;
   } | null>(null);

   return (
      <Container className="text-center py-5">
         <h1 className="text-3xl font-bold mb-13 text-tema">Escolha um avatar para si:</h1>
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
         <Button disabled={!avatarSelecionado} className="mx-auto mt-11 px-7 py-3">
            <Save />
            Selecionar avatar
         </Button>
      </Container>
   );
}
