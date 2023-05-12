const express = require('express');// Importation du module Express
const router = express.Router();// Méthode Router pour créer un nouvel objet router
const userController = require('../controllers/userController');//Importation du controleur contenant les fonctions signup et login

// Définition de la route pour l'inscription d'un nouvel utilisateur
router.post('/signup', userController.signup);

// Définition de la route pour la connexion d'un utilisateur existant
router.post('/login', userController.login);

module.exports = router;
