import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

export default function SEO({
  title = "NinesRentals | Luxury & Exotic Car Rentals Miami",
  description = "Experience luxury with NinesRentals. Premium exotic car rentals in Miami, Broward, and Palm Beach. Lamborghini, Rolls Royce, Ferrari, and more.",
  canonical = "https://nines-rentals.vercel.app",
  ogImage = "https://nines-rentals.vercel.app/og-image.jpg",
  ogType = "website",
  keywords = "luxury car rental miami, exotic car rental, miami sports car rental, ninesrentals, miami rentals"
}: SEOProps) {
  const siteTitle = title.includes("NinesRentals") ? title : `${title} | NinesRentals`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CarRentalBusiness",
          "name": "NinesRentals",
          "image": ogImage,
          "@id": "https://nines-rentals.vercel.app",
          "url": "https://nines-rentals.vercel.app",
          "telephone": "+17865098435",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Miami, FL",
            "addressLocality": "Miami",
            "addressRegion": "FL",
            "postalCode": "33101",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.7617,
            "longitude": -80.1918
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "sameAs": [
            "https://instagram.com/NinesRentals"
          ]
        })}
      </script>
    </Helmet>
  );
}
