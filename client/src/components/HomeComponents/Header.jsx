import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "../context/ThemeProvider";

const Header = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full text-center p-8 sm:p-3">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl p-4 sm:m-4">
        <span className="text-amber-300">🚀 ResourceClade </span>
        <span className="text-cyan-500">
          -
          <Typewriter
            words={[
              "Your Gateway to Free Tech Knowledge",
              "Web Development",
              "App Development",
              "Artificial Intelligence",
              "Machine Learning",
              "Cloud Computing",
              "Data Science",
              "UI/UX Design",
              "Cyber Security",
              "DevOps",
              "Programming Languages",
              "Frontend Engineering",
              "Backend Services",
              "Database Systems",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            cursorBlinking
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </span>
      </h1>
      <p className="sm:text-xl p-3 font-light ">
        Your guide to 🌐 free and ✅ trusted tech resources 🎓
      </p>
    </div>
  );
};

export default Header;
