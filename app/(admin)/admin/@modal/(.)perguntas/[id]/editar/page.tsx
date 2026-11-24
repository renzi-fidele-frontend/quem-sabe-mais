import ModalPergunta from "@/app/(admin)/admin/perguntas/_components/ModalPergunta";
import { dbConnect } from "@/lib/db/dbConnect";

export default async function EditarModal({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   await dbConnect();

   <div className="backdrop-blur fixed inset-0 z-50 flex items-center justify-center">
      <ModalPergunta perguntaId={id} />
   </div>;
}
