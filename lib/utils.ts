export { cn } from "cn";

/** Gerar um array contendo Integers de 1 até o length. */
export function gerarArray(length = 0) {
   return Array.from({ length }, (v, i) => i + 1);
}
