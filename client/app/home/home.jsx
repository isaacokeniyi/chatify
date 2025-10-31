import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [{ title: "Chatify" }, { name: "description", content: "Welcome to Chatify!s" }];
}

export const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
};
