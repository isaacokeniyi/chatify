import { body } from "express-validator";
import sanitizeHtml from "sanitize-html";

const sanitizeInput = (input) =>
  sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });

export const registerValidator = [
  body("username")
    .trim()
    .matches(/^[a-zA-Z0-9_]{3,16}$/)
    .withMessage("Username must be 3-16 characters and can only contain letter, numbers or underscores")
    .customSanitizer(sanitizeInput),
  body("email").isEmail().withMessage("Invalid Email Address").normalizeEmail().customSanitizer(sanitizeInput),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .customSanitizer(sanitizeInput),
];

export const loginValidator = [
  body("identifier").trim().notEmpty().withMessage("Username or Email is required").customSanitizer(sanitizeInput),
  body("password").notEmpty().withMessage("Password is required").customSanitizer(sanitizeInput),
];
