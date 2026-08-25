import { ReactNode } from "react";

type Props = { children: ReactNode; type?: "submit" | "button" | "reset"; className?: string };
const Button = ({ children, type = "button", className }: Props) => {
   return (
      <button
         type={type}
         className={`cursor-pointer flex items-center gap-2.5 bg-tema text-black rounded-2xl px-3.5 py-1.5 text-lg font-bold font-sora ${className} `}
      >
         {children}
      </button>
   );
};
export default Button;
