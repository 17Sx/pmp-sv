'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  banner_image: string | null;
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles/latest');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des articles');
        }
        const data = await response.json();
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        setError('Impossible de charger les articles');
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (isLoading) {
    return (
      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <div className={styles.noArticles}>
            <p>Chargement des articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <div className={styles.noArticles}>
            <p>Une erreur est survenue</p>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.articlesSection}>
      <div className={styles.articlesContainer}>
        <div className={styles.articlesHeader}>
          <h2 className={styles.articlesTitle}>Derniers articles</h2>
          <p className={styles.articlesSubtitle}>
            Découvrez nos derniers articles et actualités sur la gestion de projet et le management
          </p>
        </div>

        {articles.length > 0 ? (
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <article key={article.id} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <Image
                    src={article.banner_image || "/img/about.jpg"}
                    alt={article.title}
                    className={styles.articleImg}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.articleContent}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleDescription}>
                    {stripHtml(article.content).substring(0, 150)}...
                  </p>
                  <div className={styles.articleMeta}>
                    <time className={styles.articleDate} dateTime={article.created_at}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {formatDate(article.created_at)}
                    </time>
                    <Link href={`/articles/${article.slug}`} className={styles.articleLink}>
                      Lire la suite
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.noArticles}>
            <p>Aucun article disponible pour le moment</p>
            <p>Revenez bientôt pour découvrir nos nouveaux contenus</p>
          </div>
        )}

        <div className={styles.articlesFooter}>
          <Link href="/articles" className={styles.articlesButton}>
            Voir tous les articles
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 