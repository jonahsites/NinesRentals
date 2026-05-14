import { motion } from "motion/react";
import SEO from "../components/SEO";
import Inventory from "../components/Inventory";

export default function Collection() {
  return (
    <>
      <SEO 
        title="Our Collection | Luxury & Exotic Car Fleet Miami"
        description="Explore our full collection of luxury and exotic vehicles available for rent in Miami. From Lamborghini to Rolls Royce, find your dream car at NinesRentals."
      />
      
      <div className="pt-40">
        <section className="px-10 md:px-16 max-w-[1400px] mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">The Stable</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none mb-8 text-black">
              Elite <span className="text-accent italic">Inventory.</span>
            </h1>
            <p className="text-black/40 text-sm tracking-widest uppercase mb-12">Pure Performance & Unmatched Luxury</p>
          </motion.div>
        </section>

        {/* Since Inventory.tsx is likely a modal/overlay in the original design, 
            I'll use it as a component here. 
            However, I need to check if it's designed to be used in-place.
            The original App.tsx showed/hid it with state.
        */}
        <div className="min-h-screen">
          <Inventory standalone={true} />
        </div>
      </div>
    </>
  );
}
