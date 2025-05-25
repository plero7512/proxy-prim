const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.IDFM_API_KEY;

app.get('/api/transport', async (req, res) => {
  const ref = req.query.ref;
  if (!ref) return res.status(400).json({ error: "Paramètre 'ref' manquant" });

  try {
    const response = await fetch(
      `https://api.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=${ref}&MaximumStopVisits=6&MinimumStopVisitsPerLine=1`,
      {
        headers: {
          apikey: API_KEY
        }
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Erreur d'appel à l'API PRIM", status: response.status });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy PRIM lancé sur http://localhost:${PORT}`));
