import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export function meta() {
  return [{ title: "Sign in to Chatify" }, { name: "description", content: "The sign in page for chatify" }];
}

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.username);
      navigate("/chat");
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <main className="w-md p-8 rounded-lg shadow-lg bg-white max-md:w-sm max-sm:w-[75vw] max-sm:p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 max-sm:text-lg">SIGN IN</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-gray-700 max-sm:text-sm">
            Username or Email
          </label>
          <input
            type="text"
            id="identifier"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter username or email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 max-sm:text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          LOGIN
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 max-sm:text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold">
          Register here
        </Link>
      </p>
    </main>
  );
};

export default Login;
