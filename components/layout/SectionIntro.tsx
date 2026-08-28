type Props = {
   titulo: string;
   descricao: string;
   subtitulo: string;
   className?: string;
};
const SectionIntro = ({ titulo, descricao, subtitulo, className }: Props) => {
   return (
      <div className={`max-w-170 mx-auto text-center flex flex-col items-center gap-3 pt-25 pb-16 ${className}`}>
         <span className="uppercase font-sora bg-tema/13 text-tema text-[12px] font-bold w-fit px-3 py-1 border border-tema rounded-full">{subtitulo}</span>
         <h2 className="text-[40px] font-black text-white">{titulo}</h2>
         <p className="font-sora">{descricao}</p>
      </div>
   );
};
export default SectionIntro;
