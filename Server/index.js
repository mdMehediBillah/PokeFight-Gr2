import connectDB from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// importing routes
import userRouter from "./Routes/pokeRoutes/index.js";

// create application from express
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();
connectDB();

// End points
app.use("/api/v1/users", userRouter);

// app listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
