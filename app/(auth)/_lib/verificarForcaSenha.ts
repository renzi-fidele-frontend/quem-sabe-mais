import { ZxcvbnFactory } from "@zxcvbn-ts/core";
import * as common from "@zxcvbn-ts/language-common";
import * as ptBr from "@zxcvbn-ts/language-pt-br";

const zxcvbn = new ZxcvbnFactory({
   graphs: common.adjacencyGraphs,
   translations: ptBr.translations,
   dictionary: { ...common.dictionary, ...ptBr.dictionary },
});

export const verificarForcaSenha = (senha: string) => {
   if (!senha) {
      return {
         score: 0,
         label: "",
      };
   }

   const resultado = zxcvbn.check(senha);

   const labels = ["Muito fraca", "Fraca", "Razoável", "Forte", "Muito forte"];

   return {
      score: resultado.score,
      label: labels[resultado.score],
      resultado,
   };
};
