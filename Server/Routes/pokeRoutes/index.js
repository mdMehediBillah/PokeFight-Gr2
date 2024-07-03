import { Router } from "express";
const userRouter = Router();
import { body, param } from "express-validator";

// importing controlers
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deletOne,
} from "../../Controlers/pokeControlers/index.js";

// import middleware
import {
  postErrorValidator,
  isAuthenticated,
} from "../../Middleware/PokeUser/index.js";

userRouter.get("/", isAuthenticated, getAll);
userRouter.post("/", postErrorValidator, createOne);
userRouter.get(
  "/:id",
  [param("id").isInt({ min: 1 }).withMessage("id is not valid")],
  getOne
);
userRouter.put("/:id", updateOne);
userRouter.delete("/:id", deletOne);

export default userRouter;
