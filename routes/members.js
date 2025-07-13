// routes/members.js
import express from 'express';
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember
} from '../controllers/memberController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import checkAdmin from '../middleware/checkAdmin.js';

const router = express.Router();

// ✅ Route publique : lire les membres avec filtre + pagination
router.get('/', getMembers);

// ✅ Routes protégées : admin uniquement
router.post('/', authMiddleware, checkAdmin, addMember);
router.put('/:id', authMiddleware, checkAdmin, updateMember);
router.delete('/:id', authMiddleware, checkAdmin, deleteMember);

export default router; // 🔥 Important : utiliser export default
