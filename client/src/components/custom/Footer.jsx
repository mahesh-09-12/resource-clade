import React from "react";
import { useTheme } from "../context/ThemeProvider";

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
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Resource Clade. Built by Mahesh
      </p>
    </footer>
  );
};

export default Footer;
