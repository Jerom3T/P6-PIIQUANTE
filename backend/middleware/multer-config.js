//Importation de multer pour la gestion des images
const multer = require("multer");

// Définition des types MIME pour les extensions d'image autorisées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage des fichiers avec multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Définition du dossier de destination des fichiers
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Génération du nom de fichier unique pour éviter les collisions
    const name = file.originalname.split('.')[0].split(' ').join('_'); // Extraction du nom de fichier sans l'extension et remplacement des espaces par des underscores
    const extension = MIME_TYPES[file.mimetype]; // Récupération de l'extension en fonction du type MIME
    callback(null, name + '_' + Date.now() + '.' + extension); // Construction du nom de fichier avec le nom d'origine, un timestamp et l'extension
  }
});

// Exportation de l'objet multer configuré
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // Vérification du type de fichier pour autoriser uniquement les fichiers d'image
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Seuls les fichiers d\'image sont autorisés.'));
    }
    callback(null, true);
  }
}).single("image");
