import { motion } from "motion/react";
import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { Calendar, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Find related posts
  const recentPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <>
      <SEO 
        title={`${post.title} | NinesRentals Blog`}
        description={post.excerpt}
        ogType="article"
        ogImage={post.image}
      />

      <article className="pt-40 pb-32">
        {/* Header Section */}
        <header className="px-10 md:px-16 max-w-[900px] mx-auto text-center mb-20">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mb-12 text-black">{post.title}</h1>
          <div className="flex items-center justify-center gap-10 text-[10px] uppercase tracking-widest text-black/40 font-bold">
            <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-2"><User size={14} />By {post.author}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="px-10 md:px-16 max-w-[1400px] mx-auto mb-20">
          <div className="aspect-video lg:aspect-21/9 w-full bg-luxury-grey rounded-sm overflow-hidden border border-black/5">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 md:px-16 max-w-[800px] mx-auto">
          <div 
            className="prose prose-xl prose-stone max-w-none 
              prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-black
              prose-p:text-black/60 prose-p:leading-relaxed prose-p:font-light
              prose-strong:text-black prose-strong:font-bold
              prose-ul:text-black/50 prose-li:text-black/50"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 pt-10 border-t border-black/10 flex justify-between items-center">
             <div className="flex gap-4">
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors">
                  <Share2 size={14} /> Share Post
                </button>
             </div>
             <Link 
              to="/blog"
              className="px-8 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest hover:bg-accent transition-colors"
             >
                All Posts
             </Link>
          </div>
        </div>

        {/* Recent Posts Section */}
        <section className="bg-black/[0.02] mt-32 py-32 px-10 md:px-16 border-y border-black/5">
           <div className="max-w-[1400px] mx-auto">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-12 block text-center">Recent Articles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {recentPosts.map((rp) => (
                    <Link key={rp.id} to={`/blog/${rp.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 border border-black/5 hover:border-accent/40 transition-all duration-500">
                       <div className="aspect-video lg:aspect-square overflow-hidden bg-luxury-grey">
                          <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                       </div>
                       <div>
                          <p className="text-[8px] font-bold uppercase tracking-widest text-accent mb-4">{rp.category}</p>
                          <h5 className="text-xl font-bold uppercase tracking-tight text-black group-hover:text-accent transition-colors mb-4">{rp.title}</h5>
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest group-hover:gap-6 transition-all text-black">
                            Read <ArrowRight size={14} className="text-accent" />
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </section>
      </article>
    </>
  );
}
