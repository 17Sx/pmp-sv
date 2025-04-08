'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../page.module.css';

const testimonials = [
  {
    name: "Pierre Martin",
    role: "Directeur de Projet",
    text: "PMP a transformé notre approche de la gestion de projet. Leur expertise et leur professionnalisme sont exceptionnels."
  },
  {
    name: "Sophie Dubois",
    role: "Chef de Projet",
    text: "Une collaboration remarquable avec l'équipe PMP. Leurs solutions sont innovantes et efficaces."
  },
  {
    name: "Thomas Leroy",
    role: "Directeur Technique",
    text: "PMP a su relever tous les défis de notre projet complexe. Un partenaire de confiance."
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.sectionContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Témoignages
        </motion.h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <div className={styles.testimonialAuthor}>
                <Image
                  src={`/svg/testimonial-${index + 1}.svg`}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className={styles.testimonialImage}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 