import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { obterClassificacao } from "./_lib/obterClassificacao";

export default async function Lideranca() {
   const classificacao = await obterClassificacao();
   console.log(classificacao);

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

         <Container className="pb-20">
            <SectionIntro
               className="items-start max-w-full py-16"
               subtitulo="🏆 CLASSIFICAÇÃO DA ÉPOCA"
               titulo="Tabela de liderança"
               descricao="Descubra quem está no topo e veja até onde você consegue chegar."
            />
            {/* TODO: Ao escalar adicionar a seção da Posição atual */}
            {/* Listagem */}
            <section>
               <div className="flex justify-between items-center mb-5">
                  <h6 className="text-[20px] font-extrabold text-white">Classificação</h6>
                  <p>1.284 jogadores classificados</p>
               </div>
               <Table className="bg-azul-escuro2/90">
                  <TableHeader className="py-0! font-sora **:text-texto-1 **:text-xs **:font-bold uppercase">
                     <TableRow className="*:py-0! hover:bg-cor-borda border-cor-borda">
                        <TableHead className="">POSIÇÃO</TableHead>
                        <TableHead>JOGADOR</TableHead>
                        <TableHead>PARTIDAS</TableHead>
                        <TableHead>VITÓRIAS</TableHead>
                        <TableHead>ACERTOS</TableHead>
                        <TableHead>TAXA DE ACERTO</TableHead>
                        <TableHead className="text-tema!">PRÊMIO</TableHead>
                        <TableHead>XP</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody></TableBody>
               </Table>
            </section>
         </Container>
      </div>
   );
}
