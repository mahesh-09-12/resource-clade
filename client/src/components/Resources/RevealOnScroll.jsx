import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const RevealOnScroll = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.25 });

  const [scrollDir, setScrollDir] = useState("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initialY = scrollDir === "down" ? 30 : -30;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: initialY }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
