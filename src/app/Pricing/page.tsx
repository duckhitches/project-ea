import type { Metadata } from "next";
import Pricing from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore NoQwit.ai and The Boring Interview pricing. AI-powered mock interview practice for students and job seekers—plans to fit your goals.",
  openGraph: {
    title: "Pricing | NoQwit.ai",
    description: "Pricing plans for AI interview practice and mock interviews.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return <Pricing />;
} 