import type { Metadata } from "next";
import ProgramsClient from "./ProgramsClient";

export const metadata: Metadata = {
  title: "Kids & Teens Yoga & Fitness Programs | Happy Fit Club Bengaluru",
  description: "Explore our kids & teens yoga, fitness and mindfulness programs in Hoodi, Bengaluru. From Little Yogis (ages 3-6) to Limitless Teen Yoga and Special Fit.",
  alternates: {
    canonical: "https://happyfitclubblr.com/programs",
  },
  openGraph: {
    title: "Kids & Teens Yoga & Fitness Programs | Happy Fit Club Bengaluru",
    description: "Explore our kids & teens yoga, fitness and mindfulness programs in Hoodi, Bengaluru. From Little Yogis (ages 3-6) to Limitless Teen Yoga and Special Fit.",
    url: "https://happyfitclubblr.com/programs",
  }
};

const programsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Happy Fit Club Yoga and Fitness Programs",
  "description": "A list of certified kids and teens yoga and movement programs offered by Happy Fit Club in Bengaluru.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "Little Yogi’s Club",
        "description": "A playful introduction to yoga where toddlers and young kids explore movement, story-based poses, and simple breathing exercises.",
        "provider": {
          "@type": "Organization",
          "name": "Happy Fit Club",
          "sameAs": "https://happyfitclubblr.com"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "name": "Young Yogi’s Club",
        "description": "Building strength, body awareness, and emotional resilience through fun yoga sequences, games, and basic mindfulness tools.",
        "provider": {
          "@type": "Organization",
          "name": "Happy Fit Club",
          "sameAs": "https://happyfitclubblr.com"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Course",
        "name": "Limitless Club",
        "description": "Empowering teens with physical fitness, flexibility, stress-management techniques, and a positive self-image in a supportive social environment.",
        "provider": {
          "@type": "Organization",
          "name": "Happy Fit Club",
          "sameAs": "https://happyfitclubblr.com"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Course",
        "name": "Special Fit",
        "description": "An inclusive, adaptive program customized to nurture motor skills, focus, and sensory coordination for children with unique learning styles.",
        "provider": {
          "@type": "Organization",
          "name": "Happy Fit Club",
          "sameAs": "https://happyfitclubblr.com"
        }
      }
    }
  ]
};

export default function ProgramsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(programsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProgramsClient />
    </>
  );
}
