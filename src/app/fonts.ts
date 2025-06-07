import { Cabin } from 'next/font/google';
import { Montserrat } from 'next/font/google';

export const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cabin',
  display: 'swap',
});

export const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700'] }); 