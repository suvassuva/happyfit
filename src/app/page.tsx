import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Happy Fit Club | Kids & Teens Yoga & Mindfulness Studio Bengaluru",
  description: "Happy Fit Club is a premium kids' & teens' yoga, fitness, and mindfulness studio in Hoodi, Seetharampalya, Mahadevapura, Bengaluru. Book your free trial today!",
  alternates: {
    canonical: "https://happyfitclubblr.com",
  },
  openGraph: {
    title: "Happy Fit Club | Kids & Teens Yoga & Mindfulness Studio Bengaluru",
    description: "Premium play-based yoga and mindfulness classes for toddlers, kids, and teens (ages 3-17) in Bengaluru. Register for a free trial class!",
    url: "https://happyfitclubblr.com",
  }
};

export default function HomePage() {
  return <HomeClient />;
}
