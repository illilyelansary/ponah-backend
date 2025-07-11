const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'members.json');

function readMembers() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function writeMembers(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/members', (req, res) => {
  const members = readMembers();
  res.json(members);
});

app.post('/api/members', (req, res) => {
  const members = readMembers();
  members.push(req.body);
  writeMembers(members);
  res.status(201).json({ message: 'Membre ajouté avec succès' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
