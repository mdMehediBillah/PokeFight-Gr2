import { Router } from "express";
const userRouter = Router();

// importing controlers
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deletOne,
} from "../../Controlers/pokeControlers/index.js";

userRouter.get("/", getAll);
userRouter.post("/", createOne);
userRouter.get("/:id", getOne);
userRouter.put("/:id", updateOne);
userRouter.delete("/:id", deletOne);

export default userRouter;
