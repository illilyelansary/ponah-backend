require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importation de CORS
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Middleware pour gérer les requêtes JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utiliser CORS pour autoriser les requêtes provenant d'autres domaines
app.use(cors()); // Ajout du middleware CORS

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');

// Route de test pour vérifier si l'API fonctionne
app.get('/', (req, res) => {
  res.send('API PONAH opérationnelle !');
});

// Routes API pour les utilisateurs
app.use('/api/auth', authRoutes); // Toutes les routes d'authentification sous /api/auth

// Routes API pour les membres
app.use('/api/members', membersRoutes); // Toutes les routes des membres sous /api/members

// Définir le port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
