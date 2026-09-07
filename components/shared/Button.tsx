import { ReactNode } from "react";

type Props = { children: ReactNode; type?: "submit" | "button" | "reset"; className?: string };
const Button = ({ children, type = "button", className }: Props) => {
   return (
      <button
         style={{ boxShadow: "0px 8px 24px 0 rgba(255,199,44,0.2)" }}
         type={type}
         className={`cursor-pointer flex items-center justify-center gap-2.5 bg-tema text-black rounded-2xl px-3.5 py-1.5 text-lg font-bold font-sora ${className} `}
      >
         {children}
      </button>
   );
};
export default Button;
