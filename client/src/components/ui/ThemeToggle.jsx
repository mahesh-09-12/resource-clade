import React from "react";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  IoSunnyOutline,
  IoMoonOutline,
  IoBulb,
  IoStarOutline,
  IoPlanetOutline,
  IoStar,
  IoBulbOutline,
} from "react-icons/io5";
import { useTheme } from "../context/ThemeProvider";
import { FcLeave } from "react-icons/fc";
import { BiLeaf } from "react-icons/bi";

const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      aria-pressed={theme === "dark"}
      onChange={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-400"
      }`}
    >
      <span className="sr-only">Toggle Theme</span>

      <motion.span
        initial={false}
        layout
        className="absolute left-1 top-1 h-6 w-6 rounded-full bg-gray-100 shadow-md"
        animate={{ x: theme === "dark" ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {theme === "light" ? (
        <IoPlanetOutline size={18} className="text-indigo-900 ml-8" />
      ) : (
        <IoBulbOutline size={18} className="text-yellow-400 mx-1.5" />
      )}
    </Switch>
  );
});

export default ThemeToggle;
