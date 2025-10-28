import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";

dotenv.config({ quiet: true });

const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
