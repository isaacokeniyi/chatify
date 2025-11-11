import { body } from "express-validator";

export const messageValidator = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message can not be empty")
    .isLength({ max: 500 })
    .withMessage("Message can not exceed 500 characters"),
];
