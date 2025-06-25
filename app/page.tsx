'use client'

import { useRef, useEffect } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import BackgroundShapes from './components/BackgroundShapes'
import SolutionsSection from './components/SolutionsSection'
import ContactSection from './components/ContactSection'
import DownloadSection from './components/DownloadSection'
import ClientCarousel from './components/ClientCarousel'
import ArticlesSection from './components/ArticlesSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'

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
              <span className={styles.highlight}>Palm Managing Project (PMP)</span>
            </h1>

            <h3 className={styles.heroSubtitle}>
              Accélérez votre performance commerciale en pharmacie
            </h3>

            <p className={styles.heroText}>
            PMP accompagne les directions commerciales de laboratoires pharmaceutiques et de groupements d'officines dans l'optimisation de leur efficacité terrain, grâce à des solutions digitales sur mesure.
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

      <AboutSection />  
      <SolutionsSection />
      <ClientCarousel />
      <TestimonialsSection />
      <ArticlesSection />
      <DownloadSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


