import type { Metadata } from "next";
import { Michroma, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/ui/footer";
import { cabin } from './fonts';
import { ThemeProvider } from '../components/ui/ThemeProvider';

const michroma = Michroma({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
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
    <html lang="en" className={`${cabin.variable} ${michroma.className} ${montserrat.className}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
