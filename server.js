import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/proxy/:id", async (req, res) => {
  const id = req.params.id;
  const robloxUrl = `https://www.roblox.com/thumbnail/image?assetId=${id}&width=420&height=420&format=png`;

  try {
    const response = await fetch(robloxUrl);
    if (!response.ok) {
      res.status(404).send("Image introuvable");
      return;
    }
    res.set("Content-Type", "image/png");
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur de proxy");
  }
});

app.listen(3000, () => console.log("✅ Proxy Roblox actif sur http://localhost:3000"));
