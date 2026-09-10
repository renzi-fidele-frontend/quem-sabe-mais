import AuthCta from "../_components/AuthCta";
import SignUpForm from "../_components/SignUpForm";
import { Lock } from "lucide-react";

const page = () => {
   return (
      <>
         <h6 className="text-3xl font-black text-white">Comece sua jornada!</h6>
         <p className="text-sm mb-6">Crie sua conta e entre na competição.</p>
         <SignUpForm />
         <AuthCta modo="cadastro" />
         <p className="flex gap-1.5 mt-6 text-[11px] items-center justify-center">
            <Lock className="size-3.5" /> Seus dados estão protegidos.
         </p>
      </>
   );
};
export default page;
