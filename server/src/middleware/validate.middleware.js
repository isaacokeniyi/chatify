import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return next(new AppError(400, message));
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
