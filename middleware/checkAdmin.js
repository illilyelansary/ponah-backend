// middleware/checkAdmin.js
module.exports = function checkAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé : administrateur requis.' });
  }
  next();
};
