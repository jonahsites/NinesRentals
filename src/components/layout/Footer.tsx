import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact-footer" className="relative z-20 bg-white border-t border-black/10 px-10 pt-32 pb-20 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 lg:col-span-1">
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

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Availability</h4>
          <div className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest text-black/50">
            <Link to="/miami-exotic-car-fleet" className="hover:text-black transition-colors">Our Full Collection</Link>
            <Link to="/miami-exotic-car-rentals#services" className="hover:text-black transition-colors">Concierge Services</Link>
            <Link to="/miami-exotic-car-rentals#faq" className="hover:text-black transition-colors">Rental Requirements</Link>
            <Link to="/contact-miami-exotic-cars" className="hover:text-black transition-colors">Book Now</Link>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Contact</h4>
          <div className="flex flex-col gap-6 text-[11px] uppercase tracking-widest text-black/40">
            <p>Miami / Broward / Palm Beach</p>
            <p>@NinesRentals</p>
            <p>MIA / FLL / PBI Airport Service</p>
            <p>South Florida Delivery</p>
          </div>
        </div>

        <div className="bg-black/5 p-10 border border-black/10 rounded-sm">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Reservations</h4>
          <p className="text-sm font-bold mb-6 tracking-widest uppercase text-black">+1 (786) 509-8435</p>
          <a href="tel:7865098435" className="block w-full py-4 border border-accent text-accent text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all text-center">
            Request Inquiry
          </a>
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
