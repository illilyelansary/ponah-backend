// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serveur
const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
  });
