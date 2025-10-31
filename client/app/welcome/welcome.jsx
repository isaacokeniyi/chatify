import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
}
