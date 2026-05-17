const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 🔥 Get subreddit posts
app.get("/api/sub/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${name}.json?limit=25`
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subreddit" });
  }
});

// 🔥 Get comments
app.get("/api/post", async (req, res) => {
  const permalink = req.query.url;

  try {
    const response = await fetch(
      `https://www.reddit.com${permalink}.json`
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
