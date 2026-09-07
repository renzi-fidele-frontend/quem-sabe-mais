import Container from "@/components/layout/Container";

export default function Page() {
   return (
      <Container className="">
         {/* Esquerda */}
         <div>
            {/* Imagem e temporizador */}
            <div>
               <Image />
               <span>00:15</span>
            </div>
            {/* Pergunta */}
            <h6>Qual é a capital de Moçambique?</h6>
            {/* Alternativas */}
            <div>
                
            </div>
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
