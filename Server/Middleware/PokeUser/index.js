import { body, param } from "express-validator";

export const postErrorValidator = [
  body("first_name")
    .isString()
    .withMessage("First_Name must be a string")
    .isLength({ min: 2 })
    .withMessage("First_Name must be at least 2 characters long"),

  body("last_name")
    .isString()
    .withMessage("Last_Name must be a string")
    .isLength({ min: 2 })
    .withMessage("Last_Name must be at least 2 characters long"),

  body("email").isEmail().withMessage("this is not a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
];
