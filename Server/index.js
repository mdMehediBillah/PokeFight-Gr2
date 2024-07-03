import connectDB from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcryptjs";

// importing routes
import userRouter from "./Routes/pokeRoutes/index.js";

// import Model from pokeUserModel
import pokeUserModel from "./models/pokeUserModel.js";
// import loggingRoutes from "./Routes/loginRoutes/index.js";

// create application from express
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();

// database connection
connectDB();

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // 1 hour
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Define the /api/v1/login route
app.post("/api/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pokeUserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = user;
      res.json({ message: "Logged in successfully" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Define the /api/v1/logout route
app.post("/api/v1/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

// End points
app.use("/api/v1/users", userRouter);

// app listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
