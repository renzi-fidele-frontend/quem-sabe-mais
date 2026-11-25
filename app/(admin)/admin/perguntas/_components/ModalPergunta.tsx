import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DificuldadePergunta, IPergunta, Pergunta } from "@/models/Pergunta";
import { obterCategorias } from "../_lib/obterCategorias";
import FecharModalBtn from "./FecharModalBtn";
import CancelarModal from "./CancelarModal";
import InputUploadImagem from "./InputUploadImagem";
import { criarPergunta } from "../_lib/criarPergunta";
import editarPergunta from "../_lib/editarPergunta";

// TODO: Tornar o modal de pergunta em editável
const ModalPergunta = async ({ perguntaId }: { perguntaId?: string }) => {
   console.log(`Aqui é`);
   console.log(perguntaId);
   const alternativas = ["A", "B", "C", "D"];
   const dificuldades: DificuldadePergunta[] = ["fácil", "média", "difícil"];

   const [pergunta, categorias] = await Promise.all([Pergunta.findById(perguntaId).lean<IPergunta>(), obterCategorias()]);

   if (!pergunta && perguntaId) {
      throw new Error("A pergunta a se editar não existe!");
   }

   return (
      <div className="py-7 border border-cor-borda rounded-[16px] bg-azul-escuro max-w-3xl max-h-[90dvh] mx-auto w-full overflow-y-auto scrollbar-thin scrollbar-thumb-tema">
         {/* Heading */}
         <div className="px-8 pb-4 flex justify-between ">
            <div>
               <h4 className="text-white font-sora font-semibold text-[22px] mb-2">{pergunta ? "Editar pergunta" : "Nova pergunta"}</h4>
               <p className="text-sm">
                  {pergunta ? "Atualize os dados e confirme a resposta correta." : "Adicione conhecimento ao banco de perguntas."}
               </p>
            </div>
            <FecharModalBtn />
         </div>
         <hr className="w-full border-cor-borda" />
         {/* Conteúdo principal */}
         <div className="px-8 pt-6">
            {/* Formulário */}
            <section>
               <form id="adicionarNovaPergunta" className="space-y-8" action={perguntaId ? editarPergunta : criarPergunta}>
                  {/* Id pergunta */}
                  {perguntaId && <input type="hidden" name="perguntaId" value={perguntaId} />}
                  {/* Enunciado */}
                  <fieldset>
                     <label className="text-white text-[13px]" htmlFor="enunciado">
                        Enunciado
                     </label>
                     <Textarea
                        className="border-cor-borda border rounded-[7px] placeholder:text-texto-1 mt-2.5"
                        placeholder="Escreva aqui o enunciado da pergunta..."
                        id="enunciado"
                        name="enunciado"
                        required
                        defaultValue={pergunta ? pergunta.enunciado : ""}
                     />
                  </fieldset>
                  {/* Imagem */}
                  <fieldset>
                     <label className="text-white text-[13px]" htmlFor="imagem">
                        Imagem
                     </label>
                     <InputUploadImagem fotoAtual={perguntaId ? pergunta?.imagem : undefined} />
                  </fieldset>
                  {/* Alternativas */}
                  <fieldset>
                     <label className="text-white text-[13px]">Alternativas</label>
                     <p className="mb-4.5 mt-2 text-xs">Selecione uma única resposta correta.</p>
                     <div className="space-y-2 *:border-cor-borda *:placeholder:text-texto-1 *:placeholder:text-xs">
                        <Input
                           defaultValue={pergunta ? pergunta.alternativas[0].texto : ""}
                           required
                           name="alternativa_a"
                           placeholder="Alternativa A"
                        />
                        <Input
                           defaultValue={pergunta ? pergunta.alternativas[1].texto : ""}
                           required
                           name="alternativa_b"
                           placeholder="Alternativa B"
                        />
                        <Input
                           defaultValue={pergunta ? pergunta.alternativas[2].texto : ""}
                           required
                           name="alternativa_c"
                           placeholder="Alternativa C"
                        />
                        <Input
                           defaultValue={pergunta ? pergunta.alternativas[3].texto : ""}
                           required
                           name="alternativa_d"
                           placeholder="Alternativa D"
                        />
                     </div>
                  </fieldset>
                  {/* Resposta Correta */}
                  <fieldset className="flex items-center gap-5 w-full">
                     <label className="text-white text-[16px] whitespace-nowrap">Resposta correta:</label>
                     <RadioGroup name="respostaCorreta" required className="flex gap-5" defaultValue={pergunta ? pergunta.respostaCorreta : "A"}>
                        {alternativas.map((item, k) => (
                           <div
                              className="flex items-center gap-2 bg-azul-escuro2 px-3 py-2.5 border border-cor-borda rounded-[8px] *:cursor-pointer"
                              key={k}
                           >
                              <RadioGroupItem className="data-checked:bg-green-500" value={item} id={item} />
                              <Label className="font-bold" htmlFor={item}>
                                 {item}
                              </Label>
                           </div>
                        ))}
                     </RadioGroup>
                  </fieldset>
                  <div className="flex **:border-cor-borda *:w-full gap-4 ">
                     {/* Categoria */}
                     <fieldset>
                        <label className="text-white text-[13px] font-medium">Categoria *</label>
                        <Select defaultValue={pergunta ? pergunta.categoria.toString() : ""} required name="categoria">
                           <SelectTrigger className="w-full mt-2 bg-azul-escuro2  h-10!">
                              <SelectValue className="text-texto-1 capitalize" placeholder="Selecione a categoria" />
                           </SelectTrigger>
                           <SelectContent className="bg-azul-escuro2 text-white border border-cor-borda">
                              <SelectGroup>
                                 {categorias.map((item) => (
                                    <SelectItem className="capitalize" key={item._id.toString()} value={item._id.toString()}>
                                       {item.nome}
                                    </SelectItem>
                                 ))}
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </fieldset>
                     {/* Dificuldade */}
                     <fieldset>
                        <label className="text-white text-[13px] font-medium">Dificuldade *</label>
                        <Select defaultValue={pergunta ? pergunta.dificuldade : ""} required name="dificuldade">
                           <SelectTrigger className="w-full mt-2 bg-azul-escuro2 h-10!">
                              <SelectValue className="text-texto-1 capitalize" placeholder="Selecione a dificuldade" />
                           </SelectTrigger>
                           <SelectContent className="bg-azul-escuro2 text-white border border-cor-borda">
                              <SelectGroup>
                                 {dificuldades.map((item) => (
                                    <SelectItem className="capitalize" key={item} value={item}>
                                       {item}
                                    </SelectItem>
                                 ))}
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </fieldset>
                  </div>
                  {/* Estado */}
                  <fieldset className="flex justify-between">
                     <div>
                        <label className="text-white text-[13px]">Pergunta ativa</label>
                        <p className="mb-4.5 mt-2 text-xs">Disponível para ser utilizada nas partidas.</p>
                     </div>
                     <Switch
                        name="pergunta_ativa"
                        defaultChecked={pergunta ? pergunta.ativa : true}
                        className="h-6! w-11! *:size-4.5!"
                        id="pergunta_ativa"
                     />
                  </fieldset>
               </form>
            </section>

            {/* TODO: Ao escalar adicionar a seção de Pré-visualização */}
            <section></section>
         </div>
         <section className="px-8 pt-3 border-t border-cor-borda flex items-center justify-between">
            <p className="text-xs">* Campos obrigatórios</p>
            <div className="flex gap-3 *:py-3 *:px-6.5 *:rounded-[7px] *:font-semibold *:cursor-pointer">
               <CancelarModal />
               <button type="submit" form="adicionarNovaPergunta" className="bg-tema text-black">
                  Guardar pergunta
               </button>
            </div>
         </section>
      </div>
   );
};
export default ModalPergunta;
