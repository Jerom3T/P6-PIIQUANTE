const express = require('express'); // Importation du framework Express
const router = express.Router(); // Création d'un objet router pour définir les routes de l'API
const userController = require('../controllers/userController'); // Importation du contrôleur userController qui gère les actions pour les utilisateurs

router.post('/signup', userController.signup); // Définition de la route pour la création d'un nouvel utilisateur avec la méthode HTTP POST et le contrôleur userController.signup
router.post('/login', userController.login); // Définition de la route pour la connexion d'un utilisateur avec la méthode HTTP POST et le contrôleur userController.login

module.exports = router; // Exportation de l'objet router pour qu'il soit utilisé dans l'application principale
