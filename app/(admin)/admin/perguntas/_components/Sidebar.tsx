import { CircleQuestionMark, Gamepad, Layers, LayoutGrid, Lock, Settings, Users } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const Sidebar = async () => {
   const headersList = await headers();
   const pathname = headersList.get("x-pathname") || "";
   const links = [
      { titulo: "Visão geral", path: "/admin/visao-geral", Icone: LayoutGrid },
      { titulo: "Perguntas", path: "/admin/perguntas", Icone: CircleQuestionMark },
      { titulo: "Categorias", path: "/admin/categorias", Icone: Layers },
      { titulo: "Jogadores", path: "/admin/jogadores", Icone: Users },
      { titulo: "Partidas", path: "/admin/partidas", Icone: Gamepad },
      { titulo: "Configurações", path: "/admin/configuracoes", Icone: Settings },
   ];

   console.log("pathname,", pathname);

   return (
      <div className="py-8 px-6 bg-azul-escuro h-full min-h-screen">
         {/* Logo */}
         <Image width={214} height={38} src="/logo.png" alt="Logo do website" />

         <p className="flex items-center justify-center gap-2.5 mt-5.5 text-[11px] bg-azul-leve px-3 py-2 rounded-[6px] font-semibold">
            <Lock className="size-3.5 stroke-3" /> PAINEL ADMINISTRATIVO
         </p>

         {/* Navegação */}
         <div className="mt-9.5">
            <h6 className="text-[11px] font-medium mb-5">GESTÃO DA PLATAFORMA</h6>
            <nav className="space-y-2">
               {links.map((link, k) => (
                  <Link
                     className={`px-4 py-3.5 flex items-center rounded-[8px] gap-3 ${pathname === link.path ? "bg-tema/13 text-tema font-semibold" : ""}`}
                     href={link.path}
                     key={k}
                  >
                     <link.Icone /> {link.titulo}{" "}
                  </Link>
               ))}
            </nav>
         </div>
      </div>
   );
};
export default Sidebar;
