"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FundoAuth() {
   const pathname = usePathname();

   const fundo = pathname === "/entrar" ? "/img/fundo-palco-login.webp" : pathname === "/cadastro" ? "/img/fundo-palco-cadastro.webp" : "";

   if (!fundo) return null;

   return <Image className="absolute inset-0 object-cover -z-2" width={1920} height={1500} src={fundo} alt="Palco do Quem Sabe Mais" />;
}
