import { motion } from "motion/react";
import SEO from "../components/SEO";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | Premium Car Rental Miami"
        description="Learn about NinesRentals, the leading luxury car rental provider in South Florida. Our mission is to provide excellence, reliability, and an elite experience."
      />
      
      <div className="pt-40 pb-32">
        {/* Hero Section */}
        <section className="px-10 md:px-16 max-w-[1400px] mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Our Story</span>
            <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter uppercase leading-[0.8] mb-12 text-black">
              Excellence <br/> <span className="text-black/10 text-outline">Without</span> <br/> Compromise.
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <p className="text-xl md:text-2xl text-black/60 font-light leading-relaxed">
                Founded in 2025, NinesRentals was born from a passion for automotive perfection and a commitment to faith-driven service. We believe that everyone should have the opportunity to drive their dreams.
              </p>
              <div className="flex flex-col gap-8">
                <div className="pt-8 border-t border-black/10 flex justify-between items-end">
                  <div>
                    <p className="text-4xl font-bold text-black">100%</p>
                    <p className="text-[10px] uppercase tracking-widest text-black/40">Reliability Rate</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-black">Elite</p>
                    <p className="text-[10px] uppercase tracking-widest text-black/40">Collection</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-black">Faith</p>
                    <p className="text-[10px] uppercase tracking-widest text-black/40">Based Co.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section className="bg-black/5 py-32 px-10 md:px-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-accent/10 -skew-x-12 translate-x-1/2" />
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div className="aspect-square bg-white p-2 border border-black/5">
              <img 
                src="https://static.wixstatic.com/media/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg/v1/fill/w_980,h_1252,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg" 
                alt="Our Vision"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12 text-black leading-none">The Nines <br /> <span className="text-accent italic">Difference.</span></h2>
              <div className="space-y-12">
                {[
                  { icon: ShieldCheck, title: "Unwavering Trust", desc: "No hidden fees, no upfront payments. We build relationships on transparency and integrity." },
                  { icon: Heart, title: "Faith Driven", desc: "Our core values are rooted in faith. We believe in serving our community with excellence and honor." },
                  { icon: Sparkles, title: "Meticulous Fleet", desc: "Every car in our stable is personally inspected and detailed to ensure perfection for every client." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="p-4 bg-white shadow-sm border border-black/5 rounded-sm h-fit group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-black">{item.title}</h3>
                      <p className="text-black/40 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Culture / Team */}
        <section className="py-32 px-10 md:px-16 max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Our Culture</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-black">Rooted in <span className="text-accent italic">Service.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Professionalism", "Integrity", "Excellence", "Community", "Commitment", "Faith"
            ].map((value, i) => (
              <div key={i} className="border border-black/5 p-12 hover:bg-black/[0.02] transition-editorial">
                <CheckCircle2 className="text-accent mb-6" size={20} />
                <h3 className="text-2xl font-bold uppercase tracking-tighter text-black">{value}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
