import { Router } from "express";
import { deleteUser } from "../controllers/users.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticateToken);

router.delete("/", deleteUser);

export default router;
