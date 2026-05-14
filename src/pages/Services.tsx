import { motion } from "motion/react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const allServices = [
  {
    title: "Professional Photography",
    price: "Inquire",
    desc: "Transform your exotic car experience into a work of art with our exclusive photography package. Perfectly suited for social media or personal keepsakes.",
    features: ["10 professionally edited pictures", "Desired location within 15 miles", "1 hour session", "Drone shots available"],
    image: "https://static.wixstatic.com/media/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg/v1/fill/w_614,h_460,fp_0.46_0.67,q_90,enc_avif,quality_auto/dfb3c4_c0a36ab317df453aa2e9e293710567a1~mv2.jpg"
  },
  {
    title: "Professional Filming",
    price: "Inquire",
    desc: "Capture every thrilling moment of your vehicle in action, highlighting its power and design. Cinematic reels for the modern enthusiast.",
    features: ["2 30 second edited films", "Desired location within 15 miles", "2 hour session", "4K high quality output"],
    image: "https://static.wixstatic.com/media/dfb3c4_0fd7d8ad30e046cd8149d8b77cd62c79~mv2.jpeg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Roller%20Pics_JPEG.jpeg"
  },
  {
    title: "Romantic Package",
    price: "Inquire",
    desc: "Date night with a touch of class. Includes permanent lasting silk roses and designer paper. Make your surprise unforgettable.",
    features: ["25 to 100 rose bouquets", "Designer paper choice", "Custom arrangement", "Champagne available"],
    image: "https://static.wixstatic.com/media/dfb3c4_7a86fdd0aff84dcb8f313194dae7f4cd~mv2.jpg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/46-DSC05487_edited.jpg"
  },
  {
    title: "Personal Chauffeur",
    price: "Inquire",
    desc: "Experience convenience, luxury, and discretion. Available for all vehicles in our fleet. Arrive in style without the stress of driving.",
    features: ["3 Hour Minimum", "Executive transportation", "Custom routes", "Discreet professional drivers"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Wedding Service",
    price: "Inquire",
    desc: "Celebrate your wedding or honeymoon with sophistication and elite style. The perfect exit for the perfect couple.",
    features: ["Customizable wedding bouquet", "Honeymoon transport", "Sophisticated service"],
    image: "https://static.wixstatic.com/media/dfb3c4_b816f5c7099f455b9248cedc8bca48c5~mv2.jpg/v1/fill/w_590,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/63-DSC05550.jpg"
  },
  {
    title: "VIP Concierge",
    price: "Inquire",
    desc: "Redefining the art of luxury. Contact us to learn more about our custom special services including airport pickup and hotel delivery.",
    features: ["Work travel custom needs", "Special occasions", "Bespoke experiences", "MIA / FLL / PBI delivery"],
    image: "https://static.wixstatic.com/media/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg/v1/fill/w_980,h_1252,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg"
  }
];

export default function Services() {
  return (
    <>
      <SEO 
        title="Luxury Services | Chauffeur & Exotic Experiences Miami"
        description="Beyond car rentals, NinesRentals offers professional photography, filming, romantic packages, and chauffeur services in Miami. Enhance your luxury experience."
      />

      <div className="pt-40 pb-32">
        <section className="px-10 md:px-16 max-w-[1400px] mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Our Offerings</span>
            <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter uppercase leading-[0.8] mb-12 text-black">
              Beyond <br/> <span className="text-black/10 text-outline">The</span> <br/> Drive.
            </h1>
            <p className="text-xl md:text-2xl text-black/60 font-light leading-relaxed max-w-2xl">
              NinesRentals is about the total experience. We offer a suite of concierge services designed to make your time in South Florida truly unforgettable.
            </p>
          </motion.div>
        </section>

        <section className="px-10 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group border border-black/5 bg-white/[0.02] flex flex-col h-full rounded-sm overflow-hidden hover:border-accent/40 transition-editorial"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 right-4 bg-accent text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm">
                  {service.price}
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors text-black">{service.title}</h3>
                <p className="text-black/40 text-xs leading-relaxed mb-8 flex-1">{service.desc}</p>
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-[10px] uppercase tracking-widest text-black/20 flex items-center gap-3 font-bold">
                      <div className="w-1.5 h-1.5 bg-accent/40 rounded-full" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact"
                  className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all text-center"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
}
