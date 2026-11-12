import Sidebar from "./perguntas/_components/Sidebar";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
   return (
      <div className="flex flex-nowrap">
         <div className="">
            <Sidebar />
         </div>
         <div className="grow p-8">{children}</div>
      </div>
   );
}
