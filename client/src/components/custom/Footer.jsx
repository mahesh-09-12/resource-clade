import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`w-full mt-auto mb-1 py-4 text-center border-t ${
        theme === "light"
          ? "bg-gray-200 text-gray-700 border-gray-300"
          : "bg-zinc-950 text-gray-400 border-zinc-800"
      } shadow transition-all`}
    >
      <p className="text-sm flex justify-center items-center gap-1">
        &copy; {new Date().getFullYear()} Resource Clade. Built with{" "}
        <FaHeart size={12} className="text-red-600" />
        by Mahesh
      </p>
    </footer>
  );
};

export default Footer;
