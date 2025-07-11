const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

// Routes
const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');

app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🎉 API PONAH opérationnelle !');
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
