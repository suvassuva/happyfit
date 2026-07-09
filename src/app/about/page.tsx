import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Happy Fit Club Kids & Teens Yoga Bengaluru",
  description: "Learn more about Happy Fit Club's play-based yoga and mindfulness philosophy. Founded by Gunjan, we guide children in Bengaluru towards strength, calm, and confidence.",
  alternates: {
    canonical: "https://happyfitclubblr.com/about",
  },
  openGraph: {
    title: "About Us | Happy Fit Club Kids & Teens Yoga Bengaluru",
    description: "Learn more about Happy Fit Club's play-based yoga and mindfulness philosophy. Founded by Gunjan, we guide children in Bengaluru towards strength, calm, and confidence.",
    url: "https://happyfitclubblr.com/about",
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
