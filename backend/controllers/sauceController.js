const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  // Parse l'objet sauce à partir du corps de la requête
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);

  // Supprime l'id de l'objet sauce (s'il en a un) car il sera généré automatiquement par MongoDB
  delete sauceObject._id;

  // Crée une instance du modèle Sauce avec les données de l'objet sauce
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log(req.file);

  // Enregistre la sauce dans la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error: 'Impossible d\'enregistrer la sauce' }));
};


exports.modifySauce = (req, res, next) => {
  // Vérifie si un fichier a été téléchargé (mise à jour de l'image)
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  // Met à jour la sauce dans la base de données
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error: 'Impossible de modifier la sauce' }));
};


exports.deleteSauce = (req, res, next) => {
  // Recherche de la sauce à supprimer dans la base de données
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // Récupération du nom du fichier de l'image à supprimer
      const filename = sauce.imageUrl.split('/images/')[1];

      // Suppression du fichier d'image du serveur
      fs.unlink(`images/${filename}`, () => {
        // Suppression de la sauce dans la base de données
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error: 'Impossible de supprimer la sauce' }));
      });
    })
    .catch(error => res.status(500).json({ error: 'Impossible de trouver la sauce' }));
};


exports.getOneSauce = (req, res, next) => {
  // Recherche d'une sauce spécifique dans la base de données par son identifiant
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce) {
        // Si la sauce est trouvée, renvoyer la sauce en tant que réponse
        res.status(200).json(sauce);
      } else {
        // Si la sauce n'est pas trouvée, renvoyer une réponse avec un code 404 (Non trouvé)
        res.status(404).json({ error: 'Impossible de trouver la sauce' });
      }
    })
    .catch(error => res.status(500).json({ error: 'Impossible de trouver la sauce' }));
};

exports.getAllSauces = (req, res, next) => {
  // Récupération de toutes les sauces de la base de données
  Sauce.find()
    .then(sauces => {
      // Renvoyer toutes les sauces en tant que réponse
      res.status(200).json(sauces);
    })
    .catch(error => res.status(400).json({ error: 'Impossible de trouver les sauces' }));
};


exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (like === 0) {
        // Si like vaut 0, cela signifie que l'utilisateur souhaite retirer son like ou dislike
        if (sauce.usersLiked.includes(userId)) {
          // Si l'utilisateur avait déjà liké la sauce, on retire son like
          Sauce.updateOne({ _id: req.params.id }, {
            $inc: { likes: -1 },
            $pull: { usersLiked: userId }
          })
            .then(() => res.status(201).json({ message: 'Like retiré !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de retirer le like' }));
        } else if (sauce.usersDisliked.includes(userId)) {
          // Si l'utilisateur avait déjà disliké la sauce, on retire son dislike
          Sauce.updateOne({ _id: req.params.id }, {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: userId }
          })
            .then(() => res.status(201).json({ message: 'Dislike retiré !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de retirer le dislike' }));
        }
      } else if (like === 1) {
        // Si like vaut 1, cela signifie que l'utilisateur souhaite liker la sauce
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes: 1 },
          $push: { usersLiked: userId }
        })
          .then(() => res.status(201).json({ message: 'Like ajouté !' }))
          .catch(error => res.status(400).json({ error: 'Impossible d\'ajouter le like' }));
      } else if (like === -1) {
        // Si like vaut -1, cela signifie que l'utilisateur souhaite disliker la sauce
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: userId }
        })
          .then(() => res.status(201).json({ message: 'Dislike ajouté !' }))
          .catch(error => res.status(400).json({ error: 'Impossible d\'ajouter le dislike' }));
      }
    })
    .catch(error => res.status(500).json({ error: 'Impossible de trouver la sauce' }));
};

