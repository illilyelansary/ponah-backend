import express from 'express';

const router = express.Router();

// Exemple de route protégée
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Liste des utilisateurs' });
});

export default router;
