const express = require('express');
const router = express.Router();
const memberCtrl = require('../controllers/memberController');
const auth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/checkAdmin');

// ✅ Route publique
router.get('/', memberCtrl.getMembers);

// ✅ Routes admin
router.post('/', auth, checkAdmin, memberCtrl.addMember);
router.delete('/:id', auth, checkAdmin, memberCtrl.deleteMember);
router.put('/:id', authMiddleware, checkAdmin, memberController.updateMember);
module.exports = router;
