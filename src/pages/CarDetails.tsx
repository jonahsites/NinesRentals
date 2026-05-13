import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Clock, ArrowUpRight, Phone, MapPin } from "lucide-react";
import { cars } from "../constants";

export default function CarDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: ""
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.phone) return;
    setBookingStatus("submitting");
    setTimeout(() => {
      console.log("Booking Request:", { ...bookingData, car: car?.name });
      setBookingStatus("success");
    }, 1500);
  };

  useEffect(() => {
    if (!car) {
      navigate("/miami-exotic-car-fleet");
      return;
    }
    window.scrollTo(0, 0);

    // Dynamic Meta
    let title = `${car.name} Rental in Miami | NINESRENTALS`;
    let description = `Rent the ${car.name} in Miami. Premium exotic and luxury car rental with delivery across South Florida. Book your dream car today.`;

    if (car.slug === "miami-lamborghini-huracan-rental") {
      title = "Lamborghini Huracan Rental in Miami | Exotic Supercar Hire";
      description = "Rent a Lamborghini Huracan in Miami and experience pure performance and luxury. Daily exotic car rental with delivery to Miami Beach, hotels, and airport.";
    } else if (car.slug === "miami-ferrari-f8-rental") {
      title = "Ferrari F8 Rental Miami | Luxury Ferrari Supercar Hire";
      description = "Drive a Ferrari F8 in Miami with premium exotic car rental service. Fast, stylish, and unforgettable supercar experience delivered anywhere in Miami.";
    } else if (car.slug === "miami-rolls-royce-cullinan-rental") {
      title = "Rolls-Royce Cullinan Rental Miami | Ultra Luxury SUV Hire";
      description = "Rent a Rolls-Royce Cullinan in Miami for the ultimate luxury experience. Perfect for events, business, or VIP travel with white-glove delivery service.";
    } else if (car.slug === "miami-mclaren-720s-rental") {
      title = "McLaren 720S Rental Miami | High-Performance Exotic Car Hire";
      description = "Experience the McLaren 720S in Miami with powerful performance and sleek design. Exotic car rental with flexible booking and Miami delivery available.";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
  }, [car, navigate]);

  if (!car) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.allImages.length) % car.allImages.length);
  };

  return (
    <div className="pt-32 pb-20 px-10 md:px-16 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <Link 
          to="/miami-exotic-car-fleet" 
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-accent transition-colors mb-12"
        >
          <ChevronLeft size={14} /> Back to Fleet
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Images */}
          <div className="w-full lg:w-[60%] aspect-16/10 lg:aspect-auto lg:h-[700px] relative bg-luxury-black overflow-hidden group rounded-sm border border-black/5">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={car.allImages[currentImageIndex]} 
                alt={car.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {/* Image Navigation */}
            <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={handlePrevImage} className="p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all">
                  <ChevronLeft size={24} />
               </button>
               <button onClick={handleNextImage} className="p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all">
                  <ChevronRight size={24} />
               </button>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 p-4 bg-black/20 backdrop-blur-md rounded-full">
              {car.allImages.map((img: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-12 h-8 rounded-sm overflow-hidden border-2 transition-all ${currentImageIndex === i ? 'border-accent scale-110' : 'border-white/20 opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Details & Booking */}
          <div className="w-full lg:w-[40%] flex flex-col text-black">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{car.category}</span>
                <div className="w-1 h-1 bg-black/20 rounded-full" />
                {car.hasInsurance ? (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 font-sans">Insurance Vehicles</span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 font-sans">Non Insurance Vehicles</span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">{car.name}</h1>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black">${car.price}</span>
                <span className="text-[10px] uppercase tracking-widest text-black/40 mb-2">/ Day Rental</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12 py-10 border-y border-black/10">
              {Object.entries(car.specs).map(([key, val], i) => (
                <div key={i}>
                  <p className="text-[9px] uppercase tracking-widest text-black/30 mb-2 font-bold">{key}</p>
                  <p className="text-sm font-bold uppercase tracking-tight">{val as string}</p>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 text-black/50">Experience Highlights</h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: CheckCircle2, text: "Complimentary Delivery within 15 miles" },
                  { icon: ShieldCheck, text: "Full Sanitization Before Pickup" },
                  { icon: Clock, text: "24/7 Professional Support" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={16} className="text-accent" strokeWidth={3} />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-black/60">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-6">
              <button 
                onClick={() => setBookingModal(true)}
                className="flex items-center justify-center gap-3 w-full py-6 bg-accent text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
              >
                Book This Vehicle <ArrowUpRight size={16} />
              </button>
              
              <a 
                href={`https://wa.me/17865098435?text=I'm%20interested%20in%20renting%20the%20${car.name}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-6 border border-black/10 text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
              >
                Inquire via WhatsApp
              </a>
              
              <div className="p-8 bg-black/[0.02] border border-black/5 rounded-sm">
                <p className="text-[11px] leading-relaxed text-black/50 uppercase tracking-widest">
                  Ready to book? At NinesRentals, we make it simple. No upfront payments required. Pay in person at delivery or pickup. Trust and reliability are our core values.
                </p>
              </div>

              <p className="text-[9px] text-center uppercase tracking-widest text-black/30">
                * refundable damage deposit of $500–$1000 required in person
              </p>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {bookingModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBookingModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-lg p-10 md:p-16 border border-black/10 rounded-sm shadow-2xl"
              >
                <button 
                  onClick={() => setBookingModal(false)}
                  className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="mb-10 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Reservation / {car.name}</span>
                  <h3 className="text-3xl font-bold uppercase tracking-tighter text-black">Booking Request</h3>
                </div>

                {bookingStatus === "success" ? (
                  <div className="py-10 text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="text-accent" size={40} />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Request Received</h4>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 leading-relaxed mb-10">Our concierge team has received your request for the {car.name}. We will contact you at the phone number provided within 30 minutes.</p>
                    <button 
                      onClick={() => setBookingModal(false)}
                      className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={bookingData.name}
                            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                            className="w-full bg-black/5 border border-black/5 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Phone Number *</label>
                          <input 
                            type="tel" 
                            required
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                            className="w-full bg-black/5 border border-black/5 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                            placeholder="+1 (---) --- ----"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-black/40 ml-1">Preferred Pickup Date</label>
                        <input 
                          type="date" 
                          required
                          value={bookingData.date}
                          onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                          className="w-full bg-black/5 border border-black/5 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={bookingStatus === "submitting"}
                      className={`w-full py-6 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all ${bookingStatus === "submitting" ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {bookingStatus === "submitting" ? "Processing..." : "Complete Booking"}
                    </button>
                    
                    <p className="text-[9px] text-center uppercase tracking-widest text-black/30 leading-loose">
                      By clicking complete, you agree to be contacted via text or phone regarding this rental.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
