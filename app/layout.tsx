import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor2 from './components/CustomCursor2';
import AdminFloatingButton from './components/AdminFloatingButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PMP - Solutions Informatiques Professionnelles",
  description: "PMP vous accompagne dans votre transformation digitale avec des solutions sur mesure et un support technique de qualité.",
  icons: [
    { rel: 'icon', url: '/img/logo.png', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/img/logo.png', type: 'image/png' },
  ],
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
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
        <meta name="theme-color" content="#1E3A8A" />
      </head>
      <body className={inter.className}>
        <CustomCursor2 />
        <main style={{ paddingTop: '5rem' }}>
          {children}
        </main>
        <AdminFloatingButton />
      </body>
    </html>
  );
}
