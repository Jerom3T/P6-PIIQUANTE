// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Import des routes
const userRoutes = require('./routes/userRoutes');
const sauceRoutes = require('./routes/sauceRoutes');

// Chargement des variables d'environnement depuis un fichier .env
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

// Connexion à la base de données MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error.message));

// Création de l'application express
const app = express();

// Configuration de l'application pour utiliser bodyParser pour parser les requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de CORS pour permettre l'accès à l'API depuis n'importe quel domaine
app.use(cors());

// Utilisation des routes définies dans les fichiers userRoutes.js et sauceRoutes.js
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Configuration de l'accès aux images stockées dans le dossier /images
app.use('/images', express.static('images'));

// Gestion des routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Export de l'application express
module.exports = app;
