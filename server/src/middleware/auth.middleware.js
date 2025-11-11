import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../model/userSchema.js";

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Please Login" });

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!payload.id) return next(new AppError(401, "Invalid Token"));

    const user = await User.findById(payload.id);
    if (!user) return next(new AppError(401, "Invalid User"));

    req.user = user._id.toString();

    return next();
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
