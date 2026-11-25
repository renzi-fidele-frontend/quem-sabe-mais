import ModalPergunta from "../../_components/ModalPergunta";

type Props = { params: Promise<{ id: string }> };

export default async function EditarPerguntaPage({ params }: Props) {
   const { id } = await params;

   return <ModalPergunta perguntaId={id} />;
}
