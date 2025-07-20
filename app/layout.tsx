import "./globals.css";
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export const metadata = {
  title: "Forge des Mondes",
  description: "Base de données d'univers et de personnages",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`text-verdana text-text dark:text-dark-text antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
