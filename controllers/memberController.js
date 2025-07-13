// controllers/memberController.js
import Member from '../models/Member.js';

export const getMembers = async (req, res) => {
  try {
    const { zone, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (zone) {
      filter.zoneIntervention = zone; // attention : corriger le champ réel
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

export const addMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erreur lors de l’ajout du membre' });
  }
};

export const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erreur lors de la mise à jour' });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erreur lors de la suppression' });
  }
};
