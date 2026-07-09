import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Happy Fit Club Kids & Teens Yoga Bengaluru",
  description: "Explore the joyful moments, fitness workshops, events, and summer camps at Happy Fit Club in Hoodi, Bengaluru. See our students in action!",
  alternates: {
    canonical: "https://happyfitclubblr.com/gallery",
  },
  openGraph: {
    title: "Gallery | Happy Fit Club Kids & Teens Yoga Bengaluru",
    description: "Explore the joyful moments, fitness workshops, events, and summer camps at Happy Fit Club in Hoodi, Bengaluru. See our students in action!",
    url: "https://happyfitclubblr.com/gallery",
  }
};

export default function GalleryPage() {
  return <GalleryClient />;
}
