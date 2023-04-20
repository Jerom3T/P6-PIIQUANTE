// Importez le module mongoose pour créer des schémas et interagir avec la base de données MongoDB
const mongoose = require('mongoose');

// Créez un schéma utilisateur avec les champs email et mot de passe
const UserSchema = new mongoose.Schema({
  email: {
    type: String,     // Le type de donnée pour l'email est une chaîne de caractères
    required: true,   // L'email est un champ obligatoire
    unique: true      // L'email doit être unique pour chaque utilisateur
  },
  password: {
    type: String,     // Le type de donnée pour le mot de passe est une chaîne de caractères
    required: true    // Le mot de passe est un champ obligatoire
  }
});

// Créez un modèle d'utilisateur en utilisant le schéma défini précédemment
const User = mongoose.model('User', UserSchema);

// Exportez le modèle d'utilisateur pour être utilisé dans d'autres parties de l'application
module.exports = User;
