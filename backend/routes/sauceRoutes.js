// Importation des modules nécessaires
const express = require("express");
const router = express.Router();
const multer = require('../middleware/multer-config');
const sauceController = require("../controllers/sauceController");
const auth = require("../middleware/auth");


// Création d'une sauce
router.post('/', auth, multer, sauceController.createSauce);

// Modification d'une sauce
router.put('/:id', auth, multer, sauceController.modifySauce);

// Suppression d'une sauce
router.delete("/:id", auth, sauceController.deleteSauce);

// Récupération d'une sauce par son ID
router.get("/:id", auth, sauceController.getOneSauce);

// Récupération de toutes les sauces
router.get("/", auth, sauceController.getAllSauces);

// Gestion des likes et dislikes d'une sauce
router.post("/:id/like", auth, sauceController.likeSauce);

module.exports = router;
