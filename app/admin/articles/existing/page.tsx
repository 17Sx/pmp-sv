'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from '../articles.module.css';

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ExistingArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
    fetchArticles();
  }, [router]);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = (article: Article) => {
    router.push(`/admin/articles/edit/${article.slug}`);
  };

  return (
    <div className={styles.adminContainer}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.adminTitle}
      >
        Articles existants
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.articlesList}
      >
        {isLoading ? (
          <p>Chargement des articles...</p>
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <motion.div
              key={article.slug}
              className={styles.articleItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className={styles.articleInfo}>
                <h3>{article.title}</h3>
                <p>Statut: {article.status}</p>
                <p>Dernière modification: {new Date(article.updated_at).toLocaleDateString()}</p>
              </div>
              <div className={styles.articleActions}>
                <button
                  onClick={() => handleEdit(article)}
                  className={styles.editButton}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(article.slug)}
                  className={styles.deleteButton}
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </motion.div>
    </div>
  );
} 