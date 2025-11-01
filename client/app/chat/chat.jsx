import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Chatify: Chat with the world" },
    { name: "description", content: "Welcome to Chatify a global chat platform" },
  ];
}

const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <main>
      Global Chat
      <button onClick={handleLogout}>Log out</button>
    </main>
  );
};
export default Chat;
