import { gerarArray } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface IPagination {
   paginaAtual: number;
   totalPaginas: number;
}
const Paginacao = ({ paginaAtual, totalPaginas }: IPagination) => {
   // Prevê o range das páginas do meio
   function preverRange() {
      if (paginaAtual < 5) return [1, 5];
      else if (paginaAtual > totalPaginas - 5) return [totalPaginas - 6, totalPaginas - 1];
      else return [paginaAtual - 2, paginaAtual + 2];
   }

   function isActive(pagina: number) {
      return pagina === paginaAtual;
   }

   return (
      <nav className="flex flex-wrap items-stretch justify-center gap-2 sm:text-lg md:text-xl *:border *:rounded *:border-cor-borda *:py-1.5 *:px-2.75 font-sora font-bold *:text-[13px]">
         {/* Pagina anterior */}
         {paginaAtual > 1 && (
            <Link className="flex items-center" href={`?page=${paginaAtual - 1}`}>
               <ChevronLeft className="size-4" /> Anterior
            </Link>
         )}

         {/* Primeira página */}
         <Link href={`?page=1`} className={isActive(1) ? "bg-tema text-black" : ""}>
            1
         </Link>

         {/* Ellipsis para a primeira página */}
         {paginaAtual > 5 && <span>...</span>}

         {/* Páginas do meio */}
         {gerarArray(totalPaginas)
            .slice(...preverRange())
            // Excluir 1 e totalPaginas
            .filter((pagina) => pagina !== 1 && pagina !== totalPaginas)
            .map((pagina) => (
               <Link key={pagina} href={`?page=${pagina}`} className={isActive(pagina) ? "bg-tema text-black" : ""}>
                  {pagina}
               </Link>
            ))}

         {/* Ellipsis para a ultima página */}
         {paginaAtual < totalPaginas - 5 && <span>...</span>}

         {/* Ultima página */}
         {totalPaginas > 1 && (
            <Link href={`?page=${totalPaginas}`} className={isActive(totalPaginas) ? "bg-tema text-black" : ""}>
               {totalPaginas}
            </Link>
         )}

         {/* Proxima página */}
         {paginaAtual < totalPaginas && (
            <Link className="flex items-center" href={`?page=${paginaAtual + 1}`}>
               Próxima <ChevronRight className="size-4" />
            </Link>
         )}
      </nav>
   );
};
export default Paginacao;
