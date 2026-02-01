import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with NoQwit.ai and The Boring Interview team. Questions about AI interview practice, pricing, or support—we're here to help.",
  openGraph: {
    title: "Contact | NoQwit.ai",
    description:
      "Get in touch with the NoQwit.ai team. Questions about AI interview practice or support.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
