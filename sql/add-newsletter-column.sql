-- Ajouter la colonne sent_in_newsletter à la table articles
ALTER TABLE articles
ADD COLUMN sent_in_newsletter BOOLEAN NOT NULL DEFAULT FALSE;