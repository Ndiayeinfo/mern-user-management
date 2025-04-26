const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware pour CORS
app.use(cors());
app.options('*', cors()); // Pour gérer les pré-vols OPTIONS CORS

app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecté'))
.catch((err) => console.error(err));

// Import des routes
const authRoutes = require('./routes/auth');

// ⚡ Remarque : SANS /api ici car Nginx fait la réécriture
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API en ligne');
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur backend lancé sur le port ${PORT}`));
