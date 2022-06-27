const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET"],
  })
);

const poolConfig = {
  host: "localhost",
  user: "atlantis",
  database: "amazon_clone",
  port: 5432,
};

const pool = new Pool(poolConfig);

const PORT = 3012;

app.get("/items", async (req, res) => {
  console.log("working");
  try {
    const data = await pool.query("SELECT * FROM items");
    res.json(data.rows);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
