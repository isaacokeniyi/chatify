import User from "../model/userSchema.js";
import AppError from "../utils/AppError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) return next(new AppError(404, "User Not Found"));

    await User.findByIdAndDelete(id);
    res.end({ message: "Account deleted" });
  } catch (err) {
    next(err);
  }
};
