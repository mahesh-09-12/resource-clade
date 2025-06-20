import { Button } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Hero = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 md:py-14 mt-4 md:mt-10 text-center p-6 ${
        theme === "light" ? "text-gray-800" : "text-gray-100"
      }`}
    >
      <h2 className="text-2xl md:text-4xl font-bold m-2">
        Discover Quality Tech Resources
      </h2>
      <h3 className="text-xl md:text-3xl font-semibold m-2">
        📚 Learn. 💡 Build. 🎯 Succeed.
      </h3>
      <p className="my-2 mx-auto max-w-xl p-3">
        A curated platform to explore tutorials, videos, courses, and
        documentation across tech domains — free and community-driven
      </p>
      <Link to="/resources">
        <Button className="rounded-lg cursor-pointer bg-cyan-500 px-4 py-2 text-sm text-white data-hover:bg-cyan-600 data-hover:data-active:bg-cyan-700 my-3">
          Explore Now
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
