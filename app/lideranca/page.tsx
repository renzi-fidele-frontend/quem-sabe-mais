import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import Image from "next/image";

export default function Lideranca() {
   return (
      <div className="relative">
         {/* Fundo com overlay */}
         <Image
            width={1920}
            height={1087}
            src="/img/fundo-palco-gameplay.webp"
            className="inset-0 size-full object-cover object-top -z-2 absolute"
            alt="Imagem de fundo do palco"
         />
         <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-75"></div>
         <Container className="pt-10 pb-20">
            <SectionIntro
               subtitulo="🏆 CLASSIFICAÇÃO DA ÉPOCA"
               titulo="Tabela de liderança"
               descricao="Descubra quem está no topo e veja até onde você consegue chegar."
            />
         </Container>
      </div>
   );
}
