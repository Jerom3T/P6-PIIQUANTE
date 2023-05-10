const multer = require("multer");

// Définition des types de fichiers autorisés et leurs extensions associées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de la destination et du nom du fichier téléchargé
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Le fichier sera stocké dans le dossier "images"
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0].split(' ').join('_') // Suppression des espaces dans le nom du fichier
    const extension = MIME_TYPES[file.mimetype]; // Récupération de l'extension du fichier
    callback(null, name + '_' + Date.now() + '.' + extension); // Concaténation du nom et de l'extension avec un timestamp unique pour obtenir un nom de fichier unique
  }
});

// Export de l'objet multer configuré pour la gestion d'un seul fichier image à la fois
module.exports = multer({
  storage: storage, // Utilisation de la configuration de destination et de nom de fichier
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // Vérification que l'extension du fichier est autorisée
      return callback(new Error('Seuls les fichiers d\'image sont autorisés.')); // En cas d'extension non autorisée, on renvoie une erreur
    }
    callback(null, true); // Si l'extension est autorisée, on continue le traitement
  }
}).single("image"); // Le champ de formulaire contenant l'image téléchargée est nommé "image"
