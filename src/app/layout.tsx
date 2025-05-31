import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/ui/footer";
import Head from "next/head";
import { cabin } from './fonts';

const michroma = Michroma({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Project EA",
  description: "AI-powered interview platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" 
          rel="stylesheet" 
        />
      </Head>
    <html lang="en" className={`${cabin.variable} ${michroma.className}`}>
      <body className="bg-white">
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
    </>
  );
}
