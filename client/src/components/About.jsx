import React from "react";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center"
    >
      <div className="max-w-full h-full lg:max-w-3/4">
        <img src="/about.png" alt="about_img" className="w-[72rem] h-full" />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center mb-5 mx-1 p-10">
        <h1 className="text-4xl font-bold mb-6">👋 About ResourceClade</h1>

        <p className="text-lg mb-2">
          <span className="font-semibold text-indigo-500">ResourceClade</span>{" "}
          is a passion-driven initiative focused on making tech education clear,
          accessible, and centralized for everyone — no matter where they start.
          💡
        </p>

        <p className="text-lg mb-2">
          If you've ever wondered what{" "}
          <span className="font-semibold text-indigo-500">Web Development</span>
          , <span className="font-semibold text-indigo-500">AI & ML</span>, or{" "}
          <span className="font-semibold text-indigo-500">DevOps</span> actually
          involve — or where to begin — you're in the right place.
        </p>

        <p className="text-lg mb-2">
          This platform introduces each domain with a short explanation and
          handpicked, beginner-friendly resources. From the tools you'll use to
          the skills you'll need — everything is organized to make your learning
          journey smoother. 📘⚙️
        </p>

        <p className="text-lg">
          The mission is simple: to empower learners by putting all the
          essential tech knowledge and paths in one accessible place. Whether
          you're exploring, switching, or just starting — ResourceClade is here
          to guide you. 🌱🚀
        </p>
        <p className="text-lg font-semibold">
          All referenced resources belong to their respective creators. Please
          contact us for attribution updates or removal requests.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
