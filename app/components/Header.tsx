'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

    // Fermer le menu si on redimensionne l'écran
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`${styles.header} ${isDark ? styles.headerDark : ''} ${isMenuOpen ? styles.headerMobileOpen : ''}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img 
            src="/img/logo.png" 
            alt="Logo PMP" 
            className={styles.logo}
          />
        </Link>
      </div>
      
      <div className={styles.mobileMenuToggle} onClick={toggleMenu}>
        <span className={`${styles.menuBar} ${isMenuOpen ? styles.menuBarActive : ''}`}></span>
      </div>
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navMobileOpen : ''}`}>
        <Link href="/articles" className={styles.navLink} onClick={closeMenu}>
          Articles
        </Link>
        <Link href="#solutions" className={styles.navLink} onClick={closeMenu}>
          Nos solutions
        </Link>
        <Link href="#about" className={styles.navLink} onClick={closeMenu}>
        À propos
        </Link>
        <Link href="#ceo" className={styles.navLink} onClick={closeMenu}>
          Notre équipe
        </Link>
        <Link href="#telechargement" className={styles.navLink} onClick={closeMenu}>
          Téléchargements
        </Link>
        <Link href="#contact" className={styles.navLink} onClick={closeMenu}>
          Contact
        </Link>
      </nav>
    </header>
  )
} 