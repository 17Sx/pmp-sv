'use client'

import { useRef, useEffect } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import AboutSection from './components/AboutSection'
import CEOSection from './components/CEOSection'
import TestimonialsSection from './components/TestimonialsSection'
import BackgroundShapes from './components/BackgroundShapes'
import SolutionsSection from './components/SolutionsSection'
import ContactSection from './components/ContactSection'

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
      <BackgroundShapes />
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
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
      </section>

      <SolutionsSection />
      <AboutSection />
      <CEOSection />
      <TestimonialsSection />
      
      <ContactSection />


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
                Solutions
              </a>
              <a href="#about" className={styles.footerLink}>
                À propos
              </a>
              <a href="#contact" className={styles.footerLink}>
                Contact
              </a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerTitle}>Contact</h3>
            <div className={styles.footerContact}>
              <div className={styles.contactItem}>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className={styles.contactItem}>
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
    description: 'Développement d\'applications sur mesure répondant précisément à vos besoins métier.',
    icon: (
      <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
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
