import Sidebar from "./perguntas/_components/Sidebar";

interface Props {
   children: React.ReactNode;
   modal: React.ReactNode;
}
export default function AdminLayout({ children, modal }: Props) {
   return (
      <div className="flex flex-nowrap max-h-screen">
         <div>
            <Sidebar />
         </div>
         <div className="grow p-8 overflow-auto">{children}</div>
         {modal}
      </div>
   );
}
