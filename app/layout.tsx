import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ExperienceProvider } from "@/providers/ExperienceProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Referenced by themes/dreamer.ts (heading) and themes/engineer.ts (heading + body)
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jiya Sahni — Portfolio",
  description:
    "Software engineer portfolio — celestial and professional modes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <ThemeProvider>
          <ExperienceProvider>{children}</ExperienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}