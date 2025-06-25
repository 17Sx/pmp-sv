import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminFloatingButton from './components/AdminFloatingButton';

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "PMP - Solutions Informatiques Professionnelles",
  description: "PMP vous accompagne dans votre transformation digitale avec des solutions sur mesure et un support technique de qualité.",
  icons: [
    { rel: 'icon', url: 'http://server.pmp.fr/pmp/icon/logo.png', type: 'image/png' },
    { rel: 'apple-touch-icon', url: 'http://server.pmp.fr/pmp/icon/logo.png', type: 'image/png' },
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
        <link rel="icon" href="http://server.pmp.fr/pmp/icon/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="http://server.pmp.fr/pmp/icon/logo.png" type="image/png" />
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body className={inter.className}>
        <main style={{ paddingTop: '5rem' }}>
          {children}
        </main>
        <AdminFloatingButton />
      </body>
    </html>
  );
}
