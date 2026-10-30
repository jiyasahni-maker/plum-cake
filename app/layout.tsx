import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ModeTransition from "@/components/layout/ModeTransition";

// Dreamer mode's heading face — an engraved, observatory-plaque feel.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "900"],
});

// Body face for both modes, and the heading face for engineer mode.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jiya Sahni",
  description:
    "Two ways in: an observatory of ideas, and a studio where they get built.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <ThemeProvider>
          {children}
          <ModeTransition />
        </ThemeProvider>
      </body>
    </html>
  );
}
