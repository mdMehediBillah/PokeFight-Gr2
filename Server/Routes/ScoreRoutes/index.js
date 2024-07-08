import { Router } from "express";
const scoreRouter = Router();
// import { body, param } from "express-validator";

// importing controllers
import {
  getAllScore,
  createOneScore,
} from "../../Controlers/ScoreControlers/index.js";

// import middleware
import { isAuthenticated } from "../../Middleware/PokeUser/index.js";

scoreRouter.get("/", getAllScore);
scoreRouter.post("/", createOneScore);

export default scoreRouter;
