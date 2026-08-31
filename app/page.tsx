import Container from "@/components/layout/Container";
import SectionIntro from "@/components/layout/SectionIntro";
import Button from "@/components/shared/Button";
import {
   Activity,
   Award,
   BadgeQuestionMark,
   Beaker,
   BookOpen,
   Film,
   Gift,
   Globe,
   Info,
   Play,
   Shield,
   Star,
   TrendingUp,
   Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   const comoFunciona = [
      {
         titulo: "Começe a jogar",
         descricao: "Entre em uma partida rápida de qualquer lugar, diretamente no seu telemóvel ou computador.",
         icone: Play,
      },
      {
         titulo: "Responda e Avance",
         descricao: "Teste seus conhecimentos em 15 perguntas de dificuldade progressiva com tempo limitado.",
         icone: BadgeQuestionMark,
      },
      {
         titulo: "Suba na Escala",
         descricao: "A cada resposta certa, o valor do seu prémio aumenta. Use as linhas de apoio nos momentos difíceis.",
         icone: TrendingUp,
      },
      {
         titulo: "Conquiste Prémios",
         descricao: "Atinja os patamares de segurança, garanta seus pontos de progresso e dispute o ranking global.",
         icone: Award,
      },
   ];

   const quemEstaNoTopo = [
      { nome: "Carlos Matsinhe", pontos: 98500, nivel: "Especialista" },
      { nome: "Nelson Nascimento", pontos: 87200, nivel: "Especialista" },
      { nome: "Lucas Pedro", pontos: 75000, nivel: "Especialista" },
      { nome: "Maria Tembe", pontos: 62500, nivel: "Especialista" },
      { nome: "João Nhaca", pontos: 58300, nivel: "Especialista" },
   ];

   const categorias = [
      { icone: Globe, nome: "Geografia", nrPerguntas: 1200 },
      { icone: BookOpen, nome: "História", nrPerguntas: 950 },
      { icone: Beaker, nome: "Ciência", nrPerguntas: 840 },
      { icone: Activity, nome: "Desporto", nrPerguntas: 1100 },
      { icone: Film, nome: "Entretenimento", nrPerguntas: 1500 },
      { icone: Star, nome: "Cultura Moçambicana", nrPerguntas: 2000 },
      { icone: TrendingUp, nome: "Economia", nrPerguntas: 720 },
      { icone: Award, nome: "Cultura Geral", nrPerguntas: 1800 },
   ];

   const beneficios = [
      {
         icone: BookOpen,
         titulo: "Teste seu conhecimento real",
         descricao: "Milhares de questões elaboradas por educadores, cobrindo o currículo escolar nacional e curiosidades internacionais.",
      },
      {
         icone: Users,
         titulo: "Compita com outros jogadores",
         descricao: "Compare sua agilidade mental em tempo real com amigos e concorrentes de todas as províncias do país.",
      },
      {
         icone: Gift,
         titulo: "Ganhe Recompensas Reais",
         descricao: "Seu intelecto se traduz em pontos conversíveis e grandes premiações em dinheiro no final de cada temporada.",
      },
   ];

   const niveis = [
      { nivel: 1, titulo: "Curioso", xpRequerido: "Início" },
      { nivel: 5, titulo: "Competidor", xpRequerido: "500 XP" },
      { nivel: 10, titulo: "Especialista", xpRequerido: "1.500 XP" },
      { nivel: 20, titulo: "Mestre", xpRequerido: "5.000 XP" },
      { nivel: 30, titulo: "Lenda", xpRequerido: "15.000 XP" },
   ];

   return (
      <div>
         {/* Background */}
         <div className="absolute inset-0 -z-2">
            <div className="relative">
               <Image className="" width={1920} height={1500} src="/img/fundo-palco.webp" alt="Palco do quem sabe mais" />
               {/* Overlay */}
               <div className="inset-0 absolute bg-fundo opacity-72 size-full" />
            </div>
         </div>
         {/* Conteúdo principal */}
         <div>
            {/* Hero */}
            <section>
               <Container className="pt-20 pb-18">
                  <section className="[&_span]:text-tema flex items-center gap-16 flex-nowrap">
                     {/* Esquerda */}
                     <div className="basis-[75%] space-y-7">
                        <h6 className="text-tema border-tema border rounded-lg px-4 py-1.5 bg-tema/12 text-sm w-fit font-sora font-bold">
                           🏆 O MAIOR QUIZ DE CONHECIMENTOS DE MOÇAMBIQUE
                        </h6>
                        <div className="text-white">
                           <div className="space-y-6">
                              <h1 className="text-7xl font-black">
                                 QUEM SABE <span>MAIS?</span>
                              </h1>
                              <p className="text-3xl font-bold">
                                 Mostre o que você sabe. <span>Conquiste o seu prêmio.</span>
                              </p>
                              <p className="text-lg text-[#E8E9EA] pe-30 font-sora mb-8">
                                 Responda a perguntas desafiadoras sobre ciência, geografia, história, desporto e a nossa rica cultura
                                 moçambicana. Suba nos rankings de liderança e{" "}
                                 <span className="font-bold">concorra a recompensas reais todas as épocas!</span>
                              </p>
                              <Link href="/jogar">
                                 <Button className="px-9 py-4.5 gap-3.5 font-black!">
                                    <Play className="stroke-3" /> COMEÇAR A JOGAR
                                 </Button>
                              </Link>
                           </div>
                           <p className="text-sm text-[#E9EBEE] mt-4.5 font-sora opacity-80">
                              É grátis para começar • Jogue diretamente do navegador
                           </p>
                        </div>
                     </div>
                     {/* Direita */}
                     <div
                        className="**:font-sora border-2 border-tema bg-azul-escuro2/90 p-12 rounded-[28px] grow space-y-6"
                        style={{ boxShadow: "0px 16px 48px 0 rgba(255,199,44,0.2)" }}
                     >
                        <div className="text-center space-y-5">
                           <p className="text-tema text-[13px] font-extrabold uppercase">
                              🥇 PRÉMIO que será distribuído entre os top 3 melhores jogagores
                           </p>
                           <p className="font-outfit text-5xl text-tema text-shadow-md text-shadow-tema font-black">1000.00 MT</p>
                           <Image src="/img/maleta-com-dinheiro.webp" width={534} height={299} alt="" />
                           <p className="text-white font-semibold">Para o grande campeão do mês!</p>
                        </div>
                        <hr className="border-[#1E254A]" />
                        <div className="*:gap-3 space-y-4 text-sm [&_svg]:size-5">
                           <p className="flex items-center">
                              <Star className="stroke-tema" /> Mostre seu conhecimento e conquiste o topo
                           </p>
                           <p className="flex items-center">
                              <Shield className="stroke-tema" /> Suba nos níveis e seja um grande vencedor
                           </p>
                        </div>
                        <Link
                           className="uppercase text-tema text-center bg-tema/13 p-4 rounded-xl flex items-center grow justify-center text-sm font-bold "
                           href="central-de-ajuda"
                        >
                           <Info className="size-4.75 me-2" /> Saiba mais sobre o prêmio
                        </Link>
                     </div>
                  </section>
               </Container>
            </section>
            {/* Estatísticas */}
            <section className="bg-azul-escuro2 border border-cor-borda rounded-2xl uppercase [&_p]:text-tema [&_p]:text-2xl [&_p]:font-black [&_span]:font-semibold [&_span]:font-sora [&_span]:text-[12px] flex max-w-7xl px-10 py-6 justify-between items-center">
               <div>
                  <p>10.000+</p>
                  <span>Jogadores ativos</span>
               </div>
               <div className="h-9 border-r-2 border-cor-borda"></div>
               <div>
                  <p>500.000+</p>
                  <span>Perguntas respondidas</span>
               </div>
               <div className="h-9 border-r-2 border-cor-borda"></div>
               <div>
                  <p>100.000 MT</p>
                  <span>em prémios mensais</span>
               </div>
               <div className="h-9 border-r-2 border-cor-borda"></div>
               <div>
                  <p>15</p>
                  <span>perguntas por partida</span>
               </div>
            </section>
            {/* Como funciona o QUIZ */}
            <section>
               <Container className="pb-25">
                  <SectionIntro
                     subtitulo="Estrutura de Jogo"
                     titulo="Como funciona o Quiz?"
                     descricao="É simples começar a disputar prémios, mas apenas os mais astutos chegam ao topo da escada milionária."
                  />
                  <div className="grid grid-cols-4 gap-6">
                     {comoFunciona.map((item, k) => (
                        <div key={k} className="bg-azul-escuro2 p-8 border-cor-borda border rounded-3xl space-y-5">
                           <div className="flex justify-between">
                              <span className="text-tema text-[32px] font-black">0{k + 1}</span>
                              <div className="p-2.5 rounded-xl bg-tema/13">
                                 <item.icone className="stroke-tema" />
                              </div>
                           </div>
                           <p className="text-white font-bold text-xl">{item.titulo}</p>
                           <p className="text-sm font-sora">{item.descricao}</p>
                        </div>
                     ))}
                  </div>
               </Container>
            </section>
            {/* Até onde você consegue chegar? */}
            <section className="relative">
               <Image width={1920} height={1087} src="/img/fundo-palco2.webp" className="inset-0 size-full object-cover -z-2 absolute" alt="" />
               <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-46"></div>
               <Container className="pb-25">
                  <SectionIntro
                     subtitulo="Níveis de Recompensa"
                     titulo="Até onde você consegue chegar?"
                     descricao="Cada resposta certa aproxima você do prémio máximo. Conheça a escala de premiação por partida."
                  />
                  <div className="grid grid-cols-2 gap-12 ">
                     {/* Esquerda */}
                     <div className="flex justify-center flex-col gap-6">
                        <h6 className="text-3xl text-white font-extrabold">Níveis de Segurança Garantidos</h6>
                        <p className="text-lg">
                           Assim como no clássico show de TV, ao atingir as perguntas <span className="text-tema font-semibold">5</span> e{" "}
                           <span className="text-tema font-semibold">10</span>, você alcança patamares de segurança. Mesmo que erre depois, seu
                           prémio acumulado nesses checkpoints estará garantido!
                        </p>
                        <div className="pt-2.5 space-y-4 [&>div]:border [&>div]:rounded-xl [&>div]:p-5 [&>div]:space-y-4 [&>div]:bg-azul-escuro2">
                           <div className="border-tema">
                              <p className="text-tema font-extrabold text-xl">Nível 15: 100.000 MT</p>
                              <p>O topo do conhecimento. O prêmio máximo reservado aos verdadeiros mestres.</p>
                           </div>
                           <div className="border-cor-borda">
                              <p className="text-white font-bold">Nível 10: 7.500 MT (Seguro)</p>
                              <p>Segundo checkpoint de segurança. Valor totalmente garantido em sua carteira.</p>
                           </div>
                        </div>
                     </div>
                     {/* Direita */}
                     <div>
                        <Image src="/img/tabela-recompensas.png" alt="Tabela de recompensa" width={680} height={686} />
                     </div>
                  </div>
               </Container>
            </section>
            {/* Quem está no topo */}
            <section className="pb-25 relative">
               <Image
                  className="absolute inset-0 size-full object-cover -z-2"
                  alt="Fundo wavy"
                  src="/img/fundo-wavy.webp"
                  width={1919}
                  height={1439}
               />
               <div className="bg-fundo absolute -z-1 size-full inset-0 opacity-81"></div>
               <Container>
                  <SectionIntro
                     subtitulo="Liderança Geral"
                     titulo="Quem está no topo?"
                     descricao="Os jogadores mais rápidos e inteligentes que lideram a corrida pelo prêmio acumulado desta época."
                  />
                  <div className="space-y-4 mx-22">
                     {quemEstaNoTopo.map((item, k) => (
                        <div
                           className={`flex items-center justify-between rounded-2xl border p-4 ${k === 0 ? "bg-tema/13 border-tema" : "bg-azul-escuro2/80 border-cor-borda"}`}
                           key={k}
                        >
                           {/* Esquerda */}
                           <div className="flex items-center gap-6">
                              {/* Rank */}
                              <p className={`text-xl font-black ${k === 0 ? "text-tema" : ""}`}>0{k + 1}</p>
                              {/* Avatar */}
                              <div className={`border-2 rounded-3xl h-13 w-15 ${k === 0 ? "border-tema" : "border-cor-borda"}`}></div>
                              {/* Nome e Status */}
                              <div className="font-sora">
                                 <p className="text-white font-bold">{item.nome}</p>
                                 <p className="text-[12px]">{item.nivel}</p>
                              </div>
                           </div>
                           {/* Direita */}
                           <p
                              className={`w-fit px-4 py-2 font-extrabold ${k === 0 ? "bg-tema text-black" : "bg-cor-borda text-white"} rounded-xl`}
                           >
                              {item.pontos.toLocaleString("de-DE")} MT
                           </p>
                        </div>
                     ))}
                  </div>
               </Container>
            </section>
            {/* Conteúdo Programático */}
            <section className="pb-25">
               <Container>
                  <SectionIntro
                     subtitulo="Conteúdo Programático"
                     titulo="Você domina quais assuntos?"
                     descricao="Explore as diversas áreas do conhecimento disponíveis no jogo para treinar suas habilidades."
                  />
                  <div className="flex items-stretch gap-5 flex-wrap">
                     {categorias.map((item, k) => (
                        <div
                           className="p-7 rounded-2xl bg-azul-escuro2/90 border border-cor-borda space-y-4 basis-[calc(25%-(--spacing(4)))]"
                           key={k}
                        >
                           <div className="p-3 rounded-xl bg-azul-escuro w-fit">
                              <item.icone className="stroke-texto-1" />
                           </div>
                           <div className="space-y-1.5">
                              <p className="text-white font-bold text-lg">{item.nome}</p>
                              <p className="font-sora text-sm">{item.nrPerguntas}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </Container>
            </section>
            {/* Benefícios */}
            <section className="pb-25 relative">
               {/* Fundo */}
               <Image className="absolute inset-0 size-full object-cover -z-2" alt="" src="/img/fundo-wavy2.webp" width={1920} height={1440} />
               <div className="absolute -z-1 inset-0 size-full bg-fundo opacity-89"></div>
               <Container>
                  <SectionIntro
                     subtitulo="Benefícios"
                     titulo="Muito mais do que um simples quiz"
                     descricao="Uma experiência completa de competição mental com mecânicas projetadas para prender sua atenção."
                  />
                  <div className="flex items-stretch gap-8">
                     {beneficios.map((item, k) => (
                        <div
                           className="p-10 rounded-2xl bg-azul-escuro2/90 border border-cor-borda space-y-4 basis-[calc(33.3%-(--spacing(8)))] grow"
                           key={k}
                        >
                           <div className="bg-tema/13 rounded-full p-4 w-fit">
                              <item.icone className="stroke-tema" />
                           </div>
                           <div className="space-y-3">
                              <p className="text-white font-extrabold text-[22px]">{item.titulo}</p>
                              <p className="font-sora text-sm">{item.descricao}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </Container>
            </section>
            {/* Sistema de classificação */}
            <section className="pb-25">
               <Container>
                  <SectionIntro
                     subtitulo="Sistema de classificação"
                     titulo="Sua jornada rumo ao estrelato"
                     descricao="Ganhe pontos de experiência (XP) a cada partida disputada e desbloqueie novos títulos honoríficos."
                  />
                  <div className="flex  justify-center gap-3 ">
                     {niveis.map((item, k) => (
                        <>
                           <div className="text-center flex justify-center flex-col items-center" key={k}>
                              <p
                                 className={`text-2xl mb-4 font-black flex items-center justify-center size-22 rounded-full border-2 ${k < 3 ? "border-tema bg-tema/13 text-tema" : "border-cor-borda bg-azul-escuro2/90"}`}
                              >
                                 {item.nivel}
                              </p>
                              <p className="text-white text-lg font-bold">{item.titulo}</p>
                              <p className="text-sm mt-1">{item.xpRequerido}</p>
                           </div>
                           {k < niveis.length - 1 && <hr className="w-28 relative top-10 border-dashed border" />}
                        </>
                     ))}
                  </div>
               </Container>
            </section>
         </div>
      </div>
   );
}
