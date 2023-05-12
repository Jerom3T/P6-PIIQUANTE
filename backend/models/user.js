
// Importation du module mongoose pour définir le modèle
const mongoose = require('mongoose');

// Définition du schéma utilisateur
const UserSchema = new mongoose.Schema({
  email: {
    type: String,     
    required: true,   
    unique: true      
  },
  password: {
    type: String,     
    required: true    
  }
});

// Création du modèle utilisateur à partir du schéma
const User = mongoose.model('User', UserSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = User;
