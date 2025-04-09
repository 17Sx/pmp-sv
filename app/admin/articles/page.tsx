'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './articles.module.css';

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ArticlesAdmin() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    status: 'draft'
  });

  // Vérifier l'authentification
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
  }, [router]);

  // Charger les articles
  useEffect(() => {
    fetchArticles();
  }, []);

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

  // Créer un article
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', content: '', slug: '', status: 'draft' });
        fetchArticles();
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  // Mettre à jour un article
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;

    try {
      const response = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
        setSelectedArticle(null);
        setFormData({ title: '', content: '', slug: '', status: 'draft' });
        fetchArticles();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  // Supprimer un article
  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
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
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      slug: article.slug,
      status: article.status
    });
    setIsEditing(true);
  };

  return (
    <div className={styles.adminContainer}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.adminTitle}
      >
        Gestion des Articles
      </motion.h1>

      <div className={styles.adminContent}>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.articleForm}
          onSubmit={isEditing ? handleUpdate : handleCreate}
        >
          <h2>{isEditing ? 'Modifier l\'article' : 'Nouvel article'}</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Contenu</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={10}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {isEditing ? 'Mettre à jour' : 'Créer'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setSelectedArticle(null);
                  setFormData({ title: '', content: '', slug: '', status: 'draft' });
                }}
                className={styles.cancelButton}
              >
                Annuler
              </button>
            )}
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.articlesList}
        >
          <h2>Articles existants</h2>
          {isLoading ? (
            <p>Chargement des articles...</p>
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <motion.div
                key={article.id}
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
                    onClick={() => handleDelete(article.id)}
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
    </div>
  );
} 