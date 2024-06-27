import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./Routes/pokeRoutes/index.js";

const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));

// for database connection json file
app.use(express.json());

// routes
app.use("/api/v1/users", userRouter);

// testing routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/*", (req, res) => {
  res.send("Wrong url");
});

// app listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
