// controllers/memberController.js
import Member from '../models/Member.js';

// GET /api/members?zone=Kayes&page=1&limit=10
export const getMembers = async (req, res) => {
  try {
    const { zone, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (zone) {
      filter.zone = zone;
    }

    const members = await Member.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Member.countDocuments(filter);

    res.json({
      data: members,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
