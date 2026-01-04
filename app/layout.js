import './globals.css';
import { Cinzel, Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GoldDustCursor from './components/GoldDustCursor';

const headingFont = Cinzel({ subsets: ['latin'], weight: ['600', '700'] });
const bodyFont = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MAB AI Strategies | Hyper-Interactive Intelligence Consultancy',
  description: 'Command center for MAB AI Strategies — premium AI agents, automations, and elite web experiences.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${headingFont.className} ${bodyFont.className}`}>
        <GoldDustCursor />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
