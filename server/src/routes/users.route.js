import { Router } from "express";
import { deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.delete("/", deleteUser);

export default router;
