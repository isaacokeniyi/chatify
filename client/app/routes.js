import { index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  layout("./auth/layout.jsx", [route("login", "./auth/login.jsx"), route("register", "./auth/register.jsx")]),
];
