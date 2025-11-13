import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export function meta() {
  return [{ title: "Sign up for Chatify" }, { name: "description", content: "The sign up page for chatify" }];
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logMeIn, setLogMeIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, logMeIn }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success(data.message);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        navigate("/chat");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <main className="w-md p-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">SIGN UP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            pattern="^[a-zA-Z0-9_]{3,16}$"
            title="Username must be 3-16 characters and can only contain letter, numbers or underscores"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john doe"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="logMeIn" checked={logMeIn} onChange={(e) => setLogMeIn(e.target.checked)} />
          <label htmlFor="logMeIn">Log Me In</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          REGISTER
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
          Login here
        </Link>
      </p>
    </main>
  );
};

export default Register;
