export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "miami-luxury-car-rental-guide",
    title: "The Ultimate Guide to Luxury Car Rentals in Miami",
    excerpt: "Everything you need to know about navigating the exotic car rental scene in South Florida, from requirements to the best scenic routes.",
    content: `
      <p>Miami is a city built for beauty, power, and prestige. There is no better way to experience the vibrant energy of the Magic City than from the driver's seat of an exotic masterpiece. At NinesRentals, we've seen first-hand how the right car transforms a trip into an unforgettable journey.</p>
      
      <h2>Why Rent a Luxury Car in Miami?</h2>
      <p>Miami isn't just a destination; it's a stage. Whether you're cruising down Ocean Drive, exploring the Design District, or heading to a high-profile event at Hard Rock Stadium, your vehicle is an extension of your style. Luxury rentals provide more than just transportation—they provide an experience of comfort, advanced technology, and raw performance that standard rentals simply can't match.</p>

      <h2>Key Requirements for Renting</h2>
      <ul>
        <li><strong>Age:</strong> Most exotic rentals require you to be 18+ or 21+ depending on the vehicle class.</li>
        <li><strong>Insurance:</strong> Active full-coverage auto insurance is typically required. At NinesRentals, we also offer solutions for those with third-party insurance.</li>
        <li><strong>Deposit:</strong> Expect a refundable damage deposit ranging from $500 to $1000.</li>
      </ul>

      <h2>The Best Routes to Drive</h2>
      <p>Once you've got the keys to your Lamborghini or Porsche, where should you go? We recommend starting with the MacArthur Causeway for a stunning view of the skyline, then heading north along A1A for a scenic coastal drive through Sunny Isles and into Fort Lauderdale.</p>

      <p>Ready to start your journey? Explore our collection today and experience Miami the way it was meant to be seen.</p>
    `,
    date: "2025-05-10",
    author: "Nines Team",
    image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/2023-Porsche-Turbo-Stage-3/i-nLZcLRc/0/NH59JFj78psJWnsHm8xsCk8KBrVDJhpx7thCvL6kL/XL/63f6fa50-a037-4839-8a90-b3d4ec3cab96.-XL.jpg",
    category: "Guides"
  },
  {
    id: "2",
    slug: "top-5-exotic-cars-miami-2025",
    title: "Top 5 Exotic Cars to Drive in Miami for 2025",
    excerpt: "Discover the most requested vehicles of the year and why they are the perfect choice for the Florida sunshine.",
    content: `
      <p>Miami's automotive landscape is constantly evolving. In 2025, we're seeing a shift towards a blend of classic gas-powered raw energy and the futuristic hum of high-performance hybrids. Here are the top 5 cars you should have on your list this year.</p>

      <h3>1. Lamborghini Huracán STO</h3>
      <p>The STO is essentially a race car for the road. Its aggressive aerodynamics make it a head-turner on any Miami corner, and the V10 symphony is the perfect soundtrack for a night out in Brickell.</p>

      <h3>2. Rolls-Royce Cullinan</h3>
      <p>For those who prefer the ultimate in luxury and presence, the Cullinan remains the gold standard. It’s the perfect way to transport a group in absolute silence and comfort.</p>

      <h3>3. Porsche 911 Turbo S</h3>
      <p>The 911 Turbo S is the daily-driver of exotic cars. It's incredibly fast, surgically precise, and perfectly at home whether you're at a valet stand or on the highway.</p>

      <h3>4. Ferrari F8 Tributo</h3>
      <p>Nothing says "I've arrived" quite like a Rosso Corsa Ferrari. The F8 offers a level of engagement and passion that is uniquely Italian and perfectly suited for the South Beach vibe.</p>

      <h3>5. Corvette C8 Z06</h3>
      <p>The Z06 has redefined American performance. With its flat-plane crank V8, it sounds like nothing else on the road and holds its own against European rivals three times its price.</p>

      <p>At NinesRentals, we pride ourselves on maintaining an elite collection that features these icons and more. Check our availability to see what's ready for you.</p>
    `,
    date: "2025-05-01",
    author: "Nines Team",
    image: "https://photos.smugmug.com/Saucy-Rentals-Car-Inventory-/Saucy-Rentals-Extra/Corvette-C8-ERAY/i-VQPCwzd/0/KQGQsNKcPn3xCtgJLsVtN38snRnvVt6Nh6zxxfbtt/L/IMG_2922-L.jpg",
    category: "Rankings"
  },
  {
    id: "3",
    slug: "faith-driven-business-miami",
    title: "More than Metal: Being a Faith-Driven Business in Miami",
    excerpt: "Why NinesRentals operates differently. Our commitment to integrity, service, and our faith in the automotive world.",
    content: `
      <p>In an industry often associated with flash and ego, NinesRentals chooses a different path. We are a faith-based company, and that foundation influences every decision we make—from how we maintain our cars to how we treat our clients.</p>

      <h2>Service as Stewardship</h2>
      <p>We view our business as a form of service. "God is good all the time" isn't just a slogan for us; it's a reminder that we are stewards of the resources we've been given. This means providing absolute honesty in our pricing, meticulous care for our vehicles, and genuine respect for every person who walks through our doors.</p>

      <h2>Building Trust in South Florida</h2>
      <p>The rental market in Miami can be complicated. Many people worry about hidden fees or unreliable service. By grounding our business in faith and integrity, we aim to be a beacon of reliability. We want our clients to know that when they book with Nines, they are booking with people they can trust.</p>

      <p>Experience the NinesRentals difference today—where luxury meets integrity.</p>
    `,
    date: "2025-04-20",
    author: "Executive Team",
    image: "https://static.wixstatic.com/media/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg/v1/fill/w_980,h_1252,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dfb3c4_b6f26321e375441caaf70f3e26f8cef5~mv2.jpg",
    category: "Culture"
  }
];
