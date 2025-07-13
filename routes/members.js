const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/checkAdmin');

// ✅ Route publique : lire les membres avec filtre + pagination
router.get('/', memberController.getMembers);

// ✅ Routes protégées : admin uniquement
router.post('/', authMiddleware, checkAdmin, memberController.addMember);
router.put('/:id', authMiddleware, checkAdmin, memberController.updateMember);
router.delete('/:id', authMiddleware, checkAdmin, memberController.deleteMember);

module.exports = router;
