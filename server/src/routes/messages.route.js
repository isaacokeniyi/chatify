import { Router } from "express";
import { fetchMessages, sendMessages, deleteMessages } from "../controllers/messages.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/messages", fetchMessages);
router.post("/messages", sendMessages);
router.delete("/messages/:id", deleteMessages);

export default router;
