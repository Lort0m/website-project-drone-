# Backend minimal pour SiteProto1

1) Créer un fichier `.env` à partir de `.env.example` et adapter les variables MySQL.

2) Installer les dépendances :

```bash
npm install
```

3) Créer la base/table MySQL (exécuter `create_table.sql` dans votre serveur MySQL) :

```sql
-- depuis votre client MySQL
SOURCE create_table.sql;
```

4) Démarrer le serveur Node.js :

```bash
npm start
```

Le serveur écoute par défaut sur `http://localhost:3000`.

Endpoint : `POST /api/save-point` attend JSON { latitude: Number, longitude: Number }

modifier le README.md quand les modification sera fait 
