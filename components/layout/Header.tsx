import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { headers } from "next/headers";
import { LogIn } from "lucide-react";

const Header = async () => {
   const headersList = await headers();
   const pathname = headersList.get("x-pathname") || "";

   const links = [
      {
         nome: "Início",
         path: "/",
      },
      {
         nome: "Meu progresso",
         path: "/meu-progresso",
      },
      {
         nome: "Liderança",
         path: "/lideranca",
      },
      {
         nome: "Central de ajuda",
         path: "/central-de-ajuda",
      },
   ];

   return (
      <header className="bg-azul-escuro py-4.5">
         <Container className="flex items-center justify-between">
            {/* Logotipo */}
            <Image src="/logo.png" alt="Logo" width={214} height={38} />

            {/* Menu */}
            <nav className="*:font-semibold flex gap-9">
               {links.map((link, k) => (
                  <Link className={`text-lg ${pathname === link.path && "text-tema"}`} href={link.path} key={k}>
                     {link.nome}
                  </Link>
               ))}
            </nav>

            {/* Botão de login */}
            <Link href="/login" className="flex items-center gap-2.5 bg-tema text-black rounded-xl px-3.5 py-1.5 text-lg font-bold">
               <LogIn className="size-5" /> Entrar
            </Link>
         </Container>
      </header>
   );
};
export default Header;
