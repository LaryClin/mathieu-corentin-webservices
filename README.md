Pour lancer le projet et effectuer les requêtes SQL pour insérer des rôles (admin et user), des compétences et des projets, suivez ces étapes :

1. **Installation des dépendances :** Avoir Node.js et npm installés sur votre machine. Ensuite, exécutez la commande suivante dans le répertoire du projet pour installer toutes les dépendances nécessaires :

```bash
npm install
```

2. **Lancement de la base de données avec Docker :** Utilisez Docker pour exécuter une instance de la base de données PostgreSQL. Assurez-vous d'avoir Docker installé sur votre machine, puis exécutez la commande suivante à la racine du projet :

```bash
docker-compose up -d
```

Cela lancera un conteneur Docker avec PostgreSQL prêt à être utilisé.

3. **Exécution des requêtes SQL :** Pour insérer des données dans la base de données, vous pouvez exécuter les requêtes SQL correspondantes à partir d'un outil tel que pgAdmin, DBeaver ou directement depuis la ligne de commande PostgreSQL. Assurez-vous de vous connecter à la base de données PostgreSQL qui s'exécute dans le conteneur Docker. Voici un exemple de requêtes SQL pour insérer des données :

```sql
-- Insertion des rôles
INSERT INTO role (nom) VALUES ('admin'), ('user');

-- Insertion des compétences
INSERT INTO competence (nom) VALUES ('Vue.js'), ('React'), ('Angular');

-- Insertion des projets
INSERT INTO project (name, description, "dateDebut", "dateFin") VALUES
  ('Projet 1', 'Description du projet 1', '2024-03-10', '2024-05-10'),
  ('Projet 2', 'Description du projet 2', '2024-04-01', '2024-06-01');
```

4. **Lancement de l'application :** Une fois que la base de données est prête et que les données ont été insérées, vous pouvez démarrer l'application Nest.js en exécutant la commande suivante :

```bash
npm run start
```

- **Swagger :** Swagger est une interface utilisateur permettant de visualiser et de tester les API REST de manière interactive. Nous l'avons utilisé dans notre projet pour documenter nos API et faciliter le processus de développement et de test.

Pour accéder à Swagger, suivre ces étapes :

1. Lorsque l'application est en cours d'exécution, ouvrez votre navigateur web et accédez à l'URL suivante : `http://localhost:3000/api`.
2. Cela ouvrira l'interface Swagger où vous pourrez voir la documentation de toutes les API exposées par votre application, ainsi que des options pour les tester directement depuis l'interface.

Enfin, je vais expliquer pourquoi j'ai décidé d'utiliser un dictionnaire de synonymes et ce que notre API permet de faire :

- **Dictionnaire de synonymes :** J'ai utilisé un dictionnaire de synonymes pour normaliser les noms des compétences. Cela garantit que les compétences sont enregistrées de manière cohérente dans la base de données, ce qui facilite les opérations de recherche et de filtrage.
  
- **Fonctionnalités de l'API :** L'API permet de gérer les utilisateurs, les rôles, les compétences et les projets. Elle offre des fonctionnalités telles que la création, la lecture, la mise à jour et la suppression (CRUD) pour chacune de ces entités. De plus, elle offre des fonctionnalités avancées telles que la recherche avec filtrage et tri, ainsi que des autorisations basées sur les rôles pour restreindre l'accès aux ressources en fonction des permissions de l'utilisateur connecté.


- **Remarque :** 
La partie JWT Token n'est pas totalement fonctionnelle. Des problèmes subsistent et nécessitent une résolution.
Un système de cache n'a pas été mis en place dans cette version de l'application.