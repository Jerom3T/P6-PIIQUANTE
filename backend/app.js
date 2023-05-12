// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const sauceRoutes = require('./routes/sauceRoutes');
const cors = require('cors');
const path = require('path');

// Chargement des variables d'environnement depuis un fichier .env
require('dotenv').config();
// Récupération de l'URL de connexion à la base de données MongoDB à partir de la variable d'environnement MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;


// Connexion à la base de données MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Création de l'application Express
const app = express();

// Configuration de l'application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration des en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Configuration CORS spécifique
const corsOptions = {
  origin: 'http://localhost:4200', // Origine autorisée
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, Authorization',
};

// Utilisation de CORS
app.use(cors(corsOptions));

// Utilisation des routes définies dans les fichiers userRoutes.js et sauceRoutes.js
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Configuration de l'accès aux images stockées dans le dossier /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Gestion des routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Export de l'application Express
module.exports = app;
