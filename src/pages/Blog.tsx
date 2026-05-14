import { motion } from "motion/react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <>
      <SEO 
        title="Luxury Lifestyle Blog | Miami Car Rental Insights"
        description="Stay updated with the latest in luxury automotive trends, Miami travel guides, and NinesRentals updates. Read our blog for exotic car insights."
      />

      <div className="pt-40 pb-32">
        <section className="px-10 md:px-16 max-w-[1400px] mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">The Nines Journal</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none mb-8 text-black">
              Inside <span className="text-accent italic">The Drive.</span>
            </h1>
            <p className="text-black/40 text-sm tracking-widest uppercase mb-12">Insights, News & Luxury Lifestyle</p>
          </motion.div>
        </section>

        <section className="px-10 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full bg-white border border-black/5 rounded-sm overflow-hidden hover:border-accent/30 transition-all duration-500"
            >
              <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                  {post.category}
                </div>
              </Link>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-6 text-[9px] uppercase tracking-widest text-black/30 font-bold mb-6">
                  <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-2"><User size={12} /> {post.author}</span>
                </div>
                
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 group-hover:text-accent transition-colors leading-tight text-black">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-black/40 text-[13px] leading-relaxed mb-8 flex-1 italic">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-6 transition-all text-black"
                >
                  Read More <ArrowRight size={14} className="text-accent" />
                </Link>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
}
