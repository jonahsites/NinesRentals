import { motion } from "motion/react";
import SEO from "../components/SEO";
import { Phone, Mail, Instagram, MapPin, Clock } from "lucide-react";
import { supabase } from "../lib/supabase";
import { cars } from "../components/Inventory";

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact NinesRentals | Miami Luxury Car Rental Support"
        description="Get in touch with NinesRentals for your luxury and exotic car rental inquiries in Miami. Book via phone, email, or our online form. Rapid response guaranteed."
      />

      <div className="pt-40 pb-32">
        <section className="px-10 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Get In Touch</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] mb-4 text-black">Let's <span className="text-accent italic">Talk.</span></h1>
            <p className="text-black/40 text-sm tracking-[0.2em] uppercase mb-16 underline decoration-accent underline-offset-8">Reserve your journey today</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Phone size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Call or Text</span>
                </div>
                <a href="tel:7865098435" className="text-2xl font-bold tracking-tighter text-black hover:text-accent transition-colors">+1 (786) 509-8435</a>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Instagram size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Instagram</span>
                </div>
                <a href="https://instagram.com/NinesRentals" target="_blank" rel="noreferrer" className="text-2xl font-bold tracking-tighter text-black hover:text-accent transition-colors">@NinesRentals</a>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <Clock size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Availability</span>
                </div>
                <p className="text-2xl font-bold tracking-tighter text-black">24/7 Service</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-accent mb-2">
                  <MapPin size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Areas</span>
                </div>
                <p className="text-2xl font-bold tracking-tighter text-black">South Florida</p>
              </div>
            </div>

            <div className="p-8 border border-black/5 bg-black/[0.01] rounded-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6">Service Region</h4>
                <ul className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-black/40">
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Miami</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Fort Lauderdale</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Palm Beach</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent rounded-full" /> Sunny Isles</li>
                </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-black/10 p-12 md:p-16 rounded-sm shadow-2xl shadow-black/5"
          >
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 text-black">Direct Inquiry</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-12 block">Fastest way to book your experience</p>
            
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
                const message = target[5].value;
                
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
                    booking_time: `MESSAGE: ${message || "GENERAL INQUIRY"}`
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
              <div className="grid grid-cols-2 gap-8">
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
                <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Email Address*</label>
                <input type="email" className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black" required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Phone Number*</label>
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
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-black/30 font-bold">Additional Message</label>
                <textarea rows={3} className="w-full bg-black/5 border-b border-black/10 py-4 focus:outline-none focus:border-accent transition-colors text-black resize-none" />
              </div>
              <button className="w-full py-6 bg-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-black transition-all">Submit Inquiry</button>
            </form>
          </motion.div>
        </section>
      </div>
    </>
  );
}
