const express = require('express'); // Importez le module Express
const router = express.Router(); // Créez un nouveau routeur Express
const userController = require('../controllers/userController'); // Importez le contrôleur d'utilisateur

// Créez une route POST pour l'inscription des utilisateurs, en utilisant la méthode signup du contrôleur d'utilisateur
router.post('/signup', userController.signup);

// Créez une route POST pour la connexion des utilisateurs, en utilisant la méthode login du contrôleur d'utilisateur
router.post('/login', userController.login);

// Exportez le routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;
