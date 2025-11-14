import { body, param } from "express-validator";
import sanitizeHtml from "sanitize-html";

const sanitizeInput = (input) =>
  sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });

export const sendMessageValidator = [
  body("sender").trim().notEmpty().withMessage("No user").customSanitizer(sanitizeInput),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message can not be empty")
    .isLength({ max: 500 })
    .withMessage("Message can not exceed 500 characters")
    .customSanitizer(sanitizeInput),
];

export const editMessageValidator = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message can not be empty")
    .isLength({ max: 500 })
    .withMessage("Message can not exceed 500 characters")
    .customSanitizer(sanitizeInput),
  param("id").trim().notEmpty().withMessage("No message Id").customSanitizer(sanitizeInput).isMongoId(),
];

export const deleteMessageValidator = [
  param("id").trim().notEmpty().withMessage("No message Id").customSanitizer(sanitizeInput).isMongoId(),
];
