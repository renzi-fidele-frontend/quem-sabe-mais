import Container from "@/components/layout/Container";
import Image from "next/image";

export default function Page() {
   return (
      <Container className="">
         {/* Esquerda */}
         <div>
            {/* Imagem e temporizador */}
            <div>
               <Image width={812} height={434} src="/img/foto_pergunta.webp" alt="Foto da pergunta" />
               <span>00:15</span>
            </div>
            {/* Pergunta */}
            <h6>Qual é a capital de Moçambique?</h6>
            {/* Alternativas */}
            <div></div>
            {/* Linhas de Apoio */}
            <div>
               <p>Linhas de Apoio Disponíveis:</p>
               <div></div>
            </div>
         </div>
         {/* Direita */}
         <div></div>
      </Container>
   );
}
