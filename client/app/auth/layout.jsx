import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-4 w-screen h-screen bg-linear-to-r from-blue-500 to-fuchsia-600">
      <h1 className="text-white font-extrabold text-5xl mb-20">WELCOME TO CHATIFY!</h1>
      <Outlet />
    </main>
  );
}
