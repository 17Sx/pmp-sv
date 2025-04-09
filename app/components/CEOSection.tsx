'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../page.module.css';

const CEOSection = () => {
  const ceos = [
    {
      name: "M. Vincent FERLANDE",
      role: "Président",
      image: "/images/jean-philippe-palm.jpg",
      description: "Fondateur et Président de PMP, expert en gestion de projet avec plus de 20 ans d'expérience."
    },
    {
      name: "M. Pierre GUIEU",
      role: "Directrice Générale",
      image: "/img/pierre.jpeg",
      description: "Fondateur et Président de PMP, expert en gestion de projet avec plus de 20 ans d'expérience."
    }
  ];

  return (
    <section id="ceo" className={styles.ceoSection}>
      <div className={styles.container}>
        <div className={styles.ceoGrid}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.ceoTitle}
          >
            Notre Équipe de Direction
          </motion.h2>
          
          {ceos.map((ceo, index) => (
            <motion.div
              key={index}
              className={styles.ceoCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={styles.ceoImageContainer}>
                <Image
                  src={ceo.image}
                  alt={ceo.name}
                  width={300}
                  height={400}
                  className={styles.ceoImage}
                />
              </div>
              <div className={styles.ceoInfo}>
                <h3 className={styles.ceoName}>{ceo.name}</h3>
                <p className={styles.ceoRole}>{ceo.role}</p>
                <p className={styles.ceoDescription}>{ceo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CEOSection; 