import { MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { cars } from "../../constants";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.vehicle) return;
    
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", vehicle: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <footer id="contact-footer" className="relative z-20 bg-white border-t border-black/10 px-10 pt-32 pb-20 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        <div className="lg:col-span-3">
          <div className="flex flex-col mb-8">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-black leading-none uppercase">NINES<span className="text-accent">RENTALS</span></span>
            <span className="text-[7px] tracking-[0.4em] text-black/50 uppercase font-black text-right">Luxury & Exotic</span>
          </div>
          <p className="text-black/40 text-[11px] leading-relaxed max-w-[240px] uppercase tracking-widest mb-10">
            Premium exotic and luxury vehicles available for daily rentals in Miami.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/NinesRentals" target="_blank" rel="noreferrer" className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-accent transition-all cursor-pointer group">
              <span className="text-[10px] font-bold group-hover:text-accent text-black">IG</span>
            </a>
            <div className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-accent transition-all cursor-pointer group text-black">
              <span className="text-[10px] font-bold group-hover:text-accent">X</span>
            </div>
            <div className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-accent transition-all cursor-pointer group text-black">
              <span className="text-[10px] font-bold group-hover:text-accent">YT</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Availability</h4>
          <div className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest text-black/50">
            <Link to="/fleet" className="hover:text-black transition-colors">Our Full Collection</Link>
            <Link to="/#services" className="hover:text-black transition-colors">Concierge Services</Link>
            <Link to="/#faq" className="hover:text-black transition-colors">Rental Requirements</Link>
            <Link to="/contact-miami-exotic-cars" className="hover:text-black transition-colors">Book Now</Link>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Contact</h4>
          <div className="flex flex-col gap-6 text-[11px] uppercase tracking-widest text-black/40">
            <p>Miami / Broward / Palm Beach</p>
            <p>@NinesRentals</p>
            <p>MIA / FLL / PBI Airport Service</p>
            <p>South Florida Delivery</p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-black/5 p-10 border border-black/10 rounded-sm">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Inquiry Form</h4>
          
          {status === "success" ? (
            <div className="h-full flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Send className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-2 text-black">Inquiry Sent</h3>
              <p className="text-[10px] uppercase tracking-widest text-black/40">Our concierge will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-black/10 px-6 py-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-accent transition-all text-black"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-black/10 px-6 py-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-accent transition-all text-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-black/10 px-6 py-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-accent transition-all text-black"
                />
                <select 
                  required
                  value={formData.vehicle}
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  className="w-full bg-white border border-black/10 px-6 py-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-accent transition-all text-black appearance-none cursor-pointer"
                >
                  <option value="">Vehicle of Interest *</option>
                  {cars.map(car => (
                    <option key={car.id} value={car.name}>{car.name}</option>
                  ))}
                </select>
              </div>
              <textarea 
                placeholder="Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white border border-black/10 px-6 py-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-accent transition-all text-black resize-none"
              />
              <button 
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all ${status === "submitting" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {status === "submitting" ? "Processing..." : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto border-t border-black/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] uppercase tracking-[0.4em] text-black/20">&copy; 2025 NINESRENTALS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-10">
          <Link to="#" className="text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors">Terms of Fleet</Link>
        </div>
      </div>
    </footer>
  );
}
