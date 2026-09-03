import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const Footer = () => {
   const nav = [
      { nome: "Início", path: "/" },
      { nome: "Meu progresso", path: "/meu-progresso" },
      { nome: "Liderança", path: "/lideranca" },
      { nome: "Central de ajuda", path: "/central-de-ajuda" },
      { nome: "Termos e condições", path: "/termos-e-condicoes" },
      { nome: "Política de privacidade", path: "/politica-de-privacidade" },
   ];

   return (
      <div className="bg-azul-escuro pt-16 pb-12 font-sora">
         <Container className="text-[12px]">
            {/* Cima */}
            <div className="flex items-center justify-between">
               {/* Esquerda */}
               <div className="basis-[28%] gap-3">
                  <Image className="mb-2.5" alt="Logo" width={214} height={38} src="/logo.png" />
                  <p className="">O Maior Quiz de Conhecimentos da cultura Moçambicana de todos os tempo</p>
               </div>
               {/* Direita */}
               <div className="text-end text-sm space-y-3">
                  <Link className="ms-auto flex gap-2.5 w-fit bg-cor-borda text-white rounded-xl px-5 py-2.75 font-semibold items-center" href="/">
                     <Image className="invert-100" src="/icons/facebook.svg" width={18} height={18} alt="Logo do facebook" /> Siga-nos no
                     Facebook
                  </Link>
                  <nav className="flex gap-6">
                     {nav.map(({ nome, path }, k) => (
                        <Link className="" key={k} href={path}>
                           {nome}
                        </Link>
                     ))}
                  </nav>
               </div>
            </div>
            <hr className="my-10" />
            {/* Baixo */}
            <div className="flex justify-between font-sora">
               <p>© 2026 Quem Sabe Mais? Todos os direitos reservados.</p>
               <p className="text-tema">Feito para os campeões da mente.</p>
            </div>
         </Container>
      </div>
   );
};
export default Footer;
