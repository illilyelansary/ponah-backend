const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Tous les champs sont requis' });

  const existing = users.find(u => u.email === email);
  if (existing)
    return res.status(409).json({ message: 'Cet email est déjà utilisé' });

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.status(201).json({
    user: { id: newUser.id, name, email },
    token: `fake-token-${newUser.id}`
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  res.json({
    user: { id: user.id, name: user.name, email },
    token: `fake-token-${user.id}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API en ligne sur port ${PORT}`));