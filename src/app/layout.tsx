import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce app',
  description: 'It is an ecommerce app for sales new brands! ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LandingPage children={children} />
      </body>
    </html>
  );
}
