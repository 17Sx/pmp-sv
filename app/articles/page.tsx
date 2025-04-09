'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './articles.module.css';
import Footer from '../components/Footer';

import Header from '../components/Header';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';



interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
  created_at: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');
        const data = await response.json();
        // Filtrer pour n'afficher que les articles publiés
        setArticles(data.articles?.filter((article: Article) => article.status === 'published') || []);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.articlesContainer}>

        <div className={styles.backbtn}>
          <Link href="/">
            <ArrowLeftIcon className="w-5 h-5" />
            Retour
          </Link>
        </div>


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.pageTitle}
        >
          Nos Articles
        </motion.h1>

        <div className={styles.articlesGrid}>
          {isLoading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.loading}
            >
              Chargement des articles...
            </motion.p>
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.articleCard}
              >
                <h2>{article.title}</h2>
                <div className={styles.articleDate}>
                  <span>
                    {new Date(article.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className={styles.articleExcerpt}>
                  {article.content.length > 200
                    ? `${article.content.substring(0, 200)}...`
                    : article.content}
                </p>
                <a href={`/articles/${article.slug}`} className={styles.readMore}>
                  Lire la suite
                </a>
              </motion.article>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.noArticles}
            >
              Aucun article disponible pour le moment.
            </motion.p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 