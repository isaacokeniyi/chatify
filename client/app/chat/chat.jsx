import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useSocket from "../hooks/useSocket";
import ContextMenu from "../components/ContextMenu";

export function meta() {
  return [
    { title: "Chatify: Chat with the world" },
    { name: "description", content: "Welcome to Chatify a global chat platform" },
  ];
}

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState();
  const [user, setUser] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const messageEndRef = useRef();
  const firstLoad = useRef(true);
  const socket = useSocket(user);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat/messages`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) {
          navigate("/login");
          return toast.error(data.message);
        }

        setMessagesList(data);
        setUser(localStorage.getItem("user"));
      } catch (error) {
        // console.error(error.message);
      }
    };
    fetchChat();
  }, []);

  useEffect(() => {
    if (messagesList.length > 0) {
      if (firstLoad.current) {
        scrollBottom("auto");
        firstLoad.current = false;
      } else {
        scrollBottom("smooth", "check");
      }
    }
  }, [messagesList]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      setMessagesList((prev) => [...prev, message._doc]);
    });

    socket.on("deleteMessage", (messageId) => {
      setMessagesList((prev) => prev.map((msg) => (msg._id === messageId ? { ...msg, deleted: true } : msg)));
    });

    socket.on("editMessage", (message) => {
      setMessagesList((prev) => prev.map((msg) => (msg._id === message._doc._id ? { ...msg, ...message._doc } : msg)));
    });

    return () => {
      socket.off("newMessage");
      socket.off("deleteMessage");
      socket.off("editMessage");
    };
  }, [socket]);

  const scrollBottom = (scrollBehavior, check) => {
    const container = messageEndRef.current?.parentElement;
    if (!container) return;

    const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

    if (atBottom || !check) {
      messageEndRef.current?.scrollIntoView({ behavior: scrollBehavior });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!canSend) {
      return toast.warn("Hold on, still processing last message");
    }
    setCanSend(false);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sender: user, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);

        if (res.status === 401) {
          return navigate("/login");
        }
      }

      if (res.ok) {
        setMessage("");
        scrollBottom("smooth");
        toast.success(data.message);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setCanSend(true);
    }
  };

  const handleEditMessage = async (e, messageId) => {
    e.preventDefault();
    if (!canSend) {
      return toast.warn("Hold on, still processing last message");
    }
    setCanSend(false);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat/messages/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        if (res.status === 401) {
          return navigate("/login");
        }
      }

      if (res.ok) {
        setMessage("");
        setEditMode(false);
        scrollBottom("smooth", "check");
        toast.success(data.message);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setCanSend(true);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat/messages/${messageId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);

        if (res.status === 401) {
          return navigate("/login");
        }
      }

      if (res.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setMenuVisible(true);
    setSelectedMessageId(id);
  };

  const handleLogout = () => {
    socket.disconnect();
    localStorage.clear();
    navigate("/login");
    toast.success("Successfully Logged Out");
  };

  return (
    <main className="h-screen flex flex-col">
      {menuVisible && (
        <ContextMenu
          close={() => setMenuVisible(false)}
          deleteMsg={() => handleDeleteMessage(selectedMessageId)}
          editMsg={() => {
            setEditMode(true);
            setMessage(messagesList.find((msg) => msg._id === selectedMessageId).message);
          }}
        />
      )}
      <div className="h-1/8 flex items-center justify-between px-12 bg-[#3b82f6] text-white">
        <p className="text-2xl"> Global Chat</p>
        <button onClick={handleLogout} className="px-2 py-1 rounded-sm bg-red-500 hover:bg-red-600">
          Log out
        </button>
      </div>
      <div className="h-6/8 flex flex-col items-center gap-4 overflow-y-auto p-4 bg-[#f4f6f8] w-screen">
        {messagesList.map((msg) => (
          <div
            key={msg._id}
            onContextMenu={(e) => handleContextMenu(e, msg._id)}
            className={`max-w-3/5 rounded-sm flex flex-col p-2 ${msg.sender === user ? "bg-[#3b82f6] self-end" : "bg-[#e5e5ea] self-start"}`}
          >
            <strong className={` ${msg.sender === user ? "text-[#4f0099]" : "text-[#9333ea]"}`}>
              {msg.sender === user ? "You" : msg.sender}
            </strong>
            <p
              className={`wrap-break-word pr-4 ${msg.sender === user ? "text-white" : "text-black"} ${msg.deleted ? "opacity-50" : ""}`}
            >
              {msg.deleted ? `${msg.sender === user ? "You" : msg.sender} deleted this message` : msg.message}
            </p>
            <p className="text-xs text-gray-800 text-right">
              {msg.deleted ? "" : msg.createdAt === msg.updatedAt ? "" : "edited"}{" "}
            </p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <form
        className="h-1/8 flex items-center justify-between px-12"
        onSubmit={editMode ? (e) => handleEditMessage(e, selectedMessageId) : handleSendMessage}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message"
          className="w-17/20 h-12 rounded-lg px-4 text-[#333333] border border-[#d1d5db]"
        />
        {editMode ? (
          <div className="flex gap-2 justify-center items-center">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white font-extrabold hover:bg-green-500"
            >
              &#10003;
            </button>
            <button
              type="reset"
              className="px-4 py-2 rounded bg-red-600 text-white font-extrabold hover:bg-red-500"
              onClick={() => {
                setEditMode(false);
                setMessage("");
              }}
            >
              X
            </button>
          </div>
        ) : (
          <button type="submit" className="px-4 py-2 rounded-md bg-[#9333ea] text-white hover:bg-[#7622c6]">
            SEND
          </button>
        )}
      </form>
    </main>
  );
};
export default Chat;
