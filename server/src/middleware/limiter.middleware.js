import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { message: "Too many requests, slow down" },
  standardHeaders: true,
  legacyHeaders: false,
});
