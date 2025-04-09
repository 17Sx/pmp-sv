'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../page.module.css';

interface Client {
  id: number;
  name: string;
  logo: string;
}

const clients: Client[] = [
  { id: 1, name: 'Sofip', logo: '/img/logo/sofip.png' },
  { id: 2, name: 'Bailleul', logo: '/img/logo/bailleul.jpg' },
  { id: 3, name: 'ULabs', logo: '/img/logo/ulabs.avif' },
  { id: 4, name: 'IPRAD', logo: '/img/logo/iprad.jpg' },
  { id: 5, name: 'Procter & Gamble', logo: '/img/logo/procteretgamble.png' },
  { id: 6, name: 'H&h', logo: '/img/logo/heth.jpg' },
  { id: 7, name: 'Forte Pharma', logo: '/img/logo/fortepharma.png' },
  { id: 8, name: 'Bayer', logo: '/img/logo/bayer.png' },
  { id: 9, name: 'Santarome', logo: '/img/logo/santarome.webp' },
  { id: 10, name: 'Garancia', logo: '/img/logo/garancia.jpg' },
];

export default function ClientCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.clientsSection}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.clientsTitle}
      >
        Les entreprises qui nous font confiance
      </motion.h2>
      
      <div className={styles.clientsCarousel}>
        <div className={styles.clientsTrack}>
          {[...clients, ...clients].map((client, index) => (
            <motion.div
              key={`${client.id}-${index}`}
              className={styles.clientCard}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className={styles.clientLogo}
              />
              <span className={styles.clientName}>{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 