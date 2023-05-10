const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Récupération du token d'authentification depuis le header de la requête
    const token = req.headers.authorization.split(' ')[1];
    // Vérification et décodage du token avec la clé secrète
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
    // Récupération de l'identifiant utilisateur depuis le token décodé
    const userId = decodedToken.userId;
    // Vérification de l'identifiant utilisateur dans le corps de la requête
    if (req.body.userId && req.body.userId !== userId) {
      // Si l'identifiant utilisateur est présent et ne correspond pas à celui du token, une erreur est levée
      throw 'Invalid user ID';
    } else {
      // Si tout est en ordre, on passe à la suite de la chaîne de middleware
      next();
    }
  } catch {
    // En cas d'erreur lors de la vérification du token ou de l'identifiant utilisateur, une erreur est renvoyée
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
