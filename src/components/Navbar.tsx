import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Collection", href: "/collection" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Skip to Main Content */}
      <a href="#content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-200 bg-accent text-black px-4 py-2 font-bold uppercase tracking-widest text-[10px]">
        Skip to Main Content
      </a>

      {/* Top Banner */}
      <div className="relative z-101 bg-accent/90 text-black px-10 py-2 hidden md:flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <div className="flex gap-8">
          <a href="tel:7865098435" className="flex items-center gap-2 hover:opacity-70 transition-opacity"><Phone size={10} /> +1 (786) 509-8435</a>
          <a href="https://instagram.com/NinesRentals" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity text-black">@NinesRentals</a>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a>
          <span>Miami • Broward • Palm Beach</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 md:top-8 left-0 w-full z-100 flex items-center justify-between px-10 py-10 md:px-16 md:py-6 bg-linear-to-b from-white to-transparent pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center pointer-events-auto"
        >
          <Link to="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-black leading-none uppercase">NINES<span className="text-accent">RENTALS</span></span>
            <span className="text-[7px] tracking-[0.4em] text-black/50 uppercase font-black text-right">Luxury & Exotic</span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-10 pointer-events-auto">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: location.pathname === link.href ? 1 : 0.6 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                to={link.href}
                className={`text-[11px] uppercase tracking-[0.1em] font-bold text-black transition-opacity cursor-pointer ${location.pathname === link.href ? 'border-b border-accent' : ''}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden pointer-events-auto"
        >
          <button onClick={() => setShowMobileMenu(true)}>
            <Menu size={24} className="text-black" />
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-200 bg-white p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-black leading-none uppercase">NINES<span className="text-accent">RENTALS</span></span>
                <span className="text-[7px] tracking-[0.4em] text-black/50 uppercase font-black text-right">Luxury & Exotic</span>
              </div>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 border border-black/10 rounded-full">
                <X size={24} className="text-black" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className="text-4xl font-bold uppercase tracking-tighter text-black hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-black/5">
              <div className="flex flex-col gap-4">
                <a href="tel:7865098435" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40"><Phone size={14} /> +1 (786) 509-8435</a>
                <a href="https://instagram.com/NinesRentals" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40">@NinesRentals</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
