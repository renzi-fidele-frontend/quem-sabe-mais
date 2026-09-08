import Image from "next/image";
import Link from "next/link";

const AuthCta = ({ modo }: { modo: "login" | "cadastro" }) => {
   return (
      <>
         <p className="mt-4 text-sm mb-6 text-center">
            {modo === "login" ? "Ainda não tem uma conta?" : "Já possui uma conta?"}{" "}
            {modo === "login" ? (
               <Link className="ms-1 text-tema font-bold" href="/cadastro">
                  Cadastre-se
               </Link>
            ) : (
               <Link className="ms-1 text-tema font-bold" href="/entrar">
                  Entrar
               </Link>
            )}
         </p>
         <div className="flex items-center gap-2 flex-nowrap mb-4">
            <hr className="flex grow" />
            <p className="text-[11px]">{modo === "login" ? "ou continue com" : "ou cadastre-se com"} </p>
            <hr className="flex grow" />
         </div>
         {/* Redes sociais */}
         <div className="flex gap-4 justify-center [&_button]:border-cor-borda [&_button]:px-4 [&_button]:py-3 [&_button]:border [&_button]:rounded-xl [&_button]:bg-azul-escuro2 *:flex *:grow *:justify-center *:gap-3.5 *:items-center text-white font-semibold text-sm">
            <button>
               <Image className="invert-100" src="/icons/google.svg" alt="Icone do google" width={16} height={16} />
               Google
            </button>
            <button>
               <Image className="invert-100" src="/icons/facebook.svg" alt="Icone do google" width={16} height={16} />
               Facebook
            </button>
         </div>
      </>
   );
};
export default AuthCta;
