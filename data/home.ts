import { Activity, Award, BadgeQuestionMark, Beaker, BookOpen, Film, Gift, Globe, Play, Star, TrendingUp, Users } from "lucide-react";

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

const testemunhos = [
   {
      autor: "Carlos M.",
      provincia: "Maputo",
      texto: "Comecei apenas por diversão para passar o tempo e agora estou viciado em tentar chegar ao topo do ranking mensal. A adrenalina de responder sob pressão é excelente!",
   },
   {
      autor: "Ana S.",
      provincia: "Beira",
      texto: "Finalmente encontrei um quiz que realmente testa conhecimentos sobre a cultura de Moçambique de forma inteligente e divertida. Recomendo muito aos meus estudantes.",
   },
   {
      autor: "Paulo J.",
      provincia: "Nampula",
      texto: "O sistema de escada de prémios é genial. Cada partida concluída dá vontade de tentar imediatamente uma nova para chegar a um patamar de segurança mais alto.",
   },
];

export { comoFunciona, quemEstaNoTopo, categorias, beneficios, niveis, testemunhos };
