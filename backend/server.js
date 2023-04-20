const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

const app = express(); // Créer une nouvelle application Express

const MONGODB_URI = process.env.MONGODB_URI; // Récupérer l'URI de la base de données MongoDB à partir des variables d'environnement

// Se connecter à la base de données MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB')) // Afficher un message si la connexion à MongoDB réussit
.catch((error) => console.log('Error connecting to MongoDB:', error)); // Afficher un message si la connexion à MongoDB échoue

const PORT = process.env.PORT || 3000; // Utiliser la valeur du port fournie dans les variables d'environnement ou utiliser 3000 par défaut

app.use(express.json()); // Utiliser le middleware express.json() pour analyser les corps des requêtes JSON

// Importer les routes utilisateur
const userRoutes = require('./routes/userRoutes');
// Utiliser les routes utilisateur avec le préfixe /api/auth
app.use('/api/auth', userRoutes);

// Démarrer le serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
