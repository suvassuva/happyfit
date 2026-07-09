import type { Metadata } from "next";
import ConnectClient from "./ConnectClient";

export const metadata: Metadata = {
  title: "Book a Free Session | Contact Happy Fit Club Bengaluru",
  description: "Contact Happy Fit Club in Hoodi, Mahadevapura, Bengaluru. Book a free trial kids or teens yoga session, or get in touch for corporate wellness and events.",
  alternates: {
    canonical: "https://happyfitclubblr.com/connect",
  },
  openGraph: {
    title: "Book a Free Session | Contact Happy Fit Club Bengaluru",
    description: "Contact Happy Fit Club in Hoodi, Mahadevapura, Bengaluru. Book a free trial kids or teens yoga session, or get in touch for corporate wellness and events.",
    url: "https://happyfitclubblr.com/connect",
  }
};

export default function ConnectPage() {
  return <ConnectClient />;
}
