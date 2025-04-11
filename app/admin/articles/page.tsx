'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import styles from './articles.module.css';

interface BlobInfo {
  blob: () => Blob;
  filename: () => string;
}

export default function NewArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    status: 'draft',
    sendNewsletter: false
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePositions, setImagePositions] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleImagePositionChange = (fileName: string, position: number) => {
    setImagePositions(prev => ({
      ...prev,
      [fileName]: position
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('sendNewsletter', formData.sendNewsletter.toString());
      
      images.forEach((image, index) => {
        formDataToSend.append('images', image);
        formDataToSend.append(`image_positions[${image.name}]`, imagePositions[image.name]?.toString() || '0');
      });

      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Article créé avec succès' + (formData.sendNewsletter ? ' et newsletter programmée' : '')
        });
        
        // Si l'article est publié et que l'option newsletter est activée, on envoie la newsletter
        if (formData.status === 'published' && formData.sendNewsletter && data.article?.id) {
          await fetch('/api/newsletter/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              articleId: data.article.id
            }),
          });
        }

        // Redirection après un court délai pour montrer le message de succès
        setTimeout(() => {
          router.push('/admin/articles/existing');
        }, 1500);
      } else {
        throw new Error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erreur lors de la création de l\'article'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.adminTitle}
      >
        Nouvel article
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.articleForm}
        onSubmit={handleCreate}
      >
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
          <label htmlFor="slug">Slug (lien permettant d'accéder à l'article)</label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>

        
        <div className={styles.formGroup}>
          <label htmlFor="images">Images de banniere</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {images.length > 0 && (
            <div className={styles.imagePreviews}>
              {images.map((image, index) => (
                <div key={index} className={styles.imagePreview}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className={styles.previewImage}
                  />
                  <div className={styles.imagePosition}>
                    <label>Position dans l&apos;article:</label>
                    <input
                      type="number"
                      value={imagePositions[image.name] || 0}
                      onChange={(e) => handleImagePositionChange(image.name, parseInt(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Contenu</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={formData.content}
            onEditorChange={(content: string) => setFormData({ ...formData, content })}
            init={{
              height: 600,
              width: '100%',
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | image',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; }',
              images_upload_url: '/api/upload',
              automatic_uploads: true,
              file_picker_types: 'image',
              images_upload_handler: async (blobInfo: BlobInfo, progress: (percent: number) => void) => {
                const formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                
                const response = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData
                });
                
                const json = await response.json();
                return json.location;
              }
            }}
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

        <div className={styles.formGroup}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="sendNewsletter"
              checked={formData.sendNewsletter}
              onChange={(e) => setFormData({ ...formData, sendNewsletter: e.target.checked })}
              className={styles.formCheckbox}
            />
            <label htmlFor="sendNewsletter" className={styles.checkboxLabel}>
              Envoyer cet article aux abonnés de la newsletter {formData.status !== 'published' && "(uniquement si l'article est publié)"}
            </label>
          </div>
          {formData.sendNewsletter && formData.status !== 'published' && (
            <p className={styles.newsletterWarning}>
              L'article sera envoyé aux abonnés seulement s'il est publié.
            </p>
          )}
        </div>

        {submitStatus && (
          <div className={submitStatus.type === 'success' ? styles.success : styles.error}>
            {submitStatus.message}
          </div>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Création en cours...' : 'Créer l\'article'}
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
      </motion.form>
    </div>
  );
} 