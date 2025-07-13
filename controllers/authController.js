const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role }, // 👈 important
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
};
