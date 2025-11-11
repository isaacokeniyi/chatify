import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .trim()
    .matches(/^[a-zA-Z0-9_]{3,16}$/)
    .withMessage("Username must be 3-16 characters and can only contain letter, numbers or underscores"),
  body("email").isEmail().withMessage("Invalid Email Address").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("identifier").trim().notEmpty().withMessage("Username or Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
