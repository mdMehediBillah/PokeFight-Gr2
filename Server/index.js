import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pokeRouter from "./Routes/pokeRoutes/index.js";

const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));

// for database connection json file
app.use(express.json());

// routes
app.use("/pokemon", pokeRouter);

// testing routes
app.get("/", (req, res) => {
  res.send("Hello Pokemon fans");
});

app.get("/*", (req, res) => {
  res.send("Wrong url");
});

// app listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
