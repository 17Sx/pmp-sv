'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './article.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.slug}`);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) {
            setError('Article non trouvé');
          } else {
            setError('Erreur lors du chargement de l\'article');
          }
          return;
        }

        if (data.article) {
          setArticle(data.article);
        } else {
          setError('Article non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article:', error);
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className={styles.articleContainer}>
        <div className={styles.articleLoading}>
          Chargement de l'article...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.articleContainer}>
        <div className={styles.articleError}>
          <h2>{error}</h2>
          <Link href="/articles" className={styles.backLink}>
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.articleContainer}>
        <div className={styles.articleError}>
          <h2>Article non trouvé</h2>
          <Link href="/articles" className={styles.backLink}>
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.articleContainer}>
        <div className={styles.backbtn}>
          <Link href="/articles">
            <ArrowLeftIcon className="w-5 h-5" />
            Retour
          </Link>
        </div>

        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <div className={styles.articleMeta}>
              <time dateTime={article.created_at}>
                Publié le {formatDate(article.created_at)}
              </time>
              {article.updated_at !== article.created_at && (
                <time dateTime={article.updated_at}>
                  Mis à jour le {formatDate(article.updated_at)}
                </time>
              )}
            </div>
          </header>

          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
} 