import { useEffect } from "react";
import { Routes, Route, useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import CarDetails from "./pages/CarDetails";

// SEO Helper Component
function Meta({ title, description }: { title: string; description: string }) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }
  }, [title, description, location]);

  return null;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomeWithMeta />} />
        <Route path="/miami-exotic-car-rentals" element={<HomeWithMeta />} />
        <Route path="/miami-exotic-car-fleet" element={<FleetWithMeta />} />
        <Route path="/fleet" element={<LegacyRedirect to="/miami-exotic-car-fleet" />} />
        
        {/* SEO pages */}
        <Route path="/miami-beach-exotic-car-rental" element={
          <StaticPage 
            title="Exotic Car Rental in Miami Beach | Luxury & Supercars Delivered" 
            metaTitle="Exotic Car Rental in Miami Beach | Luxury & Supercars Delivered"
            metaDesc="Rent exotic cars in Miami Beach including Lamborghini, Ferrari, and Rolls-Royce. Fast delivery service to hotels, resorts, and oceanfront locations."
          />
        } />
        <Route path="/miami-airport-luxury-car-rental" element={
          <StaticPage 
            title="Miami Airport Exotic Car Rental | Luxury & Supercar Pickup" 
            metaTitle="Miami Airport Exotic Car Rental | Luxury & Supercar Pickup"
            metaDesc="Arrive in style with exotic car rentals at Miami International Airport. Lamborghini, Ferrari, and luxury SUVs delivered directly upon arrival."
          />
        } />
        <Route path="/downtown-miami-supercar-rental" element={
          <StaticPage 
            title="Downtown Miami Exotic Car Rental | Luxury Supercars Available" 
            metaTitle="Downtown Miami Exotic Car Rental | Luxury Supercars Available"
            metaDesc="Rent exotic cars in Downtown Miami with fast delivery and premium service. Perfect for nightlife, business trips, and luxury experiences."
          />
        } />
        <Route path="/miami-wedding-luxury-car-rental" element={
          <StaticPage 
            title="Luxury Wedding Car Rental Miami | Exotic & Supercar Arrivals" 
            metaTitle="Luxury Wedding Car Rental Miami | Exotic & Supercar Arrivals"
            metaDesc="Make your wedding unforgettable with luxury exotic car rentals in Miami. Rolls-Royce, Lamborghini, and premium vehicles for your special day."
          />
        } />
        <Route path="/miami-corporate-exotic-car-rental" element={
          <StaticPage 
            title="Corporate Exotic Car Rental Miami | Luxury Business Travel" 
            metaTitle="Corporate Exotic Car Rental Miami | Luxury Business Travel"
            metaDesc="Impress clients with exotic and luxury car rentals in Miami. Perfect for corporate events, VIP transport, and executive business travel."
          />
        } />
        <Route path="/miami-self-drive-exotic-rentals" element={
          <StaticPage 
            title="Self Drive Exotic Car Rental Miami | Lamborghini & Ferrari" 
            metaTitle="Self Drive Exotic Car Rental Miami | Lamborghini & Ferrari"
            metaDesc="Drive your dream exotic car in Miami with self-drive rentals. Lamborghini, Ferrari, and McLaren available for daily and weekly bookings."
          />
        } />
        <Route path="/miami-exotic-car-rental-prices" element={
          <StaticPage 
            title="Miami Exotic Car Rental Prices | Luxury Car Rates & Deals" 
            metaTitle="Miami Exotic Car Rental Prices | Luxury Car Rates & Deals"
            metaDesc="View pricing for exotic car rentals in Miami. Transparent daily and weekly rates for Lamborghini, Ferrari, Rolls-Royce, and more luxury vehicles."
          />
        } />
        <Route path="/miami-exotic-car-rental-reviews" element={
          <StaticPage 
            title="Miami Exotic Car Rental Reviews | Customer Experiences & Ratings" 
            metaTitle="Miami Exotic Car Rental Reviews | Customer Experiences & Ratings"
            metaDesc="Read verified reviews of our Miami exotic car rental service. See why customers choose us for luxury, supercars, and premium experiences."
          />
        } />
        <Route path="/contact-miami-exotic-cars" element={
          <StaticPage 
            title="Contact Miami Exotic Car Rental | Book Luxury & Supercars Today" 
            metaTitle="Contact Miami Exotic Car Rental | Book Luxury & Supercars Today"
            metaDesc="Contact us to book exotic car rentals in Miami. Fast response, flexible booking, and premium luxury vehicles delivered anywhere in Miami."
          />
        } />
        <Route path="/blog" element={
          <StaticPage 
            title="Miami Exotic Car Rental Blog | Luxury Cars, Guides & Tips" 
            metaTitle="Miami Exotic Car Rental Blog | Luxury Cars, Guides & Tips"
            metaDesc="Explore Miami exotic car rental tips, luxury car guides, and supercar comparisons. Learn everything about renting Lamborghini, Ferrari, and more in Miami."
          />
        } />

        {/* Car Details Routes - Generic slug MUST be last to avoid catching subpages */}
        <Route path="/:slug" element={<CarDetailsWithMeta />} />
        
        {/* Legacy redirects for car details */}
        <Route path="/fleet/:slug" element={<CarDetailsLegacyRedirect />} />
        <Route path="/miami-:carSlug" element={<CarDetailsLegacyRedirect />} />
      </Routes>
    </Layout>
  );
}

function HomeWithMeta() {
  return (
    <>
      <Meta 
        title="Exotic Car Rentals in Miami | Lamborghini, Ferrari & Luxury Cars" 
        description="Rent exotic and luxury cars in Miami including Lamborghini, Ferrari, Rolls-Royce, and McLaren. Premium supercar rentals with delivery across Miami, Miami Beach, and the airport."
      />
      <Home />
    </>
  );
}

function FleetWithMeta() {
  return (
    <>
      <Meta 
        title="Miami Exotic Car Fleet | Lamborghini, Ferrari, Rolls-Royce Rentals" 
        description="Explore our full fleet of exotic cars available for rent in Miami. Choose from Lamborghini, Ferrari, McLaren, and luxury SUVs with flexible rental options."
      />
      <Fleet />
    </>
  );
}

function CarDetailsWithMeta() {
  const { slug } = useParams();
  return (
    <>
      {/* Meta for car details is handled inside CarDetails component or we could pass it here */}
      <CarDetails />
    </>
  );
}

function StaticPage({ title, metaTitle, metaDesc }: { title: string; metaTitle: string; metaDesc: string }) {
  return (
    <div className="pt-60 pb-40 px-10 text-center bg-white min-h-screen">
      <Meta title={metaTitle} description={metaDesc} />
      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">NinesRentals / Exclusive</span>
      <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-black transition-editorial leading-none max-w-4xl mx-auto">{title}</h1>
      <p className="text-black/40 text-[10px] uppercase tracking-[0.3em] font-medium max-w-md mx-auto mb-12">We are currently curating the most exclusive experience for this location and service. Please check back shortly or contact our concierge.</p>
      <div className="flex justify-center gap-8">
        <a href="tel:7865098435" className="bg-black text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors">Call Concierge</a>
        <a href="https://wa.me/17865098435" target="_blank" rel="noreferrer" className="border border-black/10 px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all text-black">WhatsApp Now</a>
      </div>
    </div>
  );
}

function LegacyRedirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
}

function CarDetailsLegacyRedirect() {
  const { slug, carSlug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const finalSlug = slug || `miami-${carSlug}`;
    if (finalSlug) {
      navigate(`/${finalSlug}`, { replace: true });
    }
  }, [navigate, slug, carSlug]);
  return null;
}
