import { Router } from "express";
const pokeRouter = Router();

// importing controllers
import {
  getAll,
  getOne,
  getOneDetail,
} from "../../Controlers/pokeControlers/index.js";

pokeRouter.get("/", getAll);
pokeRouter.get("/:id", getOne);
pokeRouter.get("/:id/:info", getOneDetail);

export default pokeRouter;
