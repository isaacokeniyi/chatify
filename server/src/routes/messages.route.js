import { Router } from "express";
import { fetchMessages, sendMessages, deleteMessages } from "../controllers/messages.controller.js";

const router = Router();

router.get("/messages", fetchMessages);
router.post("/messages", sendMessages);
router.delete("/messages/:id", deleteMessages);

export default router;
