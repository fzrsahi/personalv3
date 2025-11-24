import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ActiveCommandProvider } from "@/contexts/ActiveCommandContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Fazrul Anugrah Sahi | Backend Developer",
  description: "Backend Developer specializing in Go, Node.js, and Microservices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-paper text-ink selection:bg-sand/30 selection:text-ink`}
      >
        <ActiveCommandProvider>
          {children}
        </ActiveCommandProvider>
      </body>
    </html>
  );
}
