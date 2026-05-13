import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Phone, MapPin, ChevronRight, CheckCircle2, ShieldCheck, Clock, Zap, Heart, Smartphone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Showcase from "../components/Showcase";
import { cars } from "../constants";
import { supabase } from "../lib/supabase";

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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative">
      {/* Skip to Main Content */}
      <a href="#content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-200 bg-accent text-black px-4 py-2 font-bold uppercase tracking-widest text-[10px]">
        Skip to Main Content
      </a>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 min-h-screen overflow-hidden"
      >
        <div className="absolute top-[15%] left-[45%] z-0 pointer-events-none select-none">
          <span className="text-[180px] font-black text-black/[0.02] leading-none uppercase">
            EST. 2025
          </span>
        </div>

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

        <main id="content" className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 px-10 py-10 md:px-16 md:pb-16 max-w-[1400px] mx-auto h-screen items-end">
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
                Exotic <span className="text-outline block mt-2">Rentals</span> Miami.
              </h1>
              <p className="text-black/60 text-base leading-relaxed max-w-[420px] mb-12 font-light">
                Drive the extraordinary with Miami's premier exotic car rental service. Specializing in Lamborghini, Ferrari, McLaren, and Rolls-Royce rentals. Experience precision, luxury, and thrill on every Miami road.
              </p>
              
              <div className="flex items-center gap-8">
                <Link 
                  to="/miami-exotic-car-fleet"
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

          <div className="relative flex flex-col justify-end items-end h-full min-h-[400px] pb-20">
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
                  <div key={i} className="px-6 py-6 w-[130px] border-r border-b border-black/5 last:border-r-0 text-black">
                    <p className="font-bold text-lg mb-1">{spec.val}</p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-black/50">{spec.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </motion.div>

      <div id="fleet">
        <Showcase />
      </div>

      <section id="services" className="relative z-20 py-32 bg-white px-10 md:px-16 border-y border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Beyond the Drive</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] text-black">Special <br/> <span className="text-black/10 text-outline">Services.</span></h2>
            </div>
            <p className="text-black/40 text-base leading-relaxed max-w-md font-light">
              At NineRentals, we redefine the art of luxury travel. Whether you're celebrating a special occasion, traveling for work, or enjoying a romantic evening, our premium vehicle services are designed to elevate any event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Photography",
                price: "Inquire",
                desc: "Transform your exotic car experience into a work of art with our exclusive photography package.",
                features: ["10 professionally edited pictures", "Desired location within 15 miles", "1 hour session"],
                image: "https://static.wixstatic.com/media/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg/v1/fill/w_614,h_460,fp_0.46_0.67,q_90,enc_avif,quality_auto/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg"
              },
              {
                title: "Professional Filming",
                price: "Inquire",
                desc: "Capture every thrilling moment of your vehicle in action, highlighting its power and design.",
                features: ["2 30 second edited films", "Desired location within 15 miles", "2 hour session"],
                image: "https://static.wixstatic.com/media/dfb3c4_0fd7d8ad30e046cd8149d8b77cd62c79~mv2.jpeg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Roller%20Pics_JPEG.jpeg"
              },
              {
                title: "Romantic Package",
                price: "Inquire",
                desc: "Date night with a touch of class. Includes permanent lasting silk roses and designer paper.",
                features: ["25 to 100 rose bouquets", "Designer paper choice", "Custom arrangement"],
                image: "https://static.wixstatic.com/media/dfb3c4_7a86fdd0aff84dcb8f313194dae7f4cd~mv2.jpg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/46-DSC05487_edited.jpg"
              },
              {
                title: "Personal Chauffeur",
                price: "Inquire",
                desc: "Experience convenience, luxury, and discretion. Available for all vehicles in our fleet.",
                features: ["3 Hour Minimum", "Executive transportation", "Custom routes"],
                image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Wedding Service",
                price: "Inquire",
                desc: "Celebrate your wedding or honeymoon with sophistication and elite style.",
                features: ["Customizable wedding bouquet", "Honeymoon transport", "Sophisticated service"],
                image: "https://static.wixstatic.com/media/dfb3c4_b816f5c7099f455b9248cedc8bca48c5~mv2.jpg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/63-DSC05550.jpg"
              },
              {
                title: "VIP Special Services",
                price: "Inquire",
                desc: "Redefining the art of luxury. Contact us to learn more about our custom special services.",
                features: ["Work travel custom needs", "Special occasions", "Bespoke experiences"],
                image: "https://static.wixstatic.com/media/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg/v1/fill/w_980,h_1252,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg"
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
                  <div className="absolute top-4 right-4 bg-accent text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm">
                    {service.price}
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors text-black">{service.title}</h3>
                  <p className="text-black/40 text-xs leading-relaxed mb-8 flex-1">{service.desc}</p>
                  <ul className="space-y-3 mb-10">
                    {service.features.map((feature, j) => (
                      <li key={j} className="text-[10px] uppercase tracking-widest text-black/20 flex items-center gap-3">
                        <div className="w-1 h-1 bg-accent/40 rounded-full" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-4 border border-black/10 text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
                  >
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-20 py-32 md:py-48 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center text-black">
          <div className="relative">
            <div className="aspect-3/4 w-full bg-luxury-grey relative overflow-hidden border border-black/10 group">
              <img 
                src="https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Corvette-C8-ERAY/i-VQPCwzd/0/KQGQsNKcPn3xCtgJLsVtN38snRnvVt6Nh6zxxfbtt/L/IMG_2922-L.jpg" 
                alt="NinesRentals Passion" 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-white via-transparent to-transparent opacity-40" />
            </div>
          </div>

          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">We Share Your Passion</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-10">At NinesRentals, <br/> <span className="text-accent italic">Luxury hits different.</span></h2>
            <div className="space-y-6 text-black/60 text-lg leading-relaxed font-light mb-12">
              <p>
                NinesRentals is a premium automotive rental company built on service, reliability, and excellence. We focus on providing a smooth, professional experience for both owners and renters while maximizing value and opportunity.
              </p>
              <div className="pt-4 border-t border-black/5">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-black opacity-40 italic">
                  Faith-based company. <br/>
                  God is good. Jesus is King.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-12 border-y border-black/10 py-10">
              <div>
                <p className="font-bold text-2xl mb-1 tracking-tighter text-black">Elite</p>
                <p className="text-[10px] uppercase tracking-widest text-black/30">Curated Fleet</p>
              </div>
              <div>
                <p className="font-bold text-2xl mb-1 tracking-tighter text-black">Premium</p>
                <p className="text-[10px] uppercase tracking-widest text-black/30">Florida Experts</p>
              </div>
            </div>
            <Link 
              to="/miami-exotic-car-fleet"
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b border-accent pb-2 hover:gap-8 transition-all"
            >
              Explore Our Collection <ArrowUpRight className="text-accent" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-32 bg-white px-10 md:px-16 overflow-hidden text-black">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">The Ultimate Florida Experience</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-8">Elevate Every <br/> <span className="text-black/10 text-outline">Journey.</span></h2>
            <p className="text-black/60 text-base leading-relaxed mb-10 font-light">
              At NineRentals, we don’t just offer rental cars – we provide an unforgettable experience. Whether you're cruising the iconic streets of Miami, exploring the dynamic landscapes of Fort Lauderdale, or driving through the elegance of Palm Beach, our fleet of premium vehicles ensures you travel in style, comfort, and sophistication.
            </p>
            <div className="flex flex-col gap-6">
              {[
                "Miami Beach City Cruises",
                "Fort Lauderdale Landscapes",
                "Palm Beach's Elegant Roads"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black/80">
                  <div className="w-6 h-[1px] bg-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[500px]">
             <img 
              src="https://static.wixstatic.com/media/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg/v1/fill/w_614,h_460,fp_0.46_0.67,q_90,enc_avif,quality_auto/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg" 
              alt="Ultimate Experience" 
              className="w-full h-full object-cover border border-black/10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 right-10 p-10 bg-white/90 backdrop-blur-xl border border-accent/20 max-w-sm">
                <p className="text-sm font-serif italic text-black/80 mb-4">"Join the ranks of those who choose to drive the extraordinary. Welcome to NineRentals where your luxury journey begins."</p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Drive Extraordinary</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-32 bg-white px-10 md:px-16 text-black">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* How It Works */}
          <div>
            <div className="mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Process</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">How It Works</h2>
                <p className="text-black/40 text-sm tracking-widest uppercase">Easy Steps to Your Dream Car</p>
            </div>
            
            <div className="space-y-12">
              {[
                { step: "01", title: "Select Your Car", desc: "Explore our exclusive collection, select your desired vehicle, and get ready for an unforgettable experience." },
                { step: "02", title: "Quick Booking", desc: "Our simple and secure booking process ensures you're behind the wheel in no time." },
                { step: "03", title: "Enjoy the Drive", desc: "Experience the simplified luxury of renting from NineRentals. Choose, book, and enjoy." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="text-5xl font-black text-black/5 group-hover:text-accent/20 transition-colors duration-500">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-black/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Excellence</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] text-black">Our <br /><span className="text-accent italic">Services.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {[
                { icon: MapPin, title: "Miami-Wide Delivery", desc: "Doorstep delivery to Miami Beach, Wynwood, Coral Gables, and MIA Airport terminals. Wherever you are, we bring the luxury to you." },
                { icon: ShieldCheck, title: "Insurance Solutions", desc: "Flexible options for all renters. Whether you have your own comprehensive coverage or need our assistance, we make the process seamless." },
                { icon: Clock, title: "24/7 Premium Support", desc: "Concierge-level service around the clock. From booking to drop-off, our Miami-based team is always available for your needs." },
                { icon: Zap, title: "Instant Verification", desc: "Fast-tracked verification for exotic car rentals. Skip the paperwork and get behind the wheel of your dream car faster." },
                { icon: Heart, title: "Faith-Driven Excellence", desc: "Built on principles of reliability, trust, and exceptional service. We treat every client like family, ensuring a world-class experience." },
                { icon: Smartphone, title: "Simplified Booking", desc: "A streamlined digital experience designed for the modern Miami traveler. Book your Lamborghini or Ferrari in minutes." },
              ].map((service, i) => (
                <div key={i} className="group">
                  <service.icon size={24} className="mb-4 text-accent grayscale group-hover:grayscale-0 transition-all" strokeWidth={1} />
                  <h3 className="text-sm font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors text-black">{service.title}</h3>
                  <p className="text-black/40 text-[10px] leading-relaxed uppercase tracking-widest font-light">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-32 bg-white px-10 md:px-16 border-t border-black/5" id="faq">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 text-black">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Support</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-8">Frequently <br/> <span className="text-black/10 text-outline">Asked.</span></h2>
            <p className="text-black/40 text-sm leading-relaxed mb-10 font-light">
              Find answers to common questions about our car rental services in South Florida.
            </p>
             <button className="bg-black/5 border border-black/10 px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
                Download PDF Guide
              </button>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((faq, i) => (
              <div 
                key={i} 
                className="group border border-black/5 bg-black/[0.02] overflow-hidden transition-all"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center gap-4"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest group-hover:text-accent transition-colors">{faq.q}</span>
                  <ChevronRight size={14} className={`text-black/20 transition-transform duration-500 ${activeFaq === i ? 'rotate-90' : ''}`} />
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

      <section id="locations" className="relative z-20 py-32 bg-black text-white px-10 md:px-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center mb-20 px-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Ready Where You Are</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-8">Serving All Of <br/> <span className="text-accent italic">South Florida.</span></h2>
          <p className="text-white/40 text-base leading-relaxed max-w-2xl mx-auto font-light">
            We provide doorstep delivery and pickup service across major South Florida locations. Whether you're at the airport, a luxury hotel, or a private villa, we bring the experience to you.
          </p>
        </div>
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Miami Beach", desc: "Ocean Drive & Collins Ave" },
            { name: "Miami Airport", desc: "MIA & Private Jet Terminals" },
            { name: "Downtown Miami", desc: "Business & Art Districts" },
            { name: "Coral Gables", desc: "Elegant Living" },
            { name: "Fort Lauderdale", desc: "Las Olas & Beaches" },
            { name: "Palm Beach", desc: "Luxury & Sophistication" },
            { name: "Boca Raton", desc: "Premium Coastal Driving" },
            { name: "Wynwood", desc: "Miami's Art Scene" }
          ].map((loc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-sm group cursor-default"
            >
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">{loc.name}</h3>
              <p className="text-[9px] uppercase tracking-widest text-white/30">{loc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="blog" className="relative z-20 py-32 bg-white px-10 md:px-16 border-t border-black/5 text-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 px-8 lg:px-0">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Insights & News</span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-none">The <span className="text-accent italic">Journal.</span></h2>
            </div>
            <p className="text-black/40 text-sm max-w-sm font-light leading-relaxed uppercase tracking-widest">
              Tips, guides, and stories from the world of elite automotive culture in Miami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Top 10 Exotic Cars to Rent in Miami",
                desc: "Discover which supercars dominate the streets of Miami Beach this season...",
                tag: "Guides",
                img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Best Driving Routes in Miami for Supercars",
                desc: "From Ocean Drive to the Overseas Highway, these are the routes every driver needs to experience...",
                tag: "Routes",
                img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "How Much Does Exotic Car Rental Cost in Miami?",
                desc: "A complete breakdown of pricing, insurance, and what to expect when booking your dream ride...",
                tag: "Pricing",
                img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
              }
            ].map((post, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-16/10 overflow-hidden mb-8 border border-black/5 bg-black/5 rounded-sm">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 font-sans" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-4 block">{post.tag}</span>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors leading-tight">{post.title}</h3>
                <p className="text-black/40 text-xs leading-relaxed font-light mb-6 line-clamp-2">{post.desc}</p>
                <div className="flex items-center gap-2 text-black text-[9px] font-bold uppercase tracking-widest border-b border-black/5 w-fit pb-1 group-hover:border-accent transition-all">
                  Read Article <ArrowUpRight size={10} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white px-10 md:px-16 overflow-hidden border-y border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">Trusted in Miami</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">500+ successful rentals across Miami Beach & Fort Lauderdale</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <span className="text-xl font-black italic tracking-tighter uppercase">Vogue</span>
             <span className="text-xl font-black italic tracking-tighter uppercase">Forbes</span>
             <span className="text-xl font-black italic tracking-tighter uppercase">Complex</span>
             <span className="text-xl font-black italic tracking-tighter uppercase">GQ</span>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-32 bg-white px-10 md:px-16" id="contact">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 text-black">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Ready to Drive?</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] mb-4">RESERVE YOUR <br/> <span className="text-accent italic">LUXURY RIDE NOW!</span></h2>
            <p className="text-black/40 text-sm tracking-[0.2em] uppercase mb-12">Quick, Simple, and Secure Booking</p>
            
            <div className="space-y-10">
                <div className="flex items-start gap-8">
                  <div className="p-4 bg-black/5 rounded-sm"><Phone size={20} className="text-accent" /></div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-black/30 mb-2">Direct Line</p>
                    <p className="text-xl font-bold tracking-tighter">+1 (786) 509-8435</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="p-4 bg-black/5 rounded-sm"><div className="w-5 h-5 flex items-center justify-center font-bold text-accent text-lg">IG</div></div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-black/30 mb-2">Instagram</p>
                    <p className="text-xl font-bold tracking-tighter">@NinesRentals</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="p-4 bg-black/5 rounded-sm"><MapPin size={20} className="text-accent" /></div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-black/30 mb-2">Service Areas</p>
                    <p className="text-xl font-bold tracking-tighter">Miami, Broward, Palm Beach</p>
                  </div>
                </div>
            </div>
          </div>
 
          <div className="bg-black/[0.02] border border-black/10 p-12 md:p-16 rounded-sm relative">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Reserve Your Vehicle</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-10 block">Get in Touch</p>
            <form 
              className="space-y-8" 
              onSubmit={async (e) => {
                e.preventDefault();
                const target = e.target as any;
                const firstName = target[0].value;
                const lastName = target[1].value;
                const email = target[2].value;
                const phone = target[3].value;
                const vehicle = target[4].value;
                
                if (!firstName || !email || !phone || !vehicle) {
                  alert("Please fill in first name, email, phone, and select a vehicle of interest.");
                  return;
                }

                const submitBtn = e.currentTarget.querySelector('button');
                if (submitBtn) {
                  submitBtn.disabled = true;
                  submitBtn.innerText = "SENDING...";
                }

                try {
                  const { error } = await supabase.from('bookings').insert([{
                    name: `${firstName} ${lastName} (Inquiry: ${vehicle})`,
                    email: email,
                    phone: phone,
                    booking_date: new Date().toISOString().split('T')[0],
                    booking_time: "GENERAL INQUIRY"
                  }]);
                  if (error) throw error;
                  alert("Thank you! We have received your inquiry and will contact you shortly.");
                  target.reset();
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong. Please try again or call us at (786) 509-8435.");
                } finally {
                  if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "SUBMIT";
                  }
                }
              }}
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">First name*</label>
                    <input type="text" className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Last name*</label>
                    <input type="text" className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black" required />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Email*</label>
                  <input type="email" className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black" required />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Phone*</label>
                  <input type="tel" className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black" placeholder="786-000-0000" required />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Vehicle of Interest*</label>
                  <select className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black appearance-none" required>
                    <option value="">Select a vehicle</option>
                    {cars.map(car => (
                      <option key={car.id} value={car.name}>{car.name}</option>
                    ))}
                    <option value="General Inquiry">Other / General Inquiry</option>
                  </select>
               </div>
               <button className="w-full py-6 bg-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-black transition-all">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-32 bg-black/[0.02] backdrop-blur-xs text-black">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 text-center">
            <h2 className="text-6xl md:text-9xl font-black text-black/[0.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none uppercase">Grace</h2>
            <div className="relative z-10 max-w-2xl mx-auto">
                <p className="text-2xl md:text-3xl font-serif leading-relaxed italic mb-8">“God is Good all The time .. All The time god is good 🙏 “</p>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-px bg-accent mb-4" />
                    <span className="text-sm font-bold uppercase tracking-[0.3em]">NinesRentals</span>
                    <span className="text-[10px] text-black/30 tracking-widest uppercase mt-1">Faith First</span>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
