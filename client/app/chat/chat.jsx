import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
  const [user, setUser] = useState("");
  const messageEndRef = useRef();
  const firstLoad = useRef(true);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        let token = localStorage.getItem("token");
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
        console.error(error.message);
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

  const scrollBottom = (scrollBehavior, check) => {
    const container = messageEndRef.current?.parentElement;
    if (!container) return;

    const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;

    if (atBottom || !check) {
      messageEndRef.current?.scrollIntoView({ behavior: scrollBehavior });
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sender: user, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        navigate("/login");
        return toast.error(data.message);
      }

      setMessage("");
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Successfully Logged Out");
  };

  return (
    <main className="h-screen flex flex-col">
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
            className={`max-w-3/5 rounded-sm flex flex-col p-2 ${msg.sender === user ? "bg-[#3b82f6] self-end" : "bg-[#e5e5ea] self-start"}`}
          >
            <strong className={` ${msg.sender === user ? "text-[#4f0099]" : "text-[#9333ea]"}`}>
              {msg.sender === user ? "You" : msg.sender}
            </strong>
            <p
              className={`wrap-break-word pr-4 ${msg.sender === user ? "text-white" : "text-black"} ${msg.deleted ? "opacity-50" : ""}`}
            >
              {msg.message}
            </p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <form className="h-1/8 flex items-center justify-between px-12" onSubmit={handleMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message"
          className="w-17/20 h-12 rounded-lg px-4 text-[#333333] border border-[#d1d5db]"
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-[#9333ea] text-white hover:bg-[#7622c6]">
          SEND
        </button>
      </form>
    </main>
  );
};
export default Chat;
