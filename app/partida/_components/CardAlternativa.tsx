import { IAlternativa } from "@/models/Pergunta";

const CardAlternativa = ({ alternativa, partidaId }: { alternativa: IAlternativa; partidaId: string }) => {
   return (
      <button className="border border-cor-borda bg-azul-leve px-6 py-5.5 rounded-[12px] font-sora cursor-pointer transition hover:bg-tema/7 hover:border-tema group">
         <span className="uppercase font-outfit font-black px-3 py-1.5 rounded-[6px] bg-tema/13 me-4 text-tema group-hover:text-black group-hover:bg-tema transition">
            {alternativa.id}
         </span>{" "}
         {alternativa.texto}
      </button>
   );
};
export default CardAlternativa;
