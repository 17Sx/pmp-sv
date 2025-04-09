'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../page.module.css'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement
            const isContactSection = section.id === 'contact'
            setIsDark(isContactSection)
          }
        })
      },
      {
        rootMargin: '-100px 0px 0px 0px',
        threshold: 0.1
      }
    )

    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <header className={`${styles.header} ${isDark ? styles.headerDark : ''}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image 
            src="/img/logo.png" 
            alt="Logo" 
            width={120} 
            height={40} 
            priority
            className={styles.logo}
          />
        </Link>
      </div>
      
      <nav className={styles.nav}>
        <Link href="#solutions" className={styles.navLink}>
          Nos solutions
        </Link>
        <Link href="#about" className={styles.navLink}>
          A propos
        </Link>
        <Link href="#ceo" className={styles.navLink}>
          Notre equipe
        </Link>
        <Link href="#contact" className={styles.navLink}>
          Contact
        </Link>
        <Link href="#telechargement" className={styles.navLink}>
          Téléchargement
        </Link>
      </nav>
    </header>
  )
} 