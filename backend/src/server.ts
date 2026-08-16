import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (_req, res) => {
  res.json({
    message: "Simple Login System API is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});