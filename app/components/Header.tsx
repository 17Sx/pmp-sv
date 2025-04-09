'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
          <img 
            src="/img/logo.png" 
            alt="Logo PMP" 
            className={styles.logo}
          />
        </Link>
      </div>
      
      <nav className={styles.nav}>
        <Link href="/articles" className={styles.navLink}>
          Articles
        </Link>
        <Link href="#solutions" className={styles.navLink}>
          Nos solutions
        </Link>
        <Link href="#about" className={styles.navLink}>
          A propos
        </Link>
        <Link href="#ceo" className={styles.navLink}>
          Notre equipe
        </Link>
        <Link href="#telechargement" className={styles.navLink}>
          Téléchargement
        </Link>
        <Link href="#contact" className={styles.navLink}>
          Contact
        </Link>
      </nav>
    </header>
  )
} 