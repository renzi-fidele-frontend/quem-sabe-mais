import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { headers } from "next/headers";
import { LogIn } from "lucide-react";
import { obterSessaoComUsuario } from "@/lib/auth/session";

const Header = async () => {
   const headersList = await headers();
   const pathname = headersList.get("x-pathname") || "";

   const user = await obterSessaoComUsuario();

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

            <>
               {user ? (
                  <div className="flex items-center gap-3 text-end">
                     <div className="flex flex-col justify-center">
                        <p className="capitalize text-sm font-sora text-white font-semibold">{user.usuario.nickname}</p>
                        <span className="text-[11px] text-tema font-medium">{user.usuario.estatisticas.totalGanho} MT acumulados</span>
                     </div>
                     <Image
                        className="rounded-full border-tema border-2"
                        width={42}
                        height={42}
                        alt="Foto de perfil"
                        src={user.usuario.avatarUrl}
                     />
                  </div>
               ) : (
                  <Link href="/entrar" className="flex items-center gap-2.5 bg-tema text-black rounded-xl px-3.5 py-1.5 text-lg font-bold">
                     <LogIn className="size-5" /> Entrar
                  </Link>
               )}
            </>
         </Container>
      </header>
   );
};
export default Header;
