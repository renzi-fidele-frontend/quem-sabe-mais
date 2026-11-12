import { NIVEIS } from "@/data/jogo";
import obterProgressoXpUsuario from "../../partida/_lib/obterProgresso";
import { Check, Lock } from "lucide-react";

const niveisAoContrario = [...NIVEIS].reverse();
const niveisUnicos = Array.from(new Map(niveisAoContrario.map((nivel) => [nivel.titulo, nivel])).values()).sort((a, b) => a.nivel - b.nivel);

const CardNiveisRecompensas = ({ xp }: { xp: number }) => {
   const progresso = obterProgressoXpUsuario(xp);

   return (
      <section>
         <h2 className="font-sora text-lg font-bold mb-5 text-white">Níveis e recompensas</h2>

         <div className="grid grid-cols-6 gap-4">
            {niveisUnicos.map((nivel) => {
               const desbloqueado = xp >= nivel.xpMinimo;
               const atual = progresso.titulo === nivel.titulo;

               return (
                  <div
                     className={`p-4.5 rounded-[12px] ${atual ? "border-tema border-2 bg-tema/13 shadow-xl shadow-tema/20" : "border-cor-borda border bg-azul-escuro2/90"}`}
                     key={nivel.nivel}
                  >
                     <div className="flex justify-between mb-3 items-center">
                        <span className={`text-sm font-extrabold ${desbloqueado && "text-tema"}`}>NÍVEL {nivel.nivel}</span>
                        {atual && (
                           <span className="text-[9px] font-sora font-extrabold text-black px-2 py-0.5 rounded-[4px] bg-tema">ATUAL</span>
                        )}
                     </div>

                     <p className="text-sm font-sora text-white font-bold mb-1.5">{nivel.titulo}</p>

                     <span className="flex items-center gap-1 text-xs">
                        {desbloqueado ? (
                           <>
                              <Check className="stroke-green-500 size-4 stroke-3" /> Desbloqueado
                           </>
                        ) : (
                           <>
                              <Lock className="stroke-tema size-3.75 stroke-2" /> {nivel.xpMinimo.toLocaleString("pt-PT")} XP
                           </>
                        )}
                     </span>
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default CardNiveisRecompensas;
