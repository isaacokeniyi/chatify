import { body } from "express-validator";
import sanitizeHtml from "sanitize-html";

const sanitizeInput = (input) =>
  sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });

export const sendMessageValidator = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message can not be empty")
    .isLength({ max: 500 })
    .withMessage("Message can not exceed 500 characters")
    .customSanitizer(sanitizeInput),
];
