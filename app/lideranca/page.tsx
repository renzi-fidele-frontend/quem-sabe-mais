import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { obterClassificacao } from "./_lib/obterClassificacao";
import Paginacao from "@/components/shared/Paginacao";

type Props = {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Lideranca({ searchParams }: Props) {
   const page = (await searchParams).page || 1;
   const classificacao = await obterClassificacao(Number(page));

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
                  <p>{classificacao.totalJogadores} jogadores classificados</p>
               </div>
               <Table className="bg-azul-escuro2/90 **:text-end mb-16">
                  <TableHeader className="py-0! font-sora **:text-texto-1 **:text-xs **:font-bold uppercase bg-[#]">
                     <TableRow className="*:py-0! hover:bg-cor-borda border-cor-borda">
                        <TableHead className="w-fit text-start!">Rank</TableHead>
                        <TableHead className="text-start!">JOGADOR</TableHead>
                        <TableHead>PARTIDAS</TableHead>
                        <TableHead>VITÓRIAS</TableHead>
                        <TableHead>ACERTOS</TableHead>
                        <TableHead>TAXA DE ACERTO</TableHead>
                        <TableHead className="text-tema!">PRÊMIO</TableHead>
                        <TableHead>XP</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {classificacao.jogadores.length === 0 ? (
                        <TableRow>
                           <TableCell colSpan={10} className="text-center py-10">
                              Ainda não existem jogadores classificados nesta época.
                           </TableCell>
                        </TableRow>
                     ) : (
                        classificacao.jogadores.map((jogador) => (
                           <TableRow key={jogador.usuarioId} className="text-[15px]">
                              <TableCell className={`font-extrabold text-base text-start! ${jogador.posicao === 1 ? "text-tema" : ""}`}>
                                 #{jogador.posicao}
                              </TableCell>

                              <TableCell className="font-sora text-start!">
                                 <div className="flex items-stretch gap-4">
                                    <Image
                                       className="rounded-full border border-cor-borda"
                                       src={jogador.avatarUrl}
                                       width={40}
                                       height={40}
                                       alt={`Foto de perfil do jogador: ${jogador.nome}`}
                                    />
                                    <div className="*:flex *:items-center">
                                       <p className="font-bold text-white">
                                          {jogador.nome}{" "}
                                          <span className="text-orange-500   ms-2 text-[10px] bg-orange-900/20 border border-cor-borda px-2 py-0.5 rounded">
                                             {jogador.titulo}
                                          </span>
                                       </p>
                                       <p className="text-xs text-texto-1">
                                          @{jogador.username}{" "}
                                          <span className="ms-2 font-outfit text-tema text-[11px] font-semibold">Nível {jogador.nivel}</span>
                                       </p>
                                    </div>
                                 </div>
                              </TableCell>

                              <TableCell className="text-white font-semibold">{jogador.totalPartidas}</TableCell>

                              <TableCell className="text-white font-semibold">{jogador.totalVitorias}</TableCell>

                              <TableCell className="text-white font-semibold">{jogador.totalAcertos}</TableCell>

                              <TableCell className="text-green-500 font-semibold">{jogador.taxaDeAcerto}%</TableCell>

                              <TableCell className="font-extrabold text-tema text-base ">
                                 {jogador.premioAcumulado.toLocaleString("pt-MZ")} MT
                              </TableCell>

                              <TableCell className="font-semibold">{jogador.xp.toLocaleString("pt-MZ")} XP</TableCell>
                           </TableRow>
                        ))
                     )}
                  </TableBody>
               </Table>
               <Paginacao paginaAtual={Number(page)} totalPaginas={classificacao.totalPaginas} />
            </section>
         </Container>
      </div>
   );
}
