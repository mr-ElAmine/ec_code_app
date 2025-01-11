# Projet Symfony avec Base de Données Catégories et Livres

## Prérequis

- PHP ≥7.4
- Composer
- Symfony CLI
- Node.js avec Yarn
- Une base de données configurée (MySQL, PostgreSQL, etc.)

## Installation

1. Clonez ce répertoire :

   ```bash
   git clone https://github.com/mr-ElAmine/ec_code_app
   cd ec_code_app
   ```

2. Installez les dépendances PHP :

   ```bash
   composer install
   ```

3. Installez les dépendances JavaScript :

   ```bash
   yarn
   ```

4. Configurez votre environnement en créant un fichier `.env` à partir de `.env.example` et en remplissant les informations de connexion à votre base de données.

   Exemple :

   ```env
   DATABASE_URL="mysql://user:password@127.0.0.1:3306/database_name"
   ```

## Configuration et Migration

1. Créez la base de données :

   ```bash
   php bin/console doctrine:database:create
   ```

2. Générez les fichiers de migration :

   ```bash
   php bin/console make:migration
   ```

3. Exécutez les migrations pour mettre à jour la base de données :
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

## Développement Frontend

1. Lancez la compilation des assets avec le mode watch :
   ```bash
   yarn encore dev --watch
   ```

## Lancer le Serveur

1. Démarrez le serveur Symfony :
   ```bash
   symfony server:start
   ```

Le projet sera disponible à l'adresse : `http://127.0.0.1:8000`

## Insertion de Données de Test

Pour ajouter des données de test dans la base de données, utilisez les commandes SQL suivantes :

### Catégories

```sql
INSERT INTO category (id, name, description, created_at, updated_at)
VALUES
(1, 'Category 1', 'Description for Category 1', NOW(), NOW()),
(2, 'Category 2', 'Description for Category 2', NOW(), NOW()),
(3, 'Category 3', 'Description for Category 3', NOW(), NOW()),
(4, 'Category 4', 'Description for Category 4', NOW(), NOW()),
(5, 'Category 5', 'Description for Category 5', NOW(), NOW()),
(6, 'Category 6', 'Description for Category 6', NOW(), NOW()),
(7, 'Category 7', 'Description for Category 7', NOW(), NOW()),
(8, 'Category 8', 'Description for Category 8', NOW(), NOW()),
(9, 'Category 9', 'Description for Category 9', NOW(), NOW()),
(10, 'Category 10', 'Description for Category 10', NOW(), NOW()),
(11, 'Category 11', 'Description for Category 11', NOW(), NOW()),
(12, 'Category 12', 'Description for Category 12', NOW(), NOW()),
(13, 'Category 13', 'Description for Category 13', NOW(), NOW()),
(14, 'Category 14', 'Description for Category 14', NOW(), NOW()),
(15, 'Category 15', 'Description for Category 15', NOW(), NOW()),
(16, 'Category 16', 'Description for Category 16', NOW(), NOW()),
(17, 'Category 17', 'Description for Category 17', NOW(), NOW()),
(18, 'Category 18', 'Description for Category 18', NOW(), NOW()),
(19, 'Category 19', 'Description for Category 19', NOW(), NOW()),
(20, 'Category 20', 'Description for Category 20', NOW(), NOW()),
(21, 'Category 21', 'Description for Category 21', NOW(), NOW()),
(22, 'Category 22', 'Description for Category 22', NOW(), NOW()),
(23, 'Category 23', 'Description for Category 23', NOW(), NOW()),
(24, 'Category 24', 'Description for Category 24', NOW(), NOW()),
(25, 'Category 25', 'Description for Category 25', NOW(), NOW()),
(26, 'Category 26', 'Description for Category 26', NOW(), NOW()),
(27, 'Category 27', 'Description for Category 27', NOW(), NOW()),
(28, 'Category 28', 'Description for Category 28', NOW(), NOW()),
(29, 'Category 29', 'Description for Category 29', NOW(), NOW()),
(30, 'Category 30', 'Description for Category 30', NOW(), NOW());
```

### Livres

```sql
INSERT INTO book (id, name, description, category_id, pages, publication_date, created_at, updated_at)
VALUES
(1, 'Book 1', 'Description of Book 1', 1, 100, '2025-01-01 12:00:00', NOW(), NOW()),
(2, 'Book 2', 'Description of Book 2', 1, 200, '2025-01-02 12:00:00', NOW(), NOW()),
(3, 'Book 3', 'Description of Book 3', 2, 150, '2025-01-03 12:00:00', NOW(), NOW()),
(4, 'Book 4', 'Description of Book 4', 2, 180, '2025-01-04 12:00:00', NOW(), NOW()),
(5, 'Book 5', 'Description of Book 5', 3, 120, '2025-01-05 12:00:00', NOW(), NOW()),
(6, 'Book 6', 'Description of Book 6', 3, 220, '2025-01-06 12:00:00', NOW(), NOW()),
(7, 'Book 7', 'Description of Book 7', 4, 300, '2025-01-07 12:00:00', NOW(), NOW()),
(8, 'Book 8', 'Description of Book 8', 4, 350, '2025-01-08 12:00:00', NOW(), NOW()),
(9, 'Book 9', 'Description of Book 9', 5, 250, '2025-01-09 12:00:00', NOW(), NOW()),
(10, 'Book 10', 'Description of Book 10', 5, 100, '2025-01-10 12:00:00', NOW(), NOW()),
(11, 'Book 11', 'Description of Book 11', 6, 150, '2025-01-11 12:00:00', NOW(), NOW()),
(12, 'Book 12', 'Description of Book 12', 6, 200, '2025-01-12 12:00:00', NOW(), NOW()),
(13, 'Book 13', 'Description of Book 13', 7, 220, '2025-01-13 12:00:00', NOW(), NOW()),
(14, 'Book 14', 'Description of Book 14', 7, 180, '2025-01-14 12:00:00', NOW(), NOW()),
(15, 'Book 15', 'Description of Book 15', 8, 240, '2025-01-15 12:00:00', NOW(), NOW()),
(16, 'Book 16', 'Description of Book 16', 8, 180, '2025-01-16 12:00:00', NOW(), NOW()),
(17, 'Book 17', 'Description of Book 17', 9, 200, '2025-01-17 12:00:00', NOW(), NOW()),
(18, 'Book 18', 'Description of Book 18', 9, 300, '2025-01-18 12:00:00', NOW(), NOW()),
(19, 'Book 19', 'Description of Book 19', 10, 350, '2025-01-19 12:00:00', NOW(), NOW()),
(20, 'Book 20', 'Description of Book 20', 10, 400, '2025-01-20 12:00:00', NOW(), NOW()),
(21, 'Book 21', 'Description of Book 21', 11, 100, '2025-01-21 12:00:00', NOW(), NOW()),
(22, 'Book 22', 'Description of Book 22', 11, 120, '2025-01-22 12:00:00', NOW(), NOW()),
(23, 'Book 23', 'Description of Book 23', 12, 150, '2025-01-23 12:00:00', NOW(), NOW()),
(24, 'Book 24', 'Description of Book 24', 12, 200, '2025-01-24 12:00:00', NOW(), NOW()),
(25, 'Book 25', 'Description of Book 25', 13, 250, '2025-01-25 12:00:00', NOW(), NOW()),
(26, 'Book 26', 'Description of Book 26', 13, 300, '2025-01-26 12:00:00', NOW(), NOW()),
(27, 'Book 27', 'Description of Book 27', 14, 350, '2025-01-27 12:00:00', NOW(), NOW()),
(28, 'Book 28', 'Description of Book 28', 14, 400, '2025-01-28 12:00:00', NOW(), NOW()),
(29, 'Book 29', 'Description of Book 29', 15, 450, '2025-01-29 12:00:00', NOW(), NOW()),
(30, 'Book 30', 'Description of Book 30', 15, 500, '2025-01-30 12:00:00', NOW(), NOW()),
(31, 'Book 31', 'Description of Book 31', 16, 150, '2025-01-31 12:00:00', NOW(), NOW()),
(32, 'Book 32', 'Description of Book 32', 16, 220, '2025-02-01 12:00:00', NOW(), NOW()),
(33, 'Book 33', 'Description of Book 33', 17, 300, '2025-02-02 12:00:00', NOW(), NOW()),
(34, 'Book 34', 'Description of Book 34', 17, 350, '2025-02-03 12:00:00', NOW(), NOW()),
(35, 'Book 35', 'Description of Book 35', 18, 400, '2025-02-04 12:00:00', NOW(), NOW()),
(36, 'Book 36', 'Description of Book 36', 18, 450, '2025-02-05 12:00:00', NOW(), NOW()),
(37, 'Book 37', 'Description of Book 37', 19, 500, '2025-02-06 12:00:00', NOW(), NOW()),
(38, 'Book 38', 'Description of Book 38', 19, 250, '2025-02-07 12:00:00', NOW(), NOW()),
(39, 'Book 39', 'Description of Book 39', 20, 300, '2025-02-08 12:00:00', NOW(), NOW()),
(40, 'Book 40', 'Description of Book 40', 20, 350, '2025-02-09 12:00:00', NOW(), NOW()),
(41, 'Book 41', 'Description of Book 41', 21, 400, '2025-02-10 12:00:00', NOW(), NOW()),
(42, 'Book 42', 'Description of Book 42', 21, 450, '2025-02-11 12:00:00', NOW(), NOW()),
(43, 'Book 43', 'Description of Book 43', 22, 500, '2025-02-12 12:00:00', NOW(), NOW()),
(44, 'Book 44', 'Description of Book 44', 22, 250, '2025-02-13 12:00:00', NOW(), NOW()),
(45, 'Book 45', 'Description of Book 45', 23, 300, '2025-02-14 12:00:00', NOW(), NOW()),
(46, 'Book 46', 'Description of Book 46', 23, 350, '2025-02-15 12:00:00', NOW(), NOW()),
(47, 'Book 47', 'Description of Book 47', 24, 400, '2025-02-16 12:00:00', NOW(), NOW()),
(48, 'Book 48', 'Description of Book 48', 24, 450, '2025-02-17 12:00:00', NOW(), NOW()),
(49, 'Book 49', 'Description of Book 49', 25, 500, '2025-02-18 12:00:00', NOW(), NOW()),
(50, 'Book 50', 'Description of Book 50', 25, 250, '2025-02-19 12:00:00', NOW(), NOW()),
(51, 'Book 51', 'Description of Book 51', 26, 300, '2025-02-20 12:00:00', NOW(), NOW()),
(52, 'Book 52', 'Description of Book 52', 26, 350, '2025-02-21 12:00:00', NOW(), NOW()),
(53, 'Book 53', 'Description of Book 53', 27, 400, '2025-02-22 12:00:00', NOW(), NOW()),
(54, 'Book 54', 'Description of Book 54', 27, 450, '2025-02-23 12:00:00', NOW(), NOW()),
(55, 'Book 55', 'Description of Book 55', 28, 500, '2025-02-24 12:00:00', NOW(), NOW()),
(56, 'Book 56', 'Description of Book 56', 28, 250, '2025-02-25 12:00:00', NOW(), NOW()),
(57, 'Book 57', 'Description of Book 57', 29, 300, '2025-02-26 12:00:00', NOW(), NOW()),
(58, 'Book 58', 'Description of Book 58', 29, 350, '2025-02-27 12:00:00', NOW(), NOW()),
(59, 'Book 59', 'Description of Book 59', 30, 400, '2025-02-28 12:00:00', NOW(), NOW()),
(60, 'Book 60', 'Description of Book 60', 30, 450, '2025-03-01 12:00:00', NOW(), NOW());
```

## Notes

- Assurez-vous que les tables `category` et `book` existent dans la base de données avant d'exécuter les requêtes d'insertion.
- Pour toute question, veuillez consulter la documentation de Symfony ou contactez le développeur responsable.
