import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname, hash]);

  return (
    <div className="relative bg-white font-sans selection:bg-accent selection:text-white min-h-screen">
      <Navbar />
      
      {/* Grid Lines */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full border-x border-black mx-auto max-w-[1400px] flex justify-between">
          <div className="border-r border-black h-full w-1/4" />
          <div className="border-r border-black h-full w-1/4" />
          <div className="border-r border-black h-full w-1/4" />
        </div>
      </div>

      <div className="pt-0 md:pt-0">
        {children}
      </div>

      <Footer />
    </div>
  );
}
