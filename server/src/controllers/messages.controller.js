import Message from "../model/messageSchema.js";
import AppError from "../utils/AppError.js";

export const fetchMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({});

    const formattedMessages = messages.map((msg) => {
      const { _id, sender, message, deleted, createdAt } = msg;
      return { _id, sender, deleted, message: deleted ? "This message has been deleted" : message, createdAt };
    });

    res.json(formattedMessages);
  } catch (err) {
    next(err);
  }
};

export const sendMessages = async (req, res, next) => {
  try {
    const io = req.app.get("io");
    const senderId = req.user;
    const { sender, message } = req.body;
    const newMessage = new Message({ senderId, sender, message });
    await newMessage.save();
    const { senderId: sId, ...rest } = newMessage;
    io.emit("newMessage", rest);
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    next(err);
  }
};

export const editMessages = async (req, res, next) => {
  try {
    const io = req.app.get("io");
    const { id: messageId } = req.params;
    const { message } = req.body;
    const messageToEdit = await Message.findById(messageId);

    timeDiff = new Date.now() - messageToEdit.createdAt;
    if (timeDiff > 180000) return next(new AppError(400, "You can no longer edit this message"));

    const editedMessage = await Message.findByIdAndUpdate(messageId, { message }, { new: true });

    const { senderId: sId, ...rest } = editedMessage;
    io.emit("editMessage", rest);
    res.status(200).json({ message: "Message Edited" });
  } catch (err) {
    next(err);
  }
};

export const deleteMessages = async (req, res, next) => {
  try {
    const io = req.app.get("io");
    const { id } = req.params;
    const user = req.user;
    const deletedMessage = await Message.findById(id);

    if (!deletedMessage || deletedMessage.senderId.toString() !== user)
      return next(new AppError(403, "You can only delete your messages"));
    await Message.findByIdAndUpdate(id, { deleted: true }, { new: true });

    io.emit("deleteMessage", deletedMessage._id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};
