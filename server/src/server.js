import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config({ quiet: true });

const port = process.env.PORT;
// const corsOrigin = process.env.CORS_ORIGIN;

const app = express();
const server = http.createServer(app);

connectDB();

const io = new SocketIO(server);

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.use(errorHandler);

io.on("connection", (socket) => {
  socket.username = socket.handshake.auth.username;
  console.log(`${socket.username} connected`);

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
