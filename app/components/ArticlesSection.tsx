'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: Date;
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles/latest');
        const data = await response.json();
        console.log('Réponse API:', data);
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau:', data);
          setArticles([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <div className={styles.articlesHeader}>
            <h2 className={styles.articlesTitle}>
              Nos derniers <span className={styles.highlight}>articles</span>
            </h2>
            <p className={styles.articlesSubtitle}>
              Chargement...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.articlesSection}>
      <div className={styles.articlesContainer}>
        <div className={styles.articlesHeader}>
          <h2 className={styles.articlesTitle}>
            Nos derniers <span className={styles.highlight}>articles</span>
          </h2>
          <p className={styles.articlesSubtitle}>
            Restez informé des dernières actualités et tendances en informatique
          </p>
        </div>

        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.id} className={styles.articleCard}>
              <div className={styles.articleImage}>
              </div>
              <div className={styles.articleContent}>
                <div className={styles.articleDate}>
                  {new Date(article.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleDescription}>
                  {article.content.substring(0, 150)}...
                </p>
                <div className={styles.articleLink}>
                  Lire l&apos;article
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.articlesFooter}>
          <Link href="/articles" className={styles.articlesButton}>
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
} 