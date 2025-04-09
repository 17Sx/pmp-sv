'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import styles from '../../articles.module.css';

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
}

export default function EditArticle({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    fetchArticle();
  }, [params.slug, router]);

  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/articles/${params.slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement de l\'article');
      }

      setArticle(data.article);
    } catch (error) {
      setError('Erreur lors du chargement de l\'article');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'article');
      }

      router.push('/admin/articles/existing');
    } catch (error) {
      setError('Erreur lors de la mise à jour de l\'article');
      console.error('Erreur:', error);
    }
  };

  if (isLoading) {
    return <div className={styles.adminContainer}>Chargement...</div>;
  }

  if (error) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.error}>Article non trouvé</div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Modifier l'article</h1>
      
      <form onSubmit={handleSubmit} className={styles.articleForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            value={article.slug}
            onChange={(e) => setArticle({ ...article, slug: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Contenu</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={article.content}
            onEditorChange={(content) => setArticle({ ...article, content })}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Statut</label>
          <select
            id="status"
            value={article.status}
            onChange={(e) => setArticle({ ...article, status: e.target.value })}
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Enregistrer les modifications
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/articles/existing')}
            className={styles.cancelButton}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
} 