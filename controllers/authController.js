// controllers/authController.js
const User = require('../models/User'); // Importer le modèle User
const bcrypt = require('bcryptjs'); // Pour la comparaison du mot de passe
const jwt = require('jsonwebtoken'); // Pour générer le token JWT

// Fonction pour la connexion de l'utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Répondre avec le token et les informations de l'utilisateur
    res.json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  loginUser
};
