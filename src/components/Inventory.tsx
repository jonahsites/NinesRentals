import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search, Filter, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { db, auth, signInWithGoogle } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { format, isWithinInterval, parseISO, isAfter, isBefore, startOfDay } from 'date-fns';

const categories = ["All", "Ferrari", "Lamborghini", "Rolls Royce", "Porsche", "McLaren", "Bugatti", "Corvette", "Mercedes", "Cadillac"];

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  hp: number;
  speed: string;
  image: string;
  gallery?: string[];
  description?: string;
}

const cars: Car[] = [
  { 
    id: 1, 
    name: "Corvette C8 Eray", 
    category: "Corvette", 
    price: 695, 
    hp: 655, 
    speed: "183 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Corvette-C8-ERAY/i-VQPCwzd/0/KQGQsNKcPn3xCtgJLsVtN38snRnvVt6Nh6zxxfbtt/L/IMG_2922-L.jpg",
    gallery: [
      "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Corvette-C8-ERAY/i-VQPCwzd/0/KQGQsNKcPn3xCtgJLsVtN38snRnvVt6Nh6zxxfbtt/L/IMG_2922-L.jpg",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621135802920-133df287f2a6?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The Corvette C8 Eray is a masterpiece of American engineering, combining a powerful V8 with an electric motor for all-wheel-drive performance that redefines the supercar experience."
  },
  { 
    id: 2, 
    name: "2023 Porsche Turbo Stage 3", 
    category: "Porsche", 
    price: 895, 
    hp: 750, 
    speed: "205 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/2023-Porsche-Turbo-Stage-3/i-nLZcLRc/0/NH59JFj78psJWnsHm8xsCk8KBrVDJhpx7thCvL6kL/XL/63f6fa50-a037-4839-8a90-b3d4ec3cab96.-XL.jpg",
    gallery: [
      "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/2023-Porsche-Turbo-Stage-3/i-nLZcLRc/0/NH59JFj78psJWnsHm8xsCk8KBrVDJhpx7thCvL6kL/XL/63f6fa50-a037-4839-8a90-b3d4ec3cab96.-XL.jpg"
    ],
    description: "Stage 3 tuning takes this Porsche Turbo to new heights of performance. Refined, relentless, and remarkably fast."
  },
  { 
    id: 3, 
    name: "Mercedes Benz s580 Maybach", 
    category: "Mercedes", 
    price: 995, 
    hp: 496, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Mercedes-Benz-s580-Maybach/i-ncQR6Cc/0/KLcJCfBVFKFJw4WMXx7Cg9VmtR7vsNtw9qChvBqSG/X2/R4wNCzt-0%2521largestimage%253FMaxSiz-X2.jpg",
    gallery: [
      "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Mercedes-Benz-s580-Maybach/i-ncQR6Cc/0/KLcJCfBVFKFJw4WMXx7Cg9VmtR7vsNtw9qChvBqSG/X2/R4wNCzt-0%2521largestimage%253FMaxSiz-X2.jpg"
    ],
    description: "The pinnacle of luxury. The s580 Maybach offers an unparalleled level of comfort and state-of-the-art technology for a truly executive experience."
  },
  { 
    id: 4, 
    name: "Huracan EVO", 
    category: "Lamborghini", 
    price: 1195, 
    hp: 640, 
    speed: "202 MPH", 
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The Huracan EVO represents the natural evolution of the most successful V10 in Lamborghini history."
  },
  { id: 5, name: "Lamborghini Urus Performante", category: "Lamborghini", price: 1295, hp: 657, speed: "190 MPH", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800", gallery: ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"], description: "The Super SUV that defines luxury performance. More power, less weight, and unparalleled presence." },
  { id: 6, name: "RR Dawn Black Badge", category: "Rolls Royce", price: 1495, hp: 593, speed: "155 MPH", image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800", gallery: ["https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800"] },
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
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Booking States
  const [user, setUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState("");

  // Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Fetch Bookings for Selected Car - Only if user is signed in
  useEffect(() => {
    if (!selectedCar || !user) {
      setExistingBookings([]);
      return;
    }

    const q = query(
      collection(db, 'bookings'),
      where('carId', '==', selectedCar.id),
      where('status', 'in', ['pending', 'confirmed'])
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExistingBookings(bookings);
    });

    return () => unsub();
  }, [selectedCar]);

  // Reset booking form
  useEffect(() => {
    if (selectedCar) {
      setActiveImage(selectedCar.image);
      setStartDate("");
      setEndDate("");
      setBookingStatus('idle');
      setBookingError("");
    } else {
      setActiveImage(null);
    }
  }, [selectedCar]);

  const checkAvailability = () => {
    if (!startDate || !endDate) return true;
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (isBefore(end, start)) return false;
    if (isBefore(start, startOfDay(new Date()))) return false;

    // Check overlaps
    for (const booking of existingBookings) {
      const bStart = parseISO(booking.startDate);
      const bEnd = parseISO(booking.endDate);

      const overlap = 
        isWithinInterval(start, { start: bStart, end: bEnd }) ||
        isWithinInterval(end, { start: bStart, end: bEnd }) ||
        isWithinInterval(bStart, { start, end }) ||
        isWithinInterval(bEnd, { start, end });
      
      if (overlap) return false;
    }
    return true;
  };

  const handleBooking = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    if (!startDate || !endDate) {
      setBookingError("Please select both start and end dates.");
      return;
    }

    if (!checkAvailability()) {
      setBookingError("Selected dates are already booked. Please choose other dates.");
      return;
    }

    setBookingStatus('loading');
    setBookingError("");

    try {
      await addDoc(collection(db, 'bookings'), {
        carId: selectedCar?.id,
        startDate,
        endDate,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        createdAt: serverTimestamp(),
        totalPrice: selectedCar ? selectedCar.price * (Math.max(1, Math.round((parseISO(endDate).getTime() - parseISO(startDate).getTime()) / (1000 * 60 * 60 * 24)))) : 0
      });
      setBookingStatus('success');
    } catch (err) {
      console.error(err);
      setBookingStatus('error');
      setBookingError("Failed to create booking. Please try again.");
    }
  };

  const filteredCars = (cars).filter(car => 
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
        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-white overflow-y-auto px-6 py-10 md:px-16 flex flex-col items-center"
            >
              <div className="max-w-6xl w-full relative">
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-0 right-0 p-4 border border-black/10 rounded-full hover:bg-black/5 transition-colors z-[310]"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
                  {/* Gallery */}
                  <div className="space-y-4">
                    <motion.div 
                      layoutId={`car-image-${selectedCar.id}`}
                      className="aspect-video overflow-hidden border border-black/5 bg-black/5"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={activeImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          src={activeImage || selectedCar.image} 
                          alt={selectedCar.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>
                    </motion.div>
                    <div className="grid grid-cols-4 gap-4">
                      {(selectedCar.gallery || [selectedCar.image]).map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setActiveImage(img)}
                          className={`aspect-video bg-black/5 overflow-hidden border cursor-pointer hover:border-accent/40 transition-all ${activeImage === img ? 'border-accent ring-2 ring-accent/20' : 'border-black/5'}`}
                        >
                          <img 
                            src={img} 
                            alt={`${selectedCar.name} thumbnail ${idx}`} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <div className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-4">{selectedCar.category}</div>
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight mb-8">
                      {selectedCar.name}
                    </h2>
                    
                    <div className="flex items-baseline gap-4 mb-10">
                      <span className="text-3xl font-bold text-black uppercase tracking-tighter">Inquire for Rates</span>
                      <span className="text-black/30 text-[8px] uppercase tracking-widest font-bold">Price Varies</span>
                    </div>

                    <div className="bg-accent/5 border-l-4 border-accent p-6 mb-10">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black leading-relaxed">
                        Rates are tailored to your specific needs. Pricing varies based on rental duration, insurance selection, age, and delivery location. 
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-y border-black/5 py-10 mb-10">
                      <div>
                        <div className="text-[10px] uppercase text-black/40 tracking-[0.2em] font-bold mb-2">Performance</div>
                        <div className="text-xl font-bold tracking-tighter">{selectedCar.hp} Horsepower</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-black/40 tracking-[0.2em] font-bold mb-2">Max Velocity</div>
                        <div className="text-xl font-bold tracking-tighter">{selectedCar.speed}</div>
                      </div>
                    </div>

                    <p className="text-black/60 leading-relaxed mb-12">
                      {selectedCar.description || "Experience the ultimate in automotive excellence with this premium vehicle. Perfectly maintained and ready for your next journey in South Florida."}
                    </p>

                    {/* Booking Form */}
                    <div className="bg-black/5 p-8 border border-black/5 mb-8">
                      <div className="flex items-center gap-2 mb-6 text-accent">
                        <Calendar size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Reserve Your Dates</span>
                      </div>

                      {bookingStatus === 'success' ? (
                        <div className="text-center py-4">
                          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                          <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">Booking Requested!</h4>
                          <p className="text-xs text-black/40 uppercase tracking-widest leading-loose">
                            We've received your request for the {selectedCar.name}. Our team will contact you shortly to finalize details.
                          </p>
                          <button 
                            onClick={() => setSelectedCar(null)}
                            className="mt-6 text-[10px] font-bold uppercase tracking-widest text-accent border-b border-accent"
                          >
                            Return to Fleet
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Pick-up</label>
                              <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Return</label>
                              <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>

                          {bookingError && (
                            <div className="flex items-start gap-2 bg-red-50 text-red-600 p-4 border border-red-100">
                              <Info size={14} className="mt-0.5 shrink-0" />
                              <p className="text-[10px] font-bold leading-tight">{bookingError}</p>
                            </div>
                          )}

                          {existingBookings.length > 0 && (
                            <div className="bg-accent/5 p-4 border border-accent/10">
                              <p className="text-[8px] font-bold uppercase tracking-widest text-accent mb-2">Note: This car is already booked on:</p>
                              <div className="flex flex-wrap gap-2">
                                {existingBookings.map((b, i) => (
                                  <span key={i} className="text-[10px] font-mono text-accent/60 bg-white px-2 py-1 border border-accent/5">
                                    {format(parseISO(b.startDate), 'MMM dd')} - {format(parseISO(b.endDate), 'MMM dd')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <button 
                            onClick={handleBooking}
                            disabled={bookingStatus === 'loading'}
                            className="w-full py-6 bg-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 disabled:bg-black/20"
                          >
                            {bookingStatus === 'loading' ? 'Processing...' : user ? 'Confirm Rental' : 'Sign in to Book'}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between text-[8px] uppercase tracking-[0.2em] font-bold text-black/30">
                      <span>Verified Protection Required</span>
                      <span>MIA / FLL Delivery Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                onClick={() => setSelectedCar(car)}
                className="group relative bg-white border border-black/5 hover:border-accent/20 transition-all overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <motion.img 
                    layoutId={`car-image-${car.id}`}
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 border border-black/10 rounded-sm">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Inquire</span>
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
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent text-center">
            Rates are subject to change and vary based on duration, insurance qualification, age requirements, and seasonality.
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
