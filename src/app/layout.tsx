import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "@/app/globals.css";
import { Footer } from "@/components/ui/footer";
import { cabin, michroma, montserrat } from './fonts';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import GlobalBackground from "@/components/GlobalBackground";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://noqwit.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NoQwit.ai – AI Interview Practice & Mock Interviews",
    template: "%s | NoQwit.ai",
  },
  description:
    "Master your interview skills with AI-powered mock interviews. Practice with The Boring Interview platform—get real-time feedback, resume-based questions, and actionable coaching. Free for students and job seekers.",
  keywords: [
    "AI interview practice",
    "mock interview",
    "interview preparation",
    "job interview coach",
    "AI interview coach",
    "interview skills",
    "career preparation",
    "The Boring Interview",
    "NoQwit",
  ],
  authors: [{ name: "NoQwit", url: siteUrl }],
  creator: "NoQwit",
  publisher: "NoQwit",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NoQwit.ai – The Boring Interview",
    title: "NoQwit.ai – AI Interview Practice & Mock Interviews",
    description:
      "Master your interview skills with AI-powered mock interviews. Practice with real-time feedback and actionable coaching.",
    images: [
      {
        url: "/EA.ai.png",
        width: 1200,
        height: 630,
        alt: "NoQwit.ai – AI Interview Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoQwit.ai – AI Interview Practice & Mock Interviews",
    description:
      "Master your interview skills with AI-powered mock interviews. Real-time feedback and coaching.",
    images: ["/EA.ai.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cabin.variable} ${michroma.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NoQwit.ai – The Boring Interview",
              description: "AI-powered interview practice and mock interviews with real-time feedback.",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/dashboard?q={search_term_string}` },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NoQwit",
              url: siteUrl,
              logo: `${siteUrl}/EA.ai.png`,
              sameAs: [],
            }),
          }}
        />
        <ThemeProvider>
          <GlobalBackground />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
