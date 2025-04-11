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
  sentInNewsletter?: boolean;
}

export default function EditArticle({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendNewsletter, setSendNewsletter] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    
    setIsSubmitting(true);
    setError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch(`/api/articles/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...article,
          sendNewsletter
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la mise à jour de l\'article');
      }

      // Si l'article est publié et que l'option newsletter est activée
      if (article.status === 'published' && sendNewsletter && article.id) {
        await fetch('/api/newsletter/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            articleId: article.id,
          }),
        });
      }

      setSubmitSuccess(true);
      
      // Redirection après un court délai pour montrer le message de succès
      setTimeout(() => {
        router.push('/admin/articles/existing');
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erreur lors de la mise à jour de l\'article');
      }
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className={styles.adminContainer}>Chargement...</div>;
  }

  if (error && !submitSuccess) {
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
          <label htmlFor="slug">Slug (lien permettant d'accéder à l'article)</label>
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
            onEditorChange={(content: string) => setArticle({ ...article, content })}
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

        <div className={styles.formGroup}>
          {!article.sentInNewsletter ? (
            <button
              type="button"
              className={styles.newsletterButton}
              onClick={async () => {
                if (article.status === 'published' && article.id) {
                  setIsSubmitting(true);
                  try {
                    const response = await fetch('/api/newsletter/send', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        articleId: article.id,
                      }),
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                      setSubmitSuccess(true);
                      setSendNewsletter(true);
                      // Recharger l'article pour mettre à jour son statut
                      fetchArticle();
                      setTimeout(() => {
                        setSubmitSuccess(false);
                      }, 3000);
                    } else {
                      throw new Error(data.error || 'Erreur lors de l\'envoi de la newsletter');
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      setError(error.message);
                    } else {
                      setError('Erreur lors de l\'envoi de la newsletter');
                    }
                    console.error('Erreur:', error);
                  } finally {
                    setIsSubmitting(false);
                  }
                }
              }}
              disabled={isSubmitting || article.status !== 'published'}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer cet article aux abonnés de la newsletter'}
            </button>
          ) : (
            <p className={styles.newsletterStatus}>
              Cet article a déjà été envoyé aux abonnés de la newsletter.
            </p>
          )}
          {article.status !== 'published' && !article.sentInNewsletter && (
            <p className={styles.newsletterWarning}>
              L'article doit être publié pour pouvoir envoyer la newsletter.
            </p>
          )}
        </div>

        {submitSuccess && sendNewsletter && (
          <div className={styles.success}>
            Newsletter envoyée avec succès !
          </div>
        )}

        {submitSuccess && !sendNewsletter && (
          <div className={styles.success}>
            Article mis à jour avec succès
          </div>
        )}

        {error && (
          <div className={styles.error}>{error}</div>
        )}

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/articles/existing')}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
} 