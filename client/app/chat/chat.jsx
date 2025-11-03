import { useEffect } from "react";
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
    <main>
      <div>
        Global Chat
        <button onClick={handleLogout}>Log out</button>
      </div>
    </main>
  );
};
export default Chat;
