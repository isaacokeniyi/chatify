import { Router } from "express";
import { fetchMessages, sendMessages, deleteMessages } from "../controllers/messages.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.get("/messages", fetchMessages);
router.post("/messages", authenticateToken, sendMessages);
router.delete("/messages/:id", authenticateToken, deleteMessages);

export default router;
