import Image from "next/image";
import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import { Lock } from "lucide-react";

const page = () => {
   return (
      <>
         <h6 className="text-3xl font-black text-white">Comece sua jornada!</h6>
         <p className="text-sm mb-6">Crie sua conta e entre na competição.</p>
         <LoginForm />
         <p className="mt-4 text-sm mb-6 text-center">
            Já possui uma conta?{" "}
            <Link className="ms-1 text-tema font-bold" href="/login">
               Entrar
            </Link>
         </p>
         <div className="flex items-center gap-2 flex-nowrap mb-4">
            <hr className="flex grow" />
            <p className="text-[11px]">ou cadastre-se com</p>
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
         <p className="flex gap-1.5 mt-6 text-[11px] items-center justify-center">
            <Lock className="size-3.5" /> Seus dados estão protegidos.
         </p>
      </>
   );
};
export default page;
