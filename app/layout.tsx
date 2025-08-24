import "./globals.css";
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Forge des Mondes",
  description: "Base de données d'univers et de personnages",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-verdana text-[13px] text-text dark:text-dark-text antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
