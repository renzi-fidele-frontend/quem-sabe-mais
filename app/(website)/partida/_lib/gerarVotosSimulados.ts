import { IPergunta } from "@/models/Pergunta";

export type ResultadoAjudaPublica = {
   alternativaId: string;
   porcentagem: number;
}[];

function gerarVotosSimulados(alternativas: IPergunta["alternativas"], respostaCorreta: string): ResultadoAjudaPublica {
   const percentualCorreto = Math.floor(Math.random() * 20) + 51;
   const restante = 100 - percentualCorreto;

   const incorretas = alternativas.filter((alternativa) => alternativa.id !== respostaCorreta);

   if (incorretas.length === 0 || !alternativas.some((a) => a.id === respostaCorreta)) {
      throw new Error("Estrutura de alternativas inválida");
   }

   // Pesos aleatórios para distribuir os votos incorretos
   const pesos = incorretas.map(() => Math.random() + 0.1);
   const somaPesos = pesos.reduce((total, peso) => total + peso, 0);

   const votosIncorretos = pesos.map((peso) => Math.floor((peso / somaPesos) * restante));

   // Distribui os pontos que sobraram devido ao arredondamento
   let distribuido = votosIncorretos.reduce((total, voto) => total + voto, 0);

   while (distribuido < restante) {
      const indice = Math.floor(Math.random() * votosIncorretos.length);
      votosIncorretos[indice]++;
      distribuido++;
   }

   return alternativas.map((alternativa) => ({
      alternativaId: alternativa.id,
      porcentagem:
         alternativa.id === respostaCorreta ? percentualCorreto : votosIncorretos[incorretas.findIndex((a) => a.id === alternativa.id)],
   }));
}

export default gerarVotosSimulados;
