'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Import dynamique du composant Three.js pour éviter les erreurs SSR
const HeroCanvas = dynamic(() => import('./components/HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      borderRadius: '20px',
      background: '#F8FAFC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className={styles.loadingSpinner}></div>
    </div>
  )
})

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      <motion.header 
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerContainer}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.logoContainer}>
              <Image
                src="/img/logo.png"
                alt="PMP Logo"
                width={120}
                height={40}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </motion.div>
          <nav className={styles.nav}>
            <motion.a 
              href="#services" 
              className={styles.navLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Services
            </motion.a>
            <motion.a 
              href="#about" 
              className={styles.navLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              À propos
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className={styles.navLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Témoignages
            </motion.a>
            <motion.a 
              href="#contact" 
              className={styles.navLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.a>
          </nav>
        </div>
      </motion.header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.heroLeft}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/img/logo.png"
              alt="PMP Logo"
              width={180}
              height={45}
              className={styles.heroLogo}
              priority
            />
            <h1 className={styles.heroTitle}>
              Solutions Informatiques Professionnelles
            </h1>
            <p className={styles.heroText}>
              Nous accompagnons les entreprises dans leur transformation digitale avec des solutions sur mesure et un support personnalisé.
            </p>
            <div className={styles.heroButtons}>
              <motion.a
                href="#contact"
                className={styles.btnPrimary}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contactez-nous
              </motion.a>
              <motion.a
                href="#services"
                className={styles.btnSecondary}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Nos Services
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className={styles.heroRight}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ width: '100%', height: '500px' }}>
              <HeroCanvas />
            </div>
            <div className={`${styles.heroShape} ${styles.shape1}`} />
            <div className={`${styles.heroShape} ${styles.shape2}`} />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Nos Services</h2>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>À propos de nous</h2>
          <div className={styles.aboutSection}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/svg/about.svg"
                alt="À propos"
                width={600}
                height={400}
                className={styles.aboutImage}
              />
            </motion.div>
            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className={styles.aboutText}>
                PMP est une entreprise spécialisée dans les solutions informatiques professionnelles. Avec plus de 10 ans d'expérience, nous accompagnons les entreprises dans leur transformation digitale.
              </p>
              <p className={styles.aboutText}>
                Notre équipe d'experts est à votre disposition pour vous proposer des solutions sur mesure adaptées à vos besoins spécifiques.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Témoignages</h2>
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

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <h2 className={styles.sectionTitle}>Contactez-nous</h2>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Nom</label>
              <input
                type="text"
                id="name"
                className={styles.formInput}
                placeholder="Votre nom"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                placeholder="Votre email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message</label>
              <textarea
                id="message"
                className={`${styles.formInput} ${styles.formTextarea}`}
                placeholder="Votre message"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Envoyer
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div>
            <Image
              src="/img/logo.png"
              alt="PMP Logo"
              width={150}
              height={50}
              className={styles.footerLogo}
            />
            <p className={styles.footerText}>
              Solutions informatiques professionnelles pour les entreprises.
            </p>
          </div>
          <div>
            <h3 className={styles.footerTitle}>Liens rapides</h3>
            <div className={styles.footerLinks}>
              <a href="#services" className={styles.footerLink}>Services</a>
              <a href="#about" className={styles.footerLink}>À propos</a>
              <a href="#testimonials" className={styles.footerLink}>Témoignages</a>
              <a href="#contact" className={styles.footerLink}>Contact</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerTitle}>Contact</h3>
            <div className={styles.footerContact}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@pmp.fr</span>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Rue de la Paix, 75000 Paris</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} PMP. Tous droits réservés.
        </div>
      </footer>
    </main>
  )
}

const services = [
  {
    title: 'Support Informatique',
    description: 'Assistance technique et maintenance préventive pour garantir le bon fonctionnement de vos systèmes.'
  },
  {
    title: 'Développement Web',
    description: 'Création de sites web et applications sur mesure pour répondre à vos besoins spécifiques.'
  },
  {
    title: 'Sécurité Informatique',
    description: 'Protection de vos données et systèmes contre les menaces cybernétiques.'
  }
]

const testimonials = [
  {
    name: 'Jean Dupont',
    role: 'Directeur Général, Entreprise XYZ',
    text: 'PMP a transformé notre infrastructure informatique. Leur expertise et leur réactivité sont exceptionnelles.'
  },
  {
    name: 'Marie Martin',
    role: 'Responsable IT, Société ABC',
    text: 'Un partenaire de confiance qui comprend nos besoins et propose des solutions adaptées.'
  },
  {
    name: 'Pierre Durand',
    role: 'CEO, Startup 123',
    text: 'Leur approche professionnelle et leur expertise technique ont été déterminantes pour notre croissance.'
  }
]
