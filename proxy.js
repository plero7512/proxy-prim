const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const apiKey = "AgyDd7BQZciAl98P1IjcaeWEPM8tSbQ0";

app.get("/api/transport", async (req, res) => {
  const stopRef = req.query.ref;
  if (!stopRef) return res.status(400).json({ error: "ref manquant" });

  try {
    const response = await fetch(`https://api.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=${stopRef}`, {
      headers: { "apiKey": apiKey }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur d'appel à l'API PRIM" });
  }
});

app.listen(3000, () => {
  console.log("✅ Proxy lancé sur http://localhost:3000");
});
