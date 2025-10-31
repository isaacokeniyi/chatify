import { Link } from "react-router";

export function meta() {
  return [{ title: "Sign in to Chatify" }, { name: "description", content: "The sign in page for chatify" }];
}

export const Login = () => {
  return (
    <main className="w-md p-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">SIGN IN</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username or email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          LOGIN
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold">
          Register here
        </Link>
      </p>
    </main>
  );
};
