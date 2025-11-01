import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [{ title: "Chatify" }, { name: "description", content: "Welcome to Chatify!s" }];
}
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/chat");
  }, []);
};

export default Home;
