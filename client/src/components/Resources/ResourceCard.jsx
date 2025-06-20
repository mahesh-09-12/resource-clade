import React from "react";
import { IoGlobe, IoLogoGithub, IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const ResourceCard = ({ resource }) => {
  const { theme } = useTheme();
  return (
    <Link
      to={resource.res_url}
      target="_blank"
      className={`w-full h-full flex flex-col justify-center items-center gap-2 border border-gray-700 rounded-lg hover:scale-[103%] hover:shadow-lg ${
        theme === "dark" ? "hover:shadow-gray-400" : "hover:shadow-gray-800"
      } transition-all p-10 md:p-6`}
    >
      {resource.res_type === "web" ? (
        <IoGlobe
          className={`${
            theme === "light" ? "text-blue-600" : "text-blue-300"
          } transition-colors`}
          size={32}
        />
      ) : resource.res_type === "github" ? (
        <IoLogoGithub size={32} className="text-zinc-950" />
      ) : (
        <IoLogoYoutube className="text-red-500" size={32} />
      )}

      <h3 className="font-semibold text-lg md:text-xl">{resource.title}</h3>

      <p className="font-light text-sm md:text-[1rem]">
        {resource.res_description}
      </p>
    </Link>
  );
};

export default ResourceCard;
