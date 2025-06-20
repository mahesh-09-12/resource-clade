import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../context/ThemeProvider";

const links = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { theme } = useTheme();

  return (
    <div className="sm:hidden z-50">
      <button
        className={`${
          theme === "light" ? "text-gray-700" : "text-gray-100"
        } cursor-pointer p-2 fixed top-5 left-0.5`}
        onClick={toggleOpen}
      >
        {!isOpen && <MdMenu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-none bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            ></motion.div>
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 50 }}
              className="fixed left-0 top-0 bg-gray-200/10 text-gray-800 backdrop-blur-md w-3/4 h-screen z-50 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
                <button
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-gray-100"
                  } cursor-pointer p-2 absolute top-3 right-2`}
                  onClick={toggleOpen}
                >
                  <IoClose size={24} />
                </button>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img
                    src={`${
                      theme === "light"
                        ? "/resourceclade.png"
                        : "/resourceclade_dark.png"
                    }  `}
                    alt="logo"
                    className="absolute top-5 left-4 w-44 h-14"
                  />
                </Link>
                {links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-lg p-2 transition-colors ${
                        theme === "light" ? "text-gray-950" : "text-gray-100"
                      } ${isActive ? "font-semibold" : "hover:text-blue-400"}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
