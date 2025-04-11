-- Créer la table pour les abonnés à la newsletter
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Ajouter l'index sur l'email pour des recherches plus rapides
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
-- Ajouter le champ sent_in_newsletter à la table articles existante
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS sent_in_newsletter BOOLEAN NOT NULL DEFAULT FALSE;
-- Créer une fonction pour mettre à jour le champ updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Créer un trigger pour mettre à jour automatiquement le champ updated_at
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE
UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();