const express = require("express");
const router = express.Router(); // Création d'un objet router pour définir les routes de l'API
const multer = require('../middleware/multer-config'); // Importation du middleware multer pour la gestion des fichiers
const sauceController = require("../controllers/sauceController"); // Importation du contrôleur sauceController qui gère les actions pour les sauces
const auth = require("../middleware/auth"); // Importation du middleware d'authentification

// Définition des routes avec les middlewares appropriés pour chaque méthode HTTP
router.post('/', auth,multer, sauceController.createSauce); // Route pour la création d'une sauce avec authentification et middleware multer pour la gestion des fichiers
router.put('/:id', auth, multer, sauceController.modifySauce); // Route pour la modification d'une sauce avec authentification et middleware multer pour la gestion des fichiers
router.delete("/:id", auth, sauceController.deleteSauce); // Route pour la suppression d'une sauce avec authentification
router.get("/:id", auth, sauceController.getOneSauce); // Route pour la récupération d'une sauce avec authentification
router.get("/", auth, sauceController.getAllSauces); // Route pour la récupération de toutes les sauces avec authentification
router.post("/:id/like", auth, sauceController.likeSauce); // Route pour la gestion des likes/dislikes d'une sauce avec authentification

module.exports = router; // Exportation de l'objet router pour qu'il soit utilisé dans l'application principale
