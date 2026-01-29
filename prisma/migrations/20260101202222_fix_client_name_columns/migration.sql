-- Migration pour remplacer la colonne `name` par `firstName` et `lastName`
-- Vérifier si la colonne `name` existe et la remplacer
DO $$
BEGIN
  -- Si la colonne `name` existe, la supprimer après avoir créé firstName et lastName
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Client' AND column_name = 'name'
  ) THEN
    -- Ajouter les nouvelles colonnes si elles n'existent pas
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Client' AND column_name = 'firstName'
    ) THEN
      ALTER TABLE "Client" ADD COLUMN "firstName" TEXT;
    END IF;
    
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Client' AND column_name = 'lastName'
    ) THEN
      ALTER TABLE "Client" ADD COLUMN "lastName" TEXT;
    END IF;
    
    -- Copier les données de `name` vers `firstName` et `lastName` si possible
    UPDATE "Client" 
    SET "firstName" = SPLIT_PART("name", ' ', 1),
        "lastName" = CASE 
          WHEN POSITION(' ' IN "name") > 0 
          THEN SUBSTRING("name" FROM POSITION(' ' IN "name") + 1)
          ELSE ''
        END
    WHERE "name" IS NOT NULL AND ("firstName" IS NULL OR "lastName" IS NULL);
    
    -- Supprimer l'ancienne colonne `name`
    ALTER TABLE "Client" DROP COLUMN "name";
  END IF;
  
  -- S'assurer que firstName et lastName sont NOT NULL si la table est vide ou après migration
  IF NOT EXISTS (SELECT 1 FROM "Client" LIMIT 1) THEN
    ALTER TABLE "Client" ALTER COLUMN "firstName" SET NOT NULL;
    ALTER TABLE "Client" ALTER COLUMN "lastName" SET NOT NULL;
  END IF;
END $$;

