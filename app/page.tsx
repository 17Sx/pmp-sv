'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play failed:', error)
      })
    }
  }, [])

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <Image 
              src="/img/logo.png" 
              alt="Logo" 
              width={150} 
              height={50} 
              className={styles.heroLogo}
            />
            <h1 className={styles.heroTitle}>
              Solutions informatiques<br />
              <span className={styles.highlight}>professionnelles</span>
            </h1>
            <p className={styles.heroText}>
              PMP vous accompagne dans votre transformation digitale avec des solutions sur mesure et un support technique de qualité.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className={styles.btnPrimary}>
                Nous contacter
              </Link>
              <Link href="/solutions" className={styles.btnSecondary}>
                Nos solutions
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <video
              ref={videoRef}
              className={styles.heroVideo}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/img/light-v4.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="solutions" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Nos Solutions</h2>
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
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
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
          <h2 className={styles.sectionTitle}>Qu&apos;est-ce que PMP ?</h2>
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
                PMP est une entreprise spécialisée dans les solutions informatiques professionnelles. Nous proposons une gamme complète de services pour répondre à tous vos besoins informatiques.
              </p>
              <p className={styles.aboutText}>
                Notre expertise couvre l&apos;étude de vos besoins, le développement d&apos;applications personnalisées, le conseil en matériel, la formation des utilisateurs, et l&apos;assistance technique.
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
              <label htmlFor="name" className={styles.formLabel}>
                <svg className={styles.formIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Nom
              </label>
              <input
                type="text"
                id="name"
                className={styles.formInput}
                placeholder="Votre nom"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                <svg className={styles.formIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                placeholder="Votre email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                <svg className={styles.formIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Message
              </label>
              <textarea
                id="message"
                className={`${styles.formInput} ${styles.formTextarea}`}
                placeholder="Votre message"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
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
              <a href="#solutions" className={styles.footerLink}>
                <svg className={styles.footerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Solutions
              </a>
              <a href="#about" className={styles.footerLink}>
                <svg className={styles.footerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                À propos
              </a>
              <a href="#contact" className={styles.footerLink}>
                <svg className={styles.footerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </a>
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
    title: 'Étude de vos besoins',
    description: 'Analyse complète de vos besoins informatiques pour proposer des solutions adaptées à votre entreprise.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: 'Applications personnalisées',
    description: 'Développement d&apos;applications sur mesure répondant précisément à vos besoins métier.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: 'Conseil en matériel',
    description: 'Expertise pour le choix du matériel informatique le plus adapté à vos besoins.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    title: 'Formation des utilisateurs',
    description: 'Formation complète de tous les utilisateurs pour une utilisation optimale des solutions.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Hot-line et assistance',
    description: 'Support technique réactif et assistance continue pour garantir le bon fonctionnement de vos systèmes.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: 'Hébergement sécurisé',
    description: 'Hébergement de vos données en toute confidentialité avec des solutions sécurisées.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
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
