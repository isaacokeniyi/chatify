import { useEffect, useState } from "react";
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
  const [messages, setMessages] = useState([]);

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
        setMessages(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchChat();
  }, []);

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
      <div className="h-6/8 flex flex-col items-center gap-4 overflow-y-auto p-4 bg-[#f4f6f8]">
        {messages.map((msg) => (
          <div key={msg._id} className="max-w-3/5 rounded-sm flex flex-col self-start p-2 bg-[#e5e5ea]">
            <strong className="text-[#9333ea]">{msg.sender}</strong>
            <p className="wrap-break-word pr-4">{msg.message}</p>
          </div>
        ))}
      </div>
      <form className="h-1/8 flex items-center justify-between px-12">
        <input
          type="text"
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
