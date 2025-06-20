import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import MobileNavbar from "./MobileNavbar";
import ThemeToggle from "../ui/ThemeToggle";
import SignInDialog from "../ui/SignInDialog";
import { useAuth } from "../context/AuthProvider";
import User from "./UserIcon";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const { theme } = useTheme();
  const { user } = useAuth();
  return (
    <div
      className={`flex items-center justify-between scroll-m-1 ${
        theme === "light"
          ? "bg-gray-100 text-gray-700 shadow-md"
          : "bg-zinc-600 text-gray-100 shadow-xl"
      } w-full sticky top-0 z-50`}
    >
      <div className="flex items-center justify-center">
        <MobileNavbar />
        <Link to="/">
          <img
            src={`${
              theme === "light"
                ? "/resourceclade.png"
                : "/resourceclade_dark.png"
            }`}
            alt="logo"
            className="ml-10 mt-1 md:ml-1 w-30 h-10 md:w-44 md:h-14"
          />
        </Link>
      </div>
      <div
        className={`flex gap-8 justify-evenly items-center ${
          user ? "p-2" : "p-4"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `text-sm md:text-[1rem] cursor-pointer transition-colors hidden sm:block ${
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
        <div className="flex gap-4 justify-evenly items-center transition-transform">
          <ThemeToggle />
          <span>{user ? <User /> : <SignInDialog />}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
