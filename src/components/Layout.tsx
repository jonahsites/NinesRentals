import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative bg-white font-sans selection:bg-accent selection:text-white min-h-screen">
      <Navbar />
      <main id="content">
        <Outlet />
      </main>
      <Footer />

      {/* Grid Lines Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full border-x border-black mx-auto max-w-[1400px] flex justify-between">
          <div className="border-r border-black h-full w-1/4" />
          <div className="border-r border-black h-full w-1/4" />
          <div className="border-r border-black h-full w-1/4" />
        </div>
      </div>
    </div>
  );
}
