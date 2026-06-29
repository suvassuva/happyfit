import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Fit Club - Kids & Teens Yoga and Mindfulness",
  description: "Nurturing little souls through movement, mindfulness, and play in a safe, premium environment. Join our programs today!",
  keywords: ["kids yoga", "teen yoga", "mindfulness for kids", "wellness", "fitness club", "yoga studio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ paddingTop: "var(--header-height)" }}>
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
