import { Cabin, Montserrat, Michroma } from 'next/font/google';

export const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cabin',
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-michroma',
  display: 'swap',
}); 