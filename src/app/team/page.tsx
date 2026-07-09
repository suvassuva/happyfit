import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Meet Our Team | Happy Fit Club Kids & Teens Yoga Bengaluru",
  description: "Meet our certified kids yoga teachers, strength trainers, and mindfulness coaches in Hoodi, Bengaluru. Learn about our safety, CPR & First Aid standards.",
  alternates: {
    canonical: "https://happyfitclubblr.com/team",
  },
  openGraph: {
    title: "Meet Our Team | Happy Fit Club Kids & Teens Yoga Bengaluru",
    description: "Meet our certified kids yoga teachers, strength trainers, and mindfulness coaches in Hoodi, Bengaluru. Learn about our safety, CPR & First Aid standards.",
    url: "https://happyfitclubblr.com/team",
  }
};

export default function TeamPage() {
  return <TeamClient />;
}
