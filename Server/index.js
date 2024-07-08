import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

// database connection
import connectDB from "./db/db.js";

// importing routes
import userRouter from "./Routes/pokeRoutes/index.js";
import loggingRoutes from "./Routes/loginRoutes/index.js";
import scoreRouter from "./Routes/ScoreRoutes/index.js";

// create application from express
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();

connectDB();

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// End points
app.use("/api/v1/", loggingRoutes);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/scores", scoreRouter);
// app listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
