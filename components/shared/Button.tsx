import { ReactNode } from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
   children: ReactNode;
   className?: string;
}
const Button = ({ children, type = "button", className, ...props }: Props) => {
   return (
      <button
         style={{ boxShadow: "0px 8px 24px 0 rgba(255,199,44,0.2)" }}
         type={type}
         className={`cursor-pointer flex items-center justify-center gap-2.5 bg-tema text-black rounded-2xl px-3.5 py-1.5 text-lg font-bold font-sora disabled:opacity-65 disabled:cursor-not-allowed ${className}`}
         {...props}
      >
         {children}
      </button>
   );
};
export default Button;
