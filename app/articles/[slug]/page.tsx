import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';


interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
}



export default async function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    console.log('Recherche de l\'article avec le slug:', params.slug);
    const results = await query(
      'SELECT * FROM articles WHERE slug = ? AND status = ?',
      [params.slug, 'published']
    );

    console.log('Résultats de la requête:', results);

    if (!Array.isArray(results) || results.length === 0) {
      console.log('Aucun article trouvé');
      notFound();
    }

    const article = results[0] as Article;
    console.log('Article trouvé:', article);

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

          <div className={styles.articleContent}>
            <header className={styles.articleHeader}>
              <h1 className={styles.articleTitle}>{article.title}</h1>
              <div className={styles.articleMeta}>
                <div className={styles.articleDate}>
                  <span>
                    Publié le {new Date(article.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </header>
            <div 
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération de l\'article:', error);
    notFound();
  }
} 