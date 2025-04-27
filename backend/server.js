const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecté'))
  .catch((err) => console.log(err));

// Import des routes
const authRoutes = require('./routes/auth');

// ⚡ ATTENTION : utiliser /auth (PAS /api/auth)
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API en ligne');
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

