const checkAdmin = require('../middleware/checkAdmin');
const express = require('express');
const router = express.Router();
const {
  getMembers,
  createMember,
  deleteMember,
} = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Récupérer les membres avec pagination et filtre
router.get('/', getMembers);

// Ajouter un membre (admin uniquement)
router.post('/', authMiddleware, roleMiddleware('admin'), createMember);

// Supprimer un membre (admin uniquement)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteMember);

module.exports = router;
