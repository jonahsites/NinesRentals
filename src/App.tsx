import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, MapPin, Phone, ArrowUpRight, MousePointer2 } from "lucide-react";
import Showcase from "./components/Showcase";
import Inventory from "./components/Inventory";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Our Collection", type: "page" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
  { name: "Investors", href: "#" },
];

const faqItems = [
  { q: "What are the requirements to book?", a: "You must be at least 21 years old (25 for certain elite models), have a valid driver's license, and provide proof of full coverage insurance." },
  { q: "What if I don't have full coverage insurance?", a: "We offer various rental car damage protection options. Please contact our concierge for details on opting in." },
  { q: "Do I still need personal car insurance if I opt in for protection?", a: "Rental damage protection is not a substitute for personal liability insurance. Requirements vary, so please confirm with your agent." },
  { q: "Can I add an additional driver to my rental?", a: "Yes, additional drivers can be added for a fee, provided they meet all age and insurance requirements." },
  { q: "What if my insurance deductible is over $2,500?", a: "We may require an additional security deposit or supplemental coverage in certain high-deductible cases." },
  { q: "Do you have any extra hidden fees?", a: "Transparency is key. We detail all costs upfront, including delivery, fuel, and security deposits." },
  { q: "Insurance requirements for business rentals?", a: "Business rentals require commercial insurance coverage or a verified corporate policy. Contact us for specifics." },
  { q: "Do you offer delivery service?", a: "Yes! We offer delivery to MIA, FLL, PBI, and custom locations across South Florida." },
  { q: "How many miles are included with my rental?", a: "Standard rentals typically include 100-150 miles per day. Excess mileage fees apply thereafter." },
  { q: "What is your security deposit policy?", a: "A refundable security deposit is required for all rentals. The amount varies based on the vehicle selected." },
  { q: "What is your cancellation policy?", a: "Cancellations made 72+ hours in advance are eligible for a credit. Late cancellations may incur fees." },
  { q: "Do you offer pick-up or drop-off outside of business hours?", a: "Yes, we offer flexible pick-up and drop-off options. Please coordinate with our team in advance for after-hours service." },
  { q: "Do you offer roadside assistance?", a: "Every rental includes 24/7 roadside assistance for your peace of mind while exploring the South Florida area." },
  { q: "Less than 72 hour reservation?", a: "While we prefer advance booking, we can often accommodate last-minute requests. Call us directly for same-day availability." },
  { q: "Do you offer military discount?", a: "We are proud to support our service members. Please inquire about our military discount program when booking." },
];

const specs = [
  { val: "$715", label: "Starting / Day" },
  { val: "Premium", label: "Collection" },
  { val: "FLORIDA", label: "Coverage" },
  { val: "24/7", label: "Support" },
];

export default function App() {
  const [showInventory, setShowInventory] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
<div className="relative bg-black font-sans selection:bg-orange-500 selection:text-black" id="home">
      {/* Skip to Main Content */}
      <a href="#content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-200 bg-accent text-black px-4 py-2 font-bold uppercase tracking-widest text-[10px]">
        Skip to Main Content
      </a>

      {/* Top Banner */}
      <div className="relative z-101 bg-accent/90 text-black px-10 py-2 hidden md:flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <div className="flex gap-8">
          <a href="tel:7865098435" className="flex items-center gap-2 hover:opacity-70 transition-opacity"><Phone size={10} /> 786-509-8435</a>
          <a href="mailto:info@ninerentals.co" className="flex items-center gap-2 hover:opacity-70 transition-opacity text-black">info@ninerentals.co</a>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a>
          <span>Miami • Broward • Palm Beach</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 md:top-8 left-0 w-full z-100 flex items-center justify-between px-10 py-10 md:px-16 md:py-6 bg-linear-to-b from-luxury-black to-transparent pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center pointer-events-auto"
        >
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">NINE<span className="text-accent">RENTALS</span></span>
            <span className="text-[7px] tracking-[0.4em] text-white/50 uppercase font-black">Luxury & Exotic</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-10 pointer-events-auto">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.type === "page") {
                  e.preventDefault();
                  setShowInventory(true);
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="text-[11px] uppercase tracking-[0.1em] font-bold text-white transition-opacity cursor-pointer"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden pointer-events-auto"
        >
          <button>
            <Menu size={24} />
          </button>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-20 min-h-screen overflow-hidden"
      >
        {/* Background large text */}
        <div className="absolute top-[15%] left-[45%] z-0 pointer-events-none select-none">
          <span className="text-[180px] font-black text-white/[0.02] leading-none uppercase">
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
              src="https://static.wixstatic.com/media/dfb3c4_b13bf17accfb447ea85569809055bc07~mv2.jpg/v1/fill/w_1470,h_1290,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfb3c4_b13bf17accfb447ea85569809055bc07~mv2.jpg"
              alt="NineRentals Hero"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-b from-luxury-black/80 via-transparent to-luxury-black" />
          </motion.div>
        </div>

        <main id="content" className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 px-10 py-10 md:px-16 md:pb-16 max-w-[1400px] mx-auto h-screen items-end">
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
              <h1 className="text-6xl md:text-7xl lg:text-[88px] font-bold leading-[0.9] uppercase tracking-[-3px] mb-8">
                Explore <span className="text-outline block mt-2">Elite</span> Driving.
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-[420px] mb-12 font-light">
                Discover our exclusive collection of premium cars, each delivering outstanding performance and elegance. Experience South Florida the right way.
              </p>
              
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => setShowInventory(true)}
                  className="bg-white text-luxury-black px-10 py-5 text-sm font-bold uppercase tracking-[0.1em] hover:bg-accent transition-colors pointer-events-auto"
                >
                  View Inventory
                </button>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll to Explore</span>
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
              className="w-full h-[85%] bg-linear-to-br from-white/10 to-transparent border border-white/10 rounded-sm relative overflow-hidden group"
            >
              <img 
                src="https://static.wixstatic.com/media/dfb3c4_0fd7d8ad30e046cd8149d8b77cd62c79~mv2.jpeg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Roller%20Pics_JPEG.jpeg" 
                alt="Elite Collection Roller" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-luxury-black/60 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-serif italic text-white/5 text-4xl tracking-[0.1em] uppercase group-hover:opacity-0 transition-opacity">
                  Elite Collection
                </span>
              </div>
              
              <div className="absolute top-0 right-0 grid grid-cols-2 bg-luxury-grey/60 backdrop-blur-md border-l border-b border-white/10 z-10">
                {specs.map((spec, i) => (
                  <div key={i} className="px-6 py-6 w-[130px] border-r border-b border-white/5 last:border-r-0">
                    <p className="font-bold text-lg mb-1">{spec.val}</p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-white/50">{spec.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </motion.div>

      {/* Fleet Showcase */}
      <div id="fleet">
        <Showcase />
      </div>

      {/* Special Services Section */}
      <section id="services" className="relative z-20 py-32 bg-[#0A0A0B] px-10 md:px-16 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Beyond the Drive</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">Special <br/> <span className="text-white/30 text-outline">Services.</span></h2>
            </div>
            <p className="text-white/40 text-base leading-relaxed max-w-md font-light">
              At NineRentals, we redefine the art of luxury travel. Whether you're celebrating a special occasion, traveling for work, or enjoying a romantic evening, our premium vehicle services are designed to elevate any event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Photography",
                price: "$395",
                desc: "Transform your exotic car experience into a work of art with our exclusive photography package.",
                features: ["10 professionally edited pictures", "Desired location within 15 miles", "1 hour session"],
                image: "https://static.wixstatic.com/media/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg/v1/fill/w_614,h_460,fp_0.46_0.67,q_90,enc_avif,quality_auto/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg"
              },
              {
                title: "Professional Filming",
                price: "$595",
                desc: "Capture every thrilling moment of your vehicle in action, highlighting its power and design.",
                features: ["2 30 second edited films", "Desired location within 15 miles", "2 hour session"],
                image: "https://static.wixstatic.com/media/dfb3c4_0fd7d8ad30e046cd8149d8b77cd62c79~mv2.jpeg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Roller%20Pics_JPEG.jpeg"
              },
              {
                title: "Romantic Package",
                price: "From $195",
                desc: "Date night with a touch of class. Includes permanent lasting silk roses and designer paper.",
                features: ["25 to 100 rose bouquets", "Designer paper choice", "Starting at $195"],
                image: "https://static.wixstatic.com/media/dfb3c4_7a86fdd0aff84dcb8f313194dae7f4cd~mv2.jpg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/46-DSC05487_edited.jpg"
              },
              {
                title: "Personal Chauffeur",
                price: "From $95/hr",
                desc: "Experience convenience, luxury, and discretion. Available for all vehicles in our fleet.",
                features: ["3 Hour Minimum", "Executive transportation", "Custom routes"],
                image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Wedding Service",
                price: "Call for Pricing",
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
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-8 flex-1">{service.desc}</p>
                  <ul className="space-y-3 mb-10">
                    {service.features.map((feature, j) => (
                      <li key={j} className="text-[10px] uppercase tracking-widest text-white/20 flex items-center gap-3">
                        <div className="w-1 h-1 bg-accent/40 rounded-full" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Passion Section */}
      <section id="about" className="relative z-20 py-32 md:py-48 overflow-hidden bg-black">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-3/4 w-full bg-luxury-grey relative overflow-hidden border border-white/10 group">
              <img 
                src="https://static.wixstatic.com/media/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg/v1/fill/w_980,h_1252,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg" 
                alt="NineRentals Passion" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-luxury-black via-transparent to-transparent opacity-40" />
            </div>
          </div>

          <div className="relative">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">We Share Your Passion</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-10">At NineRentals, <br/> <span className="text-accent italic">Driving is Life.</span></h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light mb-12">
              <p>
                At NineRentals, we share a passion for luxury cars and a deep love for the driving experience. As a trusted vehicle rental service in South Florida, we pride ourselves on offering the latest, most exclusive cars to satisfy the desires of true enthusiasts.
              </p>
              <p>
                Whether you’re looking to make a statement, enjoy a thrilling ride, or simply experience the elegance of a high-end vehicle, we have the perfect car for you. Our fleet is meticulously curated, featuring only the finest, well-maintained vehicles, ensuring both luxury and reliability every time you hit the road.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-12 border-y border-white/10 py-10">
              <div>
                <p className="font-bold text-2xl mb-1 tracking-tighter">Elite</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30">Curated Fleet</p>
              </div>
              <div>
                <p className="font-bold text-2xl mb-1 tracking-tighter">Premium</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30">Florida Experts</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInventory(true)}
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b border-accent pb-2 hover:gap-8 transition-all"
            >
              Explore Our Collection <ArrowUpRight className="text-accent" />
            </button>
          </div>
        </div>
      </section>

      {/* The Ultimate Florida Experience */}
      <section className="relative z-20 py-32 bg-luxury-black px-10 md:px-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">The Ultimate Florida Experience</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-8">Elevate Every <br/> <span className="text-white/30 text-outline">Journey.</span></h2>
            <p className="text-white/60 text-base leading-relaxed mb-10 font-light">
              At NineRentals, we don’t just offer rental cars – we provide an unforgettable experience. Whether you're cruising the iconic streets of Miami, exploring the dynamic landscapes of Fort Lauderdale, or driving through the elegance of Palm Beach, our fleet of premium vehicles ensures you travel in style, comfort, and sophistication.
            </p>
            <div className="flex flex-col gap-6">
              {[
                "Miami Beach City Cruises",
                "Fort Lauderdale Landscapes",
                "Palm Beach's Elegant Roads"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/80">
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
              className="w-full h-full object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 right-10 p-10 bg-luxury-black/90 backdrop-blur-xl border border-accent/20 max-w-sm">
                <p className="text-sm font-serif italic text-white/80 mb-4">"Join the ranks of those who choose to drive the extraordinary. Welcome to NineRentals where your luxury journey begins."</p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Drive Extraordinary</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Why Choose Us */}
      <section className="relative z-20 py-32 bg-black px-10 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* How It Works */}
          <div>
            <div className="mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Process</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">How It Works</h2>
                <p className="text-white/40 text-sm tracking-widest uppercase">Easy Steps to Your Dream Car</p>
            </div>
            
            <div className="space-y-12">
              {[
                { step: "01", title: "Select Your Car", desc: "Explore our exclusive collection, select your desired vehicle, and get ready for an unforgettable experience." },
                { step: "02", title: "Quick Booking", desc: "Our simple and secure booking process ensures you're behind the wheel in no time." },
                { step: "03", title: "Enjoy the Drive", desc: "Experience the simplified luxury of renting from NineRentals. Choose, book, and enjoy." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="text-5xl font-black text-white/5 group-hover:text-accent/20 transition-colors duration-500">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <div className="mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Excellence</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">Why Choose Us</h2>
                <p className="text-white/40 text-sm tracking-widest uppercase">Unmatched Luxury and Service</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                { title: "Personalized Service", desc: "Enjoy dedicated support from our team ensuring a seamless rental experience tailored to you." },
                { title: "Meticulous Care", desc: "Every vehicle is maintained to showroom standards for your safety and satisfaction." },
                { title: "Florida Experts", desc: "We know the best routes and requirements across Miami, Broward, and Palm Beach." },
                { title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay for your experience." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-editorial">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-accent">{item.title}</h3>
                  <p className="text-white/40 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-20 py-32 bg-luxury-black px-10 md:px-16" id="faq">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-4 block">Support</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-8">Frequently <br/> <span className="text-white/30 text-outline">Asked.</span></h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10 font-light">
              Find answers to common questions about our car rental services in South Florida.
            </p>
             <button className="bg-white/5 border border-white/10 px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-all">
                Download PDF Guide
              </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((faq, i) => (
              <div 
                key={i} 
                className="group border border-white/5 bg-white/[0.02] overflow-hidden transition-all"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center gap-4"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest group-hover:text-accent transition-colors">{faq.q}</span>
                  <ChevronRight size={14} className={`text-white/20 transition-transform duration-500 ${activeFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <p className="text-white/40 text-[11px] leading-relaxed border-t border-white/5 pt-4">
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

      {/* Reservation / Contact */}
      <section className="relative z-20 py-32 bg-black px-10 md:px-16" id="contact">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Ready to Drive?</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] mb-4">RESERVE YOUR <br/> <span className="text-accent italic">LUXURY RIDE NOW!</span></h2>
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-12">Quick, Simple, and Secure Booking</p>
            
            <div className="space-y-10">
                <div className="flex items-start gap-8">
                  <div className="p-4 bg-white/5 rounded-sm"><Phone size={20} className="text-accent" /></div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Direct Line</p>
                    <p className="text-xl font-bold tracking-tighter">786-509-8435</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="p-4 bg-white/5 rounded-sm"><Phone size={20} className="text-accent" /></div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Email Inquiry</p>
                    <p className="text-xl font-bold tracking-tighter">info@ninerentals.co</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="p-4 bg-white/5 rounded-sm"><MapPin size={20} className="text-accent" /></div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Headquarters</p>
                    <p className="text-xl font-bold tracking-tighter">Miami, FL</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-12 md:p-16 rounded-sm relative">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Reserve Your Vehicle</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-10 block">Get in Touch</p>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold">First name*</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Last name*</label>
                    <input type="text" className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Email*</label>
                  <input type="email" className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Phone*</label>
                  <input type="tel" className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-none focus:border-accent transition-colors" />
               </div>
               <button className="w-full py-6 bg-accent text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* Reviews / Experience */}
      <section className="relative z-20 py-32 bg-white/5 backdrop-blur-xs">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 text-center">
            <h2 className="text-6xl md:text-9xl font-black text-white/[0.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none uppercase">Drive</h2>
            <div className="relative z-10 max-w-2xl mx-auto">
                <p className="text-2xl md:text-3xl font-serif leading-relaxed italic mb-8">"The only company I trust for my Miami stays. The Lamborghini was pristine, and the delivery was flawlessly handled at MIA."</p>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-px bg-accent mb-4" />
                    <span className="text-sm font-bold uppercase tracking-[0.3em]">Julian V.</span>
                    <span className="text-[10px] text-white/30 tracking-widest uppercase mt-1">Founding Member</span>
                </div>
            </div>
        </div>
      </section>

      {/* Footer / Contact simple */}
      <footer id="contact" className="relative z-20 bg-linear-to-t from-black to-luxury-black border-t border-white/10 px-10 pt-32 pb-20 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none uppercase">NINE<span className="text-accent">RENTALS</span></span>
              <span className="text-[7px] tracking-[0.4em] text-white/50 uppercase font-black">Luxury & Exotic</span>
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed max-w-[240px] uppercase tracking-widest mb-10">
              Premium Exotic, Luxury & Economy Rentals in Miami, Broward, and Palm Beach.
            </p>
          <div className="flex gap-4">
               <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-accent transition-editorial cursor-pointer group">
                <span className="text-[10px] font-bold group-hover:text-accent">IG</span>
               </a>
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-accent transition-editorial cursor-pointer group">
                <span className="text-[10px] font-bold group-hover:text-accent">X</span>
               </div>
               <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-accent transition-editorial cursor-pointer group">
                <span className="text-[10px] font-bold group-hover:text-accent">YT</span>
               </div>
          </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Availability</h4>
            <div className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest text-white/50">
              <a href="#fleet" className="hover:text-white transition-colors">Our Full Collection</a>
              <a href="#services" className="hover:text-white transition-colors">Concierge Services</a>
              <a href="#faq" className="hover:text-white transition-colors">Rental Requirements</a>
              <a href="#contact" className="hover:text-white transition-colors">Book Now</a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">Contact</h4>
            <div className="flex flex-col gap-6 text-[11px] uppercase tracking-widest text-white/40">
              <p>Miami, FL</p>
              <p>info@ninerentals.co</p>
              <p>MIA / FLL / PBI Airport Service</p>
              <p>South Florida Delivery</p>
            </div>
          </div>

          <div className="bg-white/5 p-10 border border-white/10 rounded-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Reservations</h4>
            <p className="text-sm font-bold mb-6 tracking-widest uppercase">786-509-8435</p>
            <button className="w-full py-4 border border-accent text-accent text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-black transition-all">
              Request Inquiry
            </button>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
<p className="text-[9px] uppercase tracking-[0.4em] text-white/20">&copy; 2025 NINERENTALS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors">Terms of Fleet</a>
          </div>
        </div>
      </footer>

      {/* Grid Lines */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full border-x border-white mx-auto max-w-[1400px] flex justify-between">
          <div className="border-r border-white h-full w-1/4" />
          <div className="border-r border-white h-full w-1/4" />
          <div className="border-r border-white h-full w-1/4" />
        </div>
      </div>

      {/* Full Fleet Overlay */}
      <AnimatePresence>
        {showInventory && (
          <Inventory onClose={() => setShowInventory(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}



