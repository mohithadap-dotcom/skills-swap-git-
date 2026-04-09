import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SKILLSWAP — Swap Skills, Not Money",
  description: "AI-powered peer learning marketplace for engineering students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-syne antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        <div className="noise" />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
