import Container from "@/components/layout/Container";
import Partida, { IPartida } from "@/models/Partida";
import { IPergunta, Pergunta } from "@/models/Pergunta";
import Image from "next/image";
import EscadaPremios from "../_components/EscadaDePremios";
import { abandonarPartida } from "../_actions";
import GameplayClient from "../_components/GameplayClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const partida = (await Partida.findOne({ _id: id })) as IPartida;
   const perguntaId = partida.perguntas[partida.perguntaAtual - 1];
   const pergunta = (await Pergunta.findById(perguntaId)) as IPergunta;

   return (
      <div className="relative">
         {/* Fundo com overlay */}
         <Image
            width={1920}
            height={1087}
            src="/img/fundo-palco-gameplay.webp"
            className="inset-0 size-full object-cover -z-2 absolute"
            alt=""
         />
         <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-70"></div>
         {/* Conteúdo principal */}
         <Container className="flex pt-10 pb-20 gap-8 items-start relative flex-nowrap">
            {/* Esquerda */}
            <div className="p-10.5 bg-azul-escuro2/90 border border-cor-borda rounded-[24px] basis-[68%] text-white">
               {/* Imagem e temporizador */}
               <div className="relative">
                  <Image className="rounded-[6px]" width={812} height={434} src="/img/foto_pergunta.webp" alt="Foto da pergunta" />
                  <span className="px-1.75 absolute top-1.5 left-1.75 font-bold text-lg bg-[#177D2D]/80 border border-black rounded-[9px]">
                     00:15
                  </span>
               </div>
               {/* Pergunta */}
               <h6 className="text-center text-2xl font-bold mb-7 mt-5">{pergunta.enunciado}</h6>
               <GameplayClient
                  ajudaPularPerguntaUtilizado={partida.pularPerguntaUsado}
                  ajuda50Usada={partida.ajuda50Usada}
                  alternativas={pergunta.alternativas.map((item, k) => ({ id: item.id, texto: item.texto }))}
                  partidaId={id}
                  perguntaId={pergunta._id.toString()}
               />
            </div>
            {/* Direita */}
            <div className="flex flex-col grow gap-6 basis-[32%]">
               <EscadaPremios perguntaAtual={partida.perguntaAtual} valorGarantido={partida.valorGarantido} valorAtual={partida.valorAtual} />
               <form
                  action={async () => {
                     "use server";
                     await abandonarPartida(id);
                  }}
               >
                  <button className="px-2.5 py-3.75 text-white bg-[#D32F2F] text-2xl font-semibold rounded-[12px] cursor-pointer w-full">
                     Abandonar partida
                  </button>
               </form>
            </div>
         </Container>
      </div>
   );
}
