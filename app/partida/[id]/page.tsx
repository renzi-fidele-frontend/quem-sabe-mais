import Container from "@/components/layout/Container";
import Partida, { IPartida } from "@/models/Partida";
import { IPergunta, Pergunta } from "@/models/Pergunta";
import { ArrowRight, Percent, Users } from "lucide-react";
import Image from "next/image";
import EscadaPremios from "../_components/EscadaDePremios";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;

   const partida = (await Partida.findOne({ _id: id })) as IPartida;

   const perguntaId = partida.perguntas[partida.perguntaAtual - 1];

   const pergunta = (await Pergunta.findById(perguntaId)) as IPergunta;

   console.log(pergunta);

   return (
      <Container className="flex pt-10 pb-20 gap-8">
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
            <h6 className="text-center text-2xl font-bold my-8">{pergunta.enunciado}</h6>
            {/* Alternativas */}
            <div className="grid grid-cols-2 gap-5 *:text-start text-lg">
               {pergunta.alternativas.map((alternativa) => (
                  <button
                     className="border border-cor-borda bg-azul-leve px-6 py-5.5 rounded-[12px] font-sora cursor-pointer transition hover:text-black hover:bg-tema group"
                     key={alternativa.id}
                  >
                     <span className="uppercase font-outfit font-black px-3 py-1.5 rounded-[6px] bg-tema/13 me-4 text-tema group-hover:text-white group-hover:bg-black transition">
                        {alternativa.id}
                     </span>{" "}
                     {alternativa.texto}
                  </button>
               ))}
            </div>
            {/* Separador */}
            <hr className="border-cor-borda my-9" />
            {/* Linhas de Apoio */}
            <div className="flex justify-between items-center text-sm font-sora">
               <p className="uppercase text-[12px] text-texto-1 font-semibold">* Linhas de Apoio Disponíveis:</p>
               <div className="flex gap-3.5 [&_button]:flex [&_button]:gap-2 [&_button]:items-center [&_button]:bg-azul-leve/90 [&_button]:px-4 [&_button]:py-3 [&_button]:rounded-[8px] [&_svg]:stroke-tema [&_svg]:size-5 font-semibold">
                  <button>
                     <Percent /> 50/50
                  </button>
                  <button>
                     <ArrowRight /> Pular pergunta
                  </button>
                  <button>
                     <Users /> Ajuda pública
                  </button>
               </div>
            </div>
         </div>
         {/* Direita */}
         <div className="flex flex-col grow gap-6">
            <EscadaPremios perguntaAtual={1} valorGarantido={0} />
            <button className="px-2.5 py-3.75 text-white bg-[#D32F2F] text-2xl font-semibold rounded-[12px] cursor-pointer">
               Terminar partida
            </button>
         </div>
      </Container>
   );
}
