import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-4 w-screen h-screen bg-linear-to-r from-blue-500 to-fuchsia-600">
      <h1 className="text-white font-extrabold text-5xl mb-20 max-md:text-4xl max-sm:text-2xl max-sm:mb-12">
        WELCOME TO CHATIFY!
      </h1>
      <Outlet />
    </main>
  );
};

export default Layout;
