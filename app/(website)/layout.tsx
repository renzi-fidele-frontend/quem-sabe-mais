import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
   return (
      <>
         <Header />
         <main>{children}</main>
         <Footer />
      </>
   );
}
