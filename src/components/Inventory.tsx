import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search, Filter } from 'lucide-react';

const categories = ["All", "Lamborghini", "Bentley", "Rolls Royce", "Mercedes", "BMW", "Corvette", "Tesla", "Cadillac", "Audi", "Toyota"];

const cars = [
  { id: 1, name: "Lamborghini Huracan Performante", category: "Lamborghini", price: 1495, hp: 631, speed: "201 MPH", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Miami Blue Lamborghini Urus", category: "Lamborghini", price: 1195, hp: 641, speed: "190 MPH", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Bentley Continental GT", category: "Bentley", price: 1195, hp: 626, speed: "207 MPH", image: "https://images.unsplash.com/photo-1621135802920-133df287f2a6?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Grey Lamborghini Urus", category: "Lamborghini", price: 1195, hp: 641, speed: "190 MPH", image: "https://images.unsplash.com/photo-1608508644127-ba99d77ee8f0?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Rolls Royce Ghost", category: "Rolls Royce", price: 995, hp: 563, speed: "155 MPH", image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Mercedes G Wagon", category: "Mercedes", price: 895, hp: 577, speed: "149 MPH", image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Maybach S650", category: "Maybach", price: 895, hp: 621, speed: "155 MPH", image: "https://images.unsplash.com/photo-1606148301667-463878b3112b?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Mercedes S580", category: "Mercedes", price: 795, hp: 496, speed: "155 MPH", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "BMW 760I", category: "BMW", price: 795, hp: 536, speed: "155 MPH", image: "https://images.unsplash.com/photo-1555215695-300498bba535?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "Corvette C8 Lambo Doors", category: "Corvette", price: 595, hp: 495, speed: "194 MPH", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800" },
  { id: 11, name: "BMW M4 Comp Convertible", category: "BMW", price: 595, hp: 503, speed: "180 MPH", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800" },
  { id: 12, name: "BMW M4 Comp x Drive Convertible", category: "BMW", price: 595, hp: 503, speed: "180 MPH", image: "https://images.unsplash.com/photo-1619330606963-71cd6dc34e5a?auto=format&fit=crop&q=80&w=800" },
  { id: 13, name: "Black Cybertruck", category: "Tesla", price: 545, hp: 845, speed: "130 MPH", image: "https://images.unsplash.com/photo-1617788138017-80ad42243c2d?auto=format&fit=crop&q=80&w=800" },
  { id: 14, name: "BMW M4 Comp", category: "BMW", price: 545, hp: 503, speed: "180 MPH", image: "https://images.unsplash.com/photo-1603811410716-86737c35ac8d?auto=format&fit=crop&q=80&w=800" },
  { id: 15, name: "Yellow Corvette C8 Convertible", category: "Corvette", price: 545, hp: 495, speed: "194 MPH", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800" },
  { id: 16, name: "Orange Corvette C8 Convertible", category: "Corvette", price: 545, hp: 495, speed: "194 MPH", image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800" },
  { id: 17, name: "Red Corvette C8 Convertible", category: "Corvette", price: 545, hp: 495, speed: "194 MPH", image: "https://images.unsplash.com/photo-1594731802111-0739e821c99c?auto=format&fit=crop&q=80&w=800" },
  { id: 18, name: "Corvette C8 70th Anniversary", category: "Corvette", price: 495, hp: 495, speed: "194 MPH", image: "https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?auto=format&fit=crop&q=80&w=800" },
  { id: 19, name: "BMW M2 Comp", category: "BMW", price: 495, hp: 405, speed: "174 MPH", image: "https://images.unsplash.com/photo-1600706432502-77a0e2e327fc?auto=format&fit=crop&q=80&w=800" },
  { id: 20, name: "Cadillac Escalade", category: "Cadillac", price: 495, hp: 420, speed: "130 MPH", image: "https://images.unsplash.com/photo-1604054945110-67e411b95ff8?auto=format&fit=crop&q=80&w=800" },
  { id: 21, name: "Red Corvette C8", category: "Corvette", price: 495, hp: 495, speed: "194 MPH", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800" },
  { id: 22, name: "BMW I8", category: "BMW", price: 495, hp: 369, speed: "155 MPH", image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=800" },
  { id: 23, name: "Supra GR", category: "Toyota", price: 445, hp: 382, speed: "155 MPH", image: "https://images.unsplash.com/photo-1634063261765-b3e1003f9091?auto=format&fit=crop&q=80&w=800" },
  { id: 24, name: "Audi RS3", category: "Audi", price: 445, hp: 401, speed: "180 MPH", image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800" },
];

interface InventoryProps {
  onClose: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCars = cars.filter(car => 
    (activeCategory === "All" || car.category === activeCategory) &&
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-luxury-black overflow-y-auto px-6 py-10 md:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <div className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold mb-4">NineRentals Collection</div>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
              The <span className="text-white/20 text-outline">Full</span> <br/> Fleet.
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors pointer-events-auto"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16 border-b border-white/5 pb-10">
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat ? 'bg-accent text-black' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input 
              type="text"
              placeholder="Search by model name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-accent/40 placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#111112] border border-white/5 hover:border-accent/20 transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm">
                    <span className="text-[10px] font-bold text-accent">${car.price}/D</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">{car.category}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                    <div>
                      <div className="text-[9px] uppercase text-white/20 tracking-widest mb-1">Horsepower</div>
                      <div className="text-sm font-bold tracking-tighter">{car.hp} HP</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-white/20 tracking-widest mb-1">Max Speed</div>
                      <div className="text-sm font-bold tracking-tighter">{car.speed}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                
                <button className="absolute bottom-8 right-8 w-10 h-10 bg-accent text-black rounded-sm flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all delay-100">
                  <ArrowUpRight size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 uppercase tracking-[0.5em] text-xs">No matching vehicles found in our Florida collection.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Inventory;
