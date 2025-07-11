
const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const authMiddleware = require('../middleware/authMiddleware');

// Ajouter un membre (admin uniquement)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un membre par ID (admin uniquement)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Membre introuvable' });
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
