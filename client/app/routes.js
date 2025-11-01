import { index, layout, route } from "@react-router/dev/routes";

export default [
  index("home/home.jsx"),
  layout("./auth/layout.jsx", [route("login", "./auth/login.jsx"), route("register", "./auth/register.jsx")]),
  route("chat", "./chat/chat.jsx"),
];
