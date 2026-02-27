const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend running'));

// Endpoint pour sauvegarder un point
app.post('/api/save-point', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ success: false, error: 'Latitude et longitude doivent être des nombres.' });
    }

    const [result] = await pool.execute(
      'INSERT INTO points (latitude, longitude) VALUES (?, ?)',
      [latitude, longitude]
    );

    return res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('Erreur sauvegarde point:', err);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// Endpoint pour lister les points (vérification)
app.get('/api/points', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const [rows] = await pool.execute(
      'SELECT id, latitude, longitude, created_at FROM points ORDER BY created_at DESC LIMIT ?',[limit]
    );
    return res.json({ success: true, rows });
  } catch (err) {
    console.error('Erreur récupération points:', err);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
