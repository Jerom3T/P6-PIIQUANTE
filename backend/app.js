const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env
const MONGODB_URI = process.env.MONGODB_URI; // Récupérer l'URI de la base de données MongoDB à partir des variables d'environnement

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB')) // Afficher un message si la connexion à MongoDB réussit
.catch((error) => console.log('Error connecting to MongoDB:', error));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', userRoutes);


module.exports = app;

