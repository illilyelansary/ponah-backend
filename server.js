// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import membersRoutes from './routes/members.js'; // reste en ESM

dotenv.config();

const app = express();

// Connexion MongoDB
try {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('✅ Connecté à MongoDB');
} catch (error) {
  console.error('❌ Erreur de connexion MongoDB:', error.message);
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/members', membersRoutes);

// Page d'accueil de l'API
app.get('/', (req, res) => res.json({ message: 'API PONAH en ligne 🎉' }));

// Gestion des routes inconnues
app.use((req, res) => res.status(404).json({ message: 'Route non trouvée' }));

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
