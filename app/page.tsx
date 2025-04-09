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
import DownloadSection from './components/DownloadSection'

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
              <Link href="#contact" className={styles.btnPrimary}>
                Nous contacter
              </Link>
              <Link href="#solutions" className={styles.btnSecondary}>
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
      <DownloadSection />
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


