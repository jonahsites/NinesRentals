import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-20 bg-white border-t border-black/10 px-10 pt-32 pb-20 md:px-16">
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
            <a href="https://instagram.com/NinesRentals" target="_blank" rel="noreferrer" className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-accent transition-editorial cursor-pointer group">
              <span className="text-[10px] font-bold group-hover:text-accent text-black">IG</span>
            </a>
            <div className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-accent transition-editorial cursor-pointer group text-black">
              <span className="text-[10px] font-bold group-hover:text-accent">X</span>
            </div>
            <div className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-accent transition-editorial cursor-pointer group text-black">
              <span className="text-[10px] font-bold group-hover:text-accent">YT</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Availability</h4>
          <div className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest text-black/50">
            <Link to="/collection" className="hover:text-black transition-colors text-black/50">Our Full Collection</Link>
            <Link to="/services" className="hover:text-black transition-colors text-black/50">Concierge Services</Link>
            <Link to="/faq" className="hover:text-black transition-colors text-black/50">Rental Requirements</Link>
            <Link to="/contact" className="hover:text-black transition-colors text-black/50">Book Now</Link>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Contact</h4>
          <div className="flex flex-col gap-6 text-[11px] uppercase tracking-widest text-black/40">
            <p className="m-0">Miami / Broward / Palm Beach</p>
            <p className="m-0">@NinesRentals</p>
            <p className="m-0">MIA / FLL / PBI Airport Service</p>
            <p className="m-0">South Florida Delivery</p>
          </div>
        </div>

        <div className="bg-black/5 p-10 border border-black/10 rounded-sm">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Reservations</h4>
          <p className="text-sm font-bold mb-6 tracking-widest uppercase text-black m-0">+1 (786) 509-8435</p>
          <Link 
            to="/contact"
            className="block text-center w-full py-4 border border-accent text-accent text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all"
          >
            Request Inquiry
          </Link>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto border-t border-black/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] uppercase tracking-[0.4em] text-black/20 m-0">&copy; {new Date().getFullYear()} NINESRENTALS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-10">
          <Link to="/privacy" className="text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors">Terms of Fleet</Link>
        </div>
      </div>
    </footer>
  );
}
