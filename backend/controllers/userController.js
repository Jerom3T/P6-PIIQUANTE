const User = require('../models/User'); // Importation du modèle User défini pour MongoDB/Mongoose
const bcrypt = require('bcrypt'); // Importation du package Bcrypt pour le hashage des mots de passe
const jwt = require('jsonwebtoken'); // Importation du package JsonWebToken pour la création de jetons d'authentification

exports.signup = async (req, res) => {
  try {
    // Vérification si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email: req.body.email });
    console.log('existingUser: ', existingUser);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hashage du mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log('hashedPassword: ', hashedPassword);

    // Création d'un nouvel objet utilisateur à partir des données envoyées par le client
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword
    });
    console.log('newUser: ', newUser);

    // Sauvegarde de l'utilisateur dans la base de données
    await newUser.save();
    console.log('User saved');

    // Renvoi d'une réponse avec un message de confirmation
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    // En cas d'erreur, renvoi d'une réponse avec un message d'erreur
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    // Recherche de l'utilisateur dans la base de données à partir de son email
    const user = await User.findOne({ email: req.body.email });
    console.log('user: ', user);

    if (!user) {
      // Si l'utilisateur n'existe pas, renvoi d'une réponse avec un message d'erreur
      return res.status(404).json({ error: 'User not found' });
    }

    // Comparaison du mot de passe envoyé par le client avec celui enregistré dans la base de données
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('validPassword: ', validPassword);

    if (!validPassword) {
      // Si le mot de passe est incorrect, renvoi d'une réponse avec un message d'erreur
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Création d'un jeton d'authentification pour l'utilisateur avec une clé secrète et une durée de validité de 24 heures
    const token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET_KEY', { expiresIn: '24h' });
    console.log('token: ', token);

    // Renvoi d'une réponse avec l'identifiant de l'utilisateur et le jeton d'authentification
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error(error);
    // En cas d'erreur, renvoi d'une réponse avec un message d'erreur
    res.status(500).json({ error });
  }
};
