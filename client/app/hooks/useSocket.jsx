import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const useSocket = (username) => {
  const socketRef = useRef(null);

  if (!socketRef.current) {
    socketRef.current = io(import.meta.env.VITE_SERVER_URL, {
      auth: { username },
    });
  }

  const socket = socketRef.current;

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      toast.success("Connected");
    });

    socket.on("disconnect", () => {
      toast.error("Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return socket;
};

export default useSocket;
