import Message from "../model/messageSchema.js";

export const fetchMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessages = async (req, res, next) => {
  try {
    const io = req.app.get("io");
    const { senderId, sender, message } = req.body;
    const newMessage = new Message({ senderId, sender, message });
    await newMessage.save();
    io.emit("newMessage", newMessage);
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    next(err);
  }
};

export const deleteMessages = async (req, res, next) => {
  try {
    const io = req.app.get("io");
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndUpdate(id, { deleted: true }, { new: true });
    io.emit("deleteMessage", deletedMessage);
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};
