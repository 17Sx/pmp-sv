import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor2 from './components/CustomCursor2';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PMP - Solutions Informatiques Professionnelles",
  description: "PMP vous accompagne dans votre transformation digitale avec des solutions sur mesure et un support technique de qualité.",
  icons: [
    { rel: 'icon', url: '/img/logo.png', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/img/logo.png', type: 'image/png' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/img/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/img/logo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <CustomCursor2 />
        <main style={{ paddingTop: '5rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
