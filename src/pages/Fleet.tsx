import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cars } from "../constants";

const categories = ["All", "Exotic", "Luxury", "Sports", "SUV"];

export default function Fleet() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || car.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="pt-32 pb-20 px-10 md:px-16 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-black">Our <span className="text-accent italic">Fleet.</span></h1>
            <p className="text-black/40 text-[10px] tracking-widest uppercase">The most exclusive collection in South Florida</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-accent transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search models..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-black/5 border border-black/10 px-12 py-4 text-[10px] uppercase font-bold tracking-widest w-full md:w-[300px] focus:outline-none focus:border-accent transition-all text-black"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-4 text-[9px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                    category === cat 
                    ? "bg-accent border-accent text-white" 
                    : "bg-black/5 border-black/10 text-black/40 hover:border-black/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                layout
                key={car.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white border border-black/5 rounded-sm overflow-hidden hover:border-accent/30 transition-all duration-500 cursor-pointer"
                onClick={() => navigate(`/fleet/${car.slug}`)}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-black">{car.category}</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                    From ${car.price}/day
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-black group-hover:text-accent transition-colors">{car.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {car.hasInsurance ? (
                          <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-green-600">
                             Insurance Vehicles
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-orange-600">
                             Non Insurance Vehicles
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-10 h-10 border border-black/5 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all text-black group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-black/5 mb-8">
                    {Object.entries(car.specs).map(([key, val], i) => (
                      <div key={i}>
                        <p className="text-[8px] uppercase tracking-widest text-black/30 mb-1">{key}</p>
                        <p className="text-xs font-bold uppercase tracking-tight text-black">{val as string}</p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-4 bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
