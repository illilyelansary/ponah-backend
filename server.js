// server.js (à la racine)
import express from 'express';
import cors    from 'cors';
import helmet  from 'helmet';
import morgan  from 'morgan';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';

import authRoutes    from './routes/auth.js';
import membersRoutes from './routes/members.js'; // idem

dotenv.config();
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/members', membersRoutes);

app.get('/', (req, res) => res.json({ message: 'API PONAH en ligne 🎉' }));
app.use((req, res) => res.status(404).json({ message: 'Route non trouvée' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
