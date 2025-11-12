import { Router } from "express";
import { fetchMessages, sendMessages, deleteMessages } from "../controllers/messages.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";
import { deleteMessageValidator, sendMessageValidator } from "../validators/messages.validator.js";
import validate from "../middleware/validate.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/messages", fetchMessages);
router.post("/messages", sendMessageValidator, validate, sendMessages);
router.delete("/messages/:id", deleteMessageValidator, deleteMessages);

export default router;
