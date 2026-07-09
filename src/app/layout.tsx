import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://happyfitclubblr.com"),
  title: {
    default: "Happy Fit Club - Kids & Teens Yoga and Mindfulness",
    template: "%s | Happy Fit Club"
  },
  description: "Nurturing little souls through movement, mindfulness, and play in a safe, premium environment in Bengaluru. Join our programs today!",
  keywords: ["kids yoga", "teen yoga", "mindfulness for kids", "kids fitness", "yoga studio bengaluru", "happy fit club", "hoodi", "seetharampalya"],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Happy Fit Club - Kids & Teens Yoga and Mindfulness",
    description: "Nurturing little souls through movement, mindfulness, and play in a safe, premium environment in Bengaluru. Join our programs today!",
    url: "https://happyfitclubblr.com",
    siteName: "Happy Fit Club",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/kids-yoga-1.png",
        width: 1200,
        height: 630,
        alt: "Happy Fit Club Kids Yoga Class",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Fit Club - Kids & Teens Yoga and Mindfulness",
    description: "Nurturing little souls through movement, mindfulness, and play in a safe, premium environment. Join our programs today!",
    images: ["/images/kids-yoga-1.png"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Happy Fit Club",
  "image": [
    "https://happyfitclubblr.com/images/kids-yoga-1.png",
    "https://happyfitclubblr.com/images/kids-yoga-3.png",
    "https://happyfitclubblr.com/images/little-yogis.jpg"
  ],
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hoodi, Doddanakundi Industrial Area 2, Seetharampalya, Mahadevapura",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560048",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9818,
    "longitude": 77.7289
  },
  "url": "https://happyfitclubblr.com",
  "telephone": "+919880115287",
  "email": "happyfitclubblr@gmail.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/happyfitclubblr"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ paddingTop: "var(--header-height)" }}>
        {/* Splash screen initial visit popup */}
        <SplashScreen />
        {/* Local Business Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* Background Decorative Glow Blobs */}
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main style={{ flex: 1 }}>{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Navigation Sticky Tab Bar */}
        <BottomNav />
      </body>
    </html>
  );
}
