// Importation du module mongoose pour définir le modèle
const mongoose = require('mongoose');

// Définition du schéma de sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // Identifiant de l'utilisateur qui a créé la sauce
  name: { type: String, required: true }, // Nom de la sauce
  manufacturer: { type: String, required: true }, // Fabricant de la sauce
  description: { type: String, required: true }, // Description de la sauce
  mainPepper: { type: String, required: true }, // Principal ingrédient de la sauce
  imageUrl: { type: String, required: true }, // URL de l'image de la sauce
  heat: { type: Number, required: true }, // Niveau de piquant de la sauce
  likes: { type: Number, default: 0 }, // Nombre de likes de la sauce
  dislikes: { type: Number, default: 0 }, // Nombre de dislikes de la sauce
  usersLiked: { type: [String], default: [] }, // Liste des identifiants d'utilisateurs qui ont liké la sauce
  usersDisliked: { type: [String], default: [] } // Liste des identifiants d'utilisateurs qui ont disliké la sauce
});

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = mongoose.model('Sauce', sauceSchema);
