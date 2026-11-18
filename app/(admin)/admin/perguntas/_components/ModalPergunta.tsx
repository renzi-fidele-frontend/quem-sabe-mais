import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DificuldadePergunta } from "@/models/Pergunta";
import { Upload, X } from "lucide-react";
import { obterCategorias } from "../_lib/obterCategorias";
import FecharModalBtn from "./FecharModalBtn";

const ModalPergunta = async () => {
   const alternativas = ["A", "B", "C", "D"];
   // TODO: Apanhar as categorias via server actions
   const dificuldades: DificuldadePergunta[] = ["fácil", "média", "difícil"];

   const categorias = await obterCategorias();

   console.log(categorias);

   return (
      <div className="py-7 border border-cor-borda rounded-[16px] bg-azul-escuro max-w-3xl max-h-[90dvh] mx-auto w-full overflow-y-auto scrollbar-thin scrollbar-thumb-tema">
         {/* Heading */}
         <div className="px-8 pb-4 flex justify-between ">
            <div>
               <h4 className="text-white font-sora font-semibold text-[22px] mb-2">Nova pergunta</h4>
               <p className="text-sm">Atualize os dados e confirme a resposta correta.</p>
            </div>
            <FecharModalBtn />
         </div>
         <hr className="w-full border-cor-borda" />
         {/* Conteúdo principal */}
         <div className="px-8 pt-6">
            {/* Formulário */}
            <section>
               <form className="space-y-8" action="">
                  {/* Enunciado */}
                  <fieldset>
                     <label className="text-white text-[13px]" htmlFor="enunciado">
                        Enunciado
                     </label>
                     <Textarea
                        className="border-cor-borda border rounded-[7px] placeholder:text-texto-1 mt-2.5"
                        placeholder="Escreva aqui o enunciado da pergunta..."
                        id="enunciado"
                     />
                  </fieldset>
                  {/* Imagem */}
                  <fieldset>
                     <label className="text-white text-[13px]" htmlFor="imagem">
                        Imagem
                     </label>
                     <input type="file" id="imagem" className="hidden" />
                     <div className="flex items-center gap-4.5 rounded-[8px] bg-azul-escuro2 px-7 py-8 border border-dashed border-cor-borda mt-2.5 cursor-pointer">
                        <Upload className="stroke-tema size-7" />
                        <div className="space-y-1.75">
                           <p className="text-white font-medium text-sm">Clique para adicionar uma imagem</p>
                           <p className="text-xs">JPG, PNG ou WebP · proporção recomendada 16:9</p>
                           <p className="text-[11px]">A imagem é opcional.</p>
                        </div>
                     </div>
                  </fieldset>
                  {/* Alternativas */}
                  <fieldset>
                     <label className="text-white text-[13px]">Alternativas</label>
                     <p className="mb-4.5 mt-2 text-xs">Selecione uma única resposta correta.</p>
                     <div className="space-y-2 *:border-cor-borda *:placeholder:text-texto-1 *:placeholder:text-xs">
                        <Input placeholder="Alternativa A" />
                        <Input placeholder="Alternativa B" />
                        <Input placeholder="Alternativa C" />
                        <Input placeholder="Alternativa D" />
                     </div>
                  </fieldset>
                  <fieldset className="flex items-center gap-5 w-full">
                     <label className="text-white text-[16px] whitespace-nowrap">Resposta correta:</label>
                     <RadioGroup className="flex gap-5" defaultValue="A">
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
                        <Select items={dificuldades.map((item) => ({ value: item, label: item }))}>
                           <SelectTrigger className="w-full mt-2 bg-azul-escuro2  h-10!">
                              <SelectValue className="text-texto-1 capitalize" placeholder="Selecione a categoria" />
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
                     {/* Dificuldade */}
                     <fieldset>
                        <label className="text-white text-[13px] font-medium">Dificuldade *</label>
                        <Select items={dificuldades.map((item) => ({ value: item, label: item }))}>
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
                     <Switch className="h-6! w-11! *:size-4.5!" id="pergunta_ativa" />
                  </fieldset>
               </form>
            </section>

            {/* TODO: Ao escalar adicionar a seção de Pré-visualização */}
            <section></section>
         </div>
         <section className="px-8 pt-3 border-t border-cor-borda flex items-center justify-between">
            <p className="text-xs">* Campos obrigatórios</p>
            <div className="flex gap-3 *:py-3 *:px-6.5 *:rounded-[7px] *:font-semibold">
               <button className="border border-cor-borda bg-azul-escuro2">Cancelar</button>
               <button className="bg-tema text-black">Guardar pergunta</button>
            </div>
         </section>
      </div>
   );
};
export default ModalPergunta;
