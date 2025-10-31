import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
};
