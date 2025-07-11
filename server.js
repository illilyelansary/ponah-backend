const express = require('express');
const cors = require('cors'); // Importation du middleware CORS
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connexion à la base de données
connectDB();

// Middleware CORS ajouté ici
app.use(cors()); // Autorise les requêtes depuis d'autres origines
app.use(helmet()); // Sécurise l'application en définissant divers en-têtes HTTP
app.use(morgan('dev')); // Enregistre les requêtes HTTP dans la console
app.use(express.json()); // Permet à l'application de traiter les requêtes JSON

// Routes
const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');

// Utilisation des routes
app.use('/api', authRoutes);
app.use('/api/members', membersRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API PONAH en ligne 🎉' });
});

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
