const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');

app.use('/api', authRoutes);
app.use('/api/members', membersRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API PONAH en ligne 🎉' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
