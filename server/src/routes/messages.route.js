import { Router } from "express";
import { fetchMessages, sendMessages, deleteMessages, editMessages } from "../controllers/messages.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";
import {
  deleteMessageValidator,
  editMessageValidator,
  sendMessageValidator,
} from "../validators/messages.validator.js";
import validate from "../middleware/validate.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/messages", fetchMessages);
router.post("/messages", sendMessageValidator, validate, sendMessages);
router.patch("/messages", editMessageValidator, validate, editMessages);
router.delete("/messages/:id", deleteMessageValidator, deleteMessages);

export default router;
