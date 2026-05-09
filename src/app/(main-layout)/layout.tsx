import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/module/chat/ChatBot";
import WhatsAppButton from "@/components/module/chat/WhatsAppButton";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
      <ChatBot />
      <WhatsAppButton />
    </>
  );
}
