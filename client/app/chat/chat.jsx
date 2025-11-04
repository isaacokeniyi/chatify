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
      <div className="h-1/8 flex items-center justify-between px-12">
        <p className="text-2xl"> Global Chat</p>
        <button onClick={handleLogout} className="px-2 py-1 rounded-sm">
          Log out
        </button>
      </div>
      <div className="h-6/8">
        {messages.map((msg) => (
          <div key={msg._id}>
            <p>{msg.sender}</p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form className="h-1/8 flex items-center justify-between px-12">
        <input type="text" placeholder="Write a message" className="w-17/20 h-12 rounded-lg px-4" />
        <button type="submit" className="px-4 py-2 rounded-md">
          SEND
        </button>
      </form>
    </main>
  );
};
export default Chat;
