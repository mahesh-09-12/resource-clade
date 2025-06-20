import React from "react";
import Header from "./HomeComponents/Header";
import Hero from "./HomeComponents/Hero";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col w-full h-full items-center justify-center"
    >
      <Header />
      <Hero />
    </motion.div>
  );
};

export default Home;
