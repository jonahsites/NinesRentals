import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search, Filter } from 'lucide-react';

const categories = ["All", "Ferrari", "Lamborghini", "Rolls Royce", "Porsche", "McLaren", "Bugatti", "Corvette", "Mercedes", "Cadillac"];

const cars = [
  { id: 1, name: "Corvette C8 Eray", category: "Corvette", price: 695, hp: 655, speed: "183 MPH", image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Corvette-C8-ERAY/i-VQPCwzd/0/KQGQsNKcPn3xCtgJLsVtN38snRnvVt6Nh6zxxfbtt/L/IMG_2922-L.jpg" },
  { id: 2, name: "2023 Porsche Turbo Stage 3", category: "Porsche", price: 895, hp: 750, speed: "205 MPH", image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/2023-Porsche-Turbo-Stage-3/i-nLZcLRc/0/NH59JFj78psJWnsHm8xsCk8KBrVDJhpx7thCvL6kL/XL/63f6fa50-a037-4839-8a90-b3d4ec3cab96.-XL.jpg" },
  { id: 3, name: "Mercedes Benz s580 Maybach", category: "Mercedes", price: 995, hp: 496, speed: "155 MPH", image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Mercedes-Benz-s580-Maybach/i-ncQR6Cc/0/KLcJCfBVFKFJw4WMXx7Cg9VmtR7vsNtw9qChvBqSG/X2/R4wNCzt-0%2521largestimage%253FMaxSiz-X2.jpg" },
  { id: 4, name: "Huracan EVO", category: "Lamborghini", price: 1195, hp: 640, speed: "202 MPH", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Lamborghini Urus Performante", category: "Lamborghini", price: 1295, hp: 657, speed: "190 MPH", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "RR Dawn Black Badge", category: "Rolls Royce", price: 1495, hp: 593, speed: "155 MPH", image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Ferrari Purosangue", category: "Ferrari", price: 1895, hp: 715, speed: "193 MPH", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "McLaren 750s", category: "McLaren", price: 1595, hp: 740, speed: "206 MPH", image: "https://images.unsplash.com/photo-1621135802920-133df287f2a6?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "Bugatti Chiron", category: "Bugatti", price: 24995, hp: 1479, speed: "261 MPH", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "Ferrari Novitech 812 Superfast", category: "Ferrari", price: 1695, hp: 800, speed: "211 MPH", image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800" },
  { id: 11, name: "Aventador SVJ Roadster", category: "Lamborghini", price: 2995, hp: 759, speed: "217 MPH", image: "https://images.unsplash.com/photo-1608508644127-ba99d77ee8f0?auto=format&fit=crop&q=80&w=800" },
  { id: 12, name: "Ferrari SF90", category: "Ferrari", price: 2495, hp: 986, speed: "211 MPH", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800" },
  { id: 13, name: "Escalade W / Stars", category: "Cadillac", price: 595, hp: 420, speed: "130 MPH", image: "https://images.unsplash.com/photo-1604054945110-67e411b95ff8?auto=format&fit=crop&q=80&w=800" },
  { id: 14, name: "RR Cullinan", category: "Rolls Royce", price: 1295, hp: 563, speed: "155 MPH", image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800" },
  { id: 15, name: "Ferrari Portofino", category: "Ferrari", price: 995, hp: 591, speed: "199 MPH", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800" },
  { id: 16, name: "McLaren 570s", category: "McLaren", price: 895, hp: 562, speed: "204 MPH", image: "https://images.unsplash.com/photo-1621135802920-133df287f2a6?auto=format&fit=crop&q=80&w=800" },
  { id: 17, name: "2020 Lambo Urus White Panda", category: "Lamborghini", price: 1195, hp: 641, speed: "190 MPH", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" },
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
      className="fixed inset-0 z-[200] bg-white overflow-y-auto px-6 py-10 md:px-16 text-black"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <div className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold mb-4">NinesRentals Collection</div>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-black">
              The <span className="text-black/5 text-outline">Full</span> <br/> Fleet.
            </h2>
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 max-w-md">
              Note: Some vehicles may not be displayed on our website. For additional availability or exclusive bookings, please contact us directly.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 border border-black/10 rounded-full hover:bg-black/5 transition-colors pointer-events-auto text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16 border-b border-black/5 pb-10">
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat ? 'bg-accent text-white shadow-lg' : 'bg-black/5 border border-black/10 text-black/40 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={16} />
            <input 
              type="text"
              placeholder="Search by model name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-sm py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-accent/40 placeholder:text-black/20 text-black"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white border border-black/5 hover:border-accent/20 transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 border border-black/10 rounded-sm">
                    <span className="text-[10px] font-bold text-accent">${car.price}/D</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8">
                  <div className="text-[9px] uppercase tracking-widest text-black/30 mb-2">{car.category}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors text-black">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
                    <div>
                      <div className="text-[9px] uppercase text-black/20 tracking-widest mb-1">Horsepower</div>
                      <div className="text-sm font-bold tracking-tighter text-black">{car.hp} HP</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-black/20 tracking-widest mb-1">Max Speed</div>
                      <div className="text-sm font-bold tracking-tighter text-black">{car.speed}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                
                <button className="absolute bottom-8 right-8 w-10 h-10 bg-accent text-white rounded-sm flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all delay-100 focus:outline-none">
                  <ArrowUpRight size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border-t border-black/5 pt-10 pb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 text-center">
            Prices may vary depending on rental duration, insurance qualification, and age requirements.
          </p>
        </div>

        {filteredCars.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-black/20 uppercase tracking-[0.5em] text-xs">No matching vehicles found in our collection.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Inventory;
