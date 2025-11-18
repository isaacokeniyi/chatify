import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
