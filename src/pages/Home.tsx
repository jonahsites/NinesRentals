import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ChevronRight, Phone, ArrowUpRight, MapPin, Instagram } from "lucide-react";
import Showcase from "../components/Showcase";
import Inventory, { cars } from "../components/Inventory";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const faqItems = [
  { q: "What are the requirements to book?", a: "Must be 18+ with a valid driver’s license 🪪. Active auto insurance required for most vehicles (if you do not have insurance we can still help you out). $500–$1000 refundable damage deposit 💰 (paid in person, not upfront)." },
  { q: "What if I don't have full coverage insurance?", a: "If you don’t have full coverage we can offer you vehicles with no insurance or third party insurance." },
  { q: "Do I still need personal car insurance if I opt in for protection?", a: "No you do not." },
  { q: "Can I add an additional driver to my rental?", a: "Yes you can add an additional driver to your trip." },
  { q: "What if my insurance deductible is over $2,500?", a: "If your deductible is over $2500 it is okay we can take care of you." },
  { q: "Do you have any extra hidden fees?", a: "No extra hidden fees!" },
  { q: "What do I pay upfront?", a: "Nothing Upfront! Pay in person. Trust is #1 at NinesRental." },
  { q: "Do you offer delivery service?", a: "Delivery service is optional and can be done upon request." },
  { q: "How many miles are included with my rental?", a: "Miles depend on which car you would like, just inquire down below and we’ll help you out!" },
  { q: "What is your security deposit policy?", a: "It is held to cover any damages, tickets, or violations. The deposit is refunded after return and inspection, if the vehicle is in the same condition deposit is refunded immediately." },
  { q: "Do you offer pick-up or drop-off outside of business hours?", a: "Yes we offer pickup and drop off at any time!" },
  { q: "Do you offer roadside assistance?", a: "Yes we offer road side assistance, at your convenience." },
  { q: "How soon can I reserve?", a: "You can reserve at any time or just stop by our location." },
  { q: "Do you offer military discount?", a: "Yes military discounts are given, god bless you all who serve this country!" },
];

const specs = [
  { val: "Custom", label: "Rates / Day" },
  { val: "Premium", label: "Collection" },
  { val: "Exotic", label: "Experience" },
  { val: "Faith", label: "Driven" },
];

export default function Home() {
  const [showInventory, setShowInventory] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <>
      <SEO 
        title="Luxury Car Rental Miami | Exotic Rentals NinesRentals"
        description="NinesRentals offers premium luxury and exotic car rentals in Miami, Broward, and Palm Beach. Lamborghini, Rolls Royce, Porsche available. Book your experience today."
        googleVerification="ddciC5avOCI_B7Cwvwfdics5HjjyzW3QrbPRPO-UaYc"
      />

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 min-h-screen overflow-hidden"
      >
        {/* Background large text */}
        <div className="absolute top-[15%] left-[45%] z-0 pointer-events-none select-none">
          <span className="text-[180px] font-black text-black/[0.02] leading-none uppercase">
            EST. 2025
          </span>
        </div>

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-40">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <img
              src="https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/2023-Porsche-Turbo-Stage-3/i-nLZcLRc/0/NH59JFj78psJWnsHm8xsCk8KBrVDJhpx7thCvL6kL/XL/63f6fa50-a037-4839-8a90-b3d4ec3cab96.-XL.jpg"
              alt="NinesRentals Hero"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-b from-white/80 via-transparent to-white" />
          </motion.div>
        </div>

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 px-10 py-10 md:px-16 md:pb-16 max-w-[1400px] mx-auto h-screen items-end">
          {/* Left Section */}
          <div className="flex flex-col justify-end pb-20">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="font-serif text-xs uppercase tracking-[0.5em] text-accent mb-6 leading-none">
                Miami / Broward / Palm Beach
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-[88px] font-bold leading-[0.9] uppercase tracking-[-3px] mb-8 text-black">
                Luxury <span className="text-outline block mt-2">Rentals</span> Made Simple.
              </h1>
              <p className="text-black/60 text-base leading-relaxed max-w-[420px] mb-12 font-light">
                Drive the experience, not just the car. Premium exotic and luxury vehicles available for daily rentals in Miami. Seamless booking, verified renters, and top-tier service built for convenience and trust.
              </p>
              
              <div className="flex items-center gap-8">
                <Link 
                  to="/collection"
                  className="bg-black text-white px-10 py-5 text-sm font-bold uppercase tracking-[0.1em] hover:bg-accent transition-colors pointer-events-auto"
                >
                  View Inventory
                </Link>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-black/30">Scroll to Explore</span>
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-px h-10 bg-accent/40 mx-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Section (Visual + Specs) */}
          <div className="relative flex flex-col justify-end items-end h-full min-h-[400px] pb-20">
            {/* Visual Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-full h-[85%] bg-black/5 border border-black/10 rounded-sm relative overflow-hidden group"
            >
              <div className="w-full h-full relative">
                <iframe 
                  src="https://legacyexotics.smugmug.com/frame/slideshow?key=786XW2&speed=1&transition=fade&autoStart=0&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=1" 
                  width="100%" 
                  height="100%" 
                  frameBorder="no" 
                  scrolling="no"
                  className="w-full h-full"
                  title="Elite Collection Slideshow"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-luxury-black/30 to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-serif italic text-white/5 text-4xl tracking-[0.1em] uppercase group-hover:opacity-0 transition-opacity">
                  Elite Collection
                </span>
              </div>
              
              <div className="absolute top-0 right-0 grid grid-cols-2 bg-white/60 backdrop-blur-md border-l border-b border-black/10 z-10">
                {specs.map((spec, i) => (
                  <div key={i} className="px-6 py-6 w-[130px] border-r border-b border-black/5 last:border-r-0">
                    <p className="font-bold text-lg mb-1 text-black">{spec.val}</p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-black/50">{spec.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Fleet Showcase */}
      <div id="fleet">
        <Showcase />
      </div>

      {/* Special Services Section */}
      <section id="services-preview" className="relative z-20 py-32 bg-white px-10 md:px-16 border-y border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Beyond the Drive</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] text-black">Special <br/> <span className="text-black/10 text-outline">Services.</span></h2>
            </div>
            <p className="text-black/40 text-base leading-relaxed max-w-md font-light">
              At NineRentals, we redefine the art of luxury travel. Whether you're celebrating a special occasion, traveling for work, or enjoying a romantic evening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Photography",
                price: "Inquire",
                desc: "Transform your exotic car experience into a work of art with our exclusive photography package.",
                image: "https://static.wixstatic.com/media/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg/v1/fill/w_614,h_460,fp_0.46_0.67,q_90,enc_avif,quality_auto/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg"
              },
              {
                title: "Personal Chauffeur",
                price: "Inquire",
                desc: "Experience convenience, luxury, and discretion. Available for all vehicles in our fleet.",
                image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Wedding Service",
                price: "Inquire",
                desc: "Celebrate your wedding or honeymoon with sophistication and elite style.",
                image: "https://static.wixstatic.com/media/dfb3c4_b816f5c7099f455b9248cedc8bca48c5~mv2.jpg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/63-DSC05550.jpg"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group border border-white/5 bg-white/[0.02] flex flex-col h-full rounded-sm overflow-hidden hover:border-accent/40 transition-editorial"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors text-black">{service.title}</h3>
                  <p className="text-black/40 text-xs leading-relaxed mb-8 flex-1">{service.desc}</p>
                  <Link 
                    to="/services"
                    className="w-full py-4 border border-black/10 text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all text-center"
                  >
                    Explore Services
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-20 py-32 md:py-48 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-3/4 w-full bg-luxury-grey relative overflow-hidden border border-black/10 group">
              <img 
                src="https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Corvette-C8-ERAY/i-VQPCwzd/0/KQGQsNKcPn3xCtgJLsVtN38snRnvVt6Nh6zxxfbtt/L/IMG_2922-L.jpg" 
                alt="NinesRentals Passion" 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">We Share Your Passion</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-10 text-black">At NinesRentals, <br/> <span className="text-accent italic">Luxury hits different.</span></h2>
            <div className="space-y-6 text-black/60 text-lg leading-relaxed font-light mb-12">
              <p>
                NinesRentals is a premium automotive rental company built on service, reliability, and excellence. We focus on providing a smooth experience for both owners and renters.
              </p>
            </div>
            <Link 
              to="/about"
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b border-accent pb-2 hover:gap-8 transition-all text-black"
            >
              Learn More About Us <ArrowUpRight className="text-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* Local SEO / Areas Served Section */}
      <section className="relative z-20 py-32 bg-black text-white px-10 md:px-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-fixed" />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Our Backyard</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-12">Premier <br/> <span className="text-accent italic">South Florida</span> <br/> Service.</h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-md font-light mb-12">
                We provide white-glove exotic car delivery and pickup services across the Tri-County area. Experience luxury wherever you are.
              </p>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { city: "Miami", areas: ["South Beach", "Brickell", "Wynwood", "Coral Gables"] },
                  { city: "Fort Lauderdale", areas: ["Las Olas", "Hollywood", "Pompano Beach"] },
                  { city: "Palm Beach", areas: ["West Palm", "Boca Raton", "Delray Beach"] },
                  { city: "Sunny Isles", areas: ["Aventura", "Bal Harbour", "Golden Beach"] }
                ].map((region, i) => (
                  <div key={i} className="group">
                    <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-3 border-b border-accent/20 pb-2">{region.city}</p>
                    <ul className="space-y-1">
                      {region.areas.map((area, j) => (
                        <li key={j} className="text-[11px] text-white/30 uppercase tracking-widest">{area}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-white shadow-2xl p-2 rounded-sm rotate-3 group hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Exotic-SUVS/Lamborghini-Urus-Performante/i-h5q9w9S/0/NHqJzBv766Wz65w97q58XJ7hP7v7S7R5qP7Z/XL/IMG_0123-XL.jpg" 
                  alt="Miami Luxury Service Area" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md px-6 py-4 flex flex-col -rotate-3">
                  <span className="text-accent font-bold text-lg">24/7</span>
                  <span className="text-white text-[8px] uppercase tracking-widest">Doorstep Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-20 py-32 bg-white px-10 md:px-16" id="faq">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Support</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-8 text-black">Frequently <br/> <span className="text-black/10 text-outline">Asked.</span></h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.slice(0, 6).map((faq, i) => (
              <div key={i} className="group border border-black/5 bg-black/[0.02] overflow-hidden transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center gap-4"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black group-hover:text-accent transition-colors">{faq.q}</span>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <p className="text-black/40 text-[11px] leading-relaxed border-t border-black/5 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / SEO Section */}
      <footer className="relative z-20 bg-white border-t border-black/5 pt-32 pb-16 px-10 md:px-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
          <span className="text-[300px] font-bold text-black uppercase leading-[0.8] block -ml-20">NINES</span>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Info */}
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter uppercase mb-8">NinesRentals.</span>
              <p className="text-black/40 text-sm leading-relaxed mb-8 max-w-xs italic">
                "God is good all the time." More than just a rental agency, we are a lifestyle brand committed to excellence and integrity in the heart of Miami.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/NinesRentals" target="_blank" rel="noreferrer" className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20 mb-8">Experience</h4>
              <ul className="space-y-4">
                {["Home", "Collection", "Services", "About", "Blog", "Contact"].map((link) => (
                  <li key={link}>
                    <Link to={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="text-sm font-bold uppercase tracking-tight text-black hover:text-accent transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20 mb-8">Services</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-tight text-black/60">
                <li>Exotic Rental</li>
                <li>Private Chauffeur</li>
                <li>Wedding Transport</li>
                <li>Aero Photography</li>
                <li>Vip Concierge</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20 mb-8">Inquiries</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone size={14} className="text-accent" />
                  <a href="tel:7865098435" className="text-md font-bold tracking-tight text-black">+1 (786) 509-8435</a>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={14} className="text-accent" />
                  <span className="text-md font-bold tracking-tight text-black">Miami, South Florida</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
              © 2025 NinesRentals / Built for Excellence.
            </p>
            <div className="flex gap-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Privacy Policy</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Fleet Overlay */}
      <AnimatePresence>
        {showInventory && (
          <Inventory onClose={() => setShowInventory(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
