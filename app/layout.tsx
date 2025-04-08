import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PMP - Solutions Informatiques Professionnelles",
  description: "PMP propose des solutions informatiques personnalisées, du conseil en matériel et une assistance technique complète pour votre entreprise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main style={{ paddingTop: '5rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
