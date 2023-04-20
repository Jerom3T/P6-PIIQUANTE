const User = require('../models/User'); // Importez le modèle d'utilisateur
const bcrypt = require('bcrypt'); // Importez le module bcrypt pour hacher les mots de passe
const jwt = require('jsonwebtoken'); // Importez le module jsonwebtoken pour gérer l'authentification

// Fonction asynchrone pour gérer l'inscription des utilisateurs
exports.signup = async (req, res) => {
  try {
    // Hachez le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créez un nouvel utilisateur avec l'e-mail et le mot de passe haché
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword
    });

    // Enregistrez le nouvel utilisateur dans la base de données
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Créez une fonction asynchrone pour gérer la connexion des utilisateurs
exports.login = async (req, res) => {
  try {
    // Recherchez l'utilisateur dans la base de données à l'aide de l'e-mail
    const user = await User.findOne({ email: req.body.email });

    // Si l'utilisateur n'est pas trouvé, renvoyez une erreur
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Comparez le mot de passe fourni avec le mot de passe haché stocké pour l'utilisateur
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // Si le mot de passe est invalide, renvoyez une erreur
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Générez un token JWT pour l'utilisateur avec une durée d'expiration de 24 heures
    const token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET_KEY', { expiresIn: '24h' });

    // Renvoyez l'ID utilisateur et le token pour une authentification réussie
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
