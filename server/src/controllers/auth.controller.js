import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, logMeIn } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    if (logMeIn) {
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
      res.json({ message: "Registration Successful", token });
    } else {
      res.status(201).json({ message: "Registration Successful" });
    }
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    const user = identifier.includes("@")
      ? await User.findOne({ email: identifier })
      : await User.findOne({ username: identifier });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, "Invalid Credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    res.json({ message: "Login Successful", token });
  } catch (err) {
    next(err);
  }
};
