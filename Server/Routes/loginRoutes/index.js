import { Router } from "express";
const loggingRoutes = Router();
import { login, logout } from "../../Controlers/loggingControlers/index.js";

// Importing logging controllers
loggingRoutes.post("/login", login);

loggingRoutes.post("/logout", logout);

export default loggingRoutes;
