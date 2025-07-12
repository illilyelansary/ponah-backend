const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// GET membres avec pagination (ex: /api/members?page=2&limit=10)
router.get('/', async (req, res) => {
  try {
    const page  = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const total = await Member.countDocuments();
    const members = await Member.find().skip(skip).limit(limit);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalMembers: total,
      members
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST - Ajouter un membre (réservé aux admins)
router.post('/', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
});

// DELETE - Supprimer un membre par ID (réservé aux admins)
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

module.exports = router;
