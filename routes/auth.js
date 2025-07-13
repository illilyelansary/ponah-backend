// routes/auth.js
import express from 'express';
import jwt     from 'jsonwebtoken';
import User    from '../models/User.js';  // ← chemin relatif depuis routes/

const router = express.Router();

// Middleware d’authentification
const authenticateToken = (req, res, next) => {
  const header = req.headers['authorization'];
  const token  = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
};

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur de connexion' });
  }
});

// Exemple de route protégée
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Accès autorisé', user: req.user });
});

export default router;
