import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "./context/ThemeProvider";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const { data } = await axios.post(
        "https://api.web3forms.com/submit",
        formData
      );
      if (data.success) {
        toast.success("Your message has been successfully sent.");
        setSubmitted(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Submission failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) navigate("/contact/thanks");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center"
    >
      <div className="flex flex-col gap-5 items-center justify-center mx-1 p-8">
        <h1 className="text-4xl font-bold mb-6">📬 Contact Us</h1>
        <p className="text-lg mb-6">
          We'd love to hear from you! Whether you want to suggest a resource,
          ask a question, or just say hi 👋 — reach out!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            type="hidden"
            name="access_key"
            value="6938ae0e-39a4-48e5-9a96-e31d1147ee6e"
          />

          <input
            type="text"
            name="first_name"
            placeholder="Your Name"
            className={`w-full p-3 rounded-lg border ${
              theme === "light"
                ? "border-gray-300 bg-gray-100 placeholder:text-gray-800"
                : "border-gray-700 bg-zinc-800 placeholder:text-gray-100"
            } transition-all`}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className={`w-full p-3 rounded-lg border ${
              theme === "light"
                ? "border-gray-300 bg-gray-100 placeholder:text-gray-800"
                : "border-gray-700 bg-zinc-800 placeholder:text-gray-100"
            } transition-all`}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className={`w-full p-3 h-32 resize-none rounded-lg border ${
              theme === "light"
                ? "border-gray-300 bg-gray-100 placeholder:text-gray-800"
                : "border-gray-700 bg-zinc-800 placeholder:text-gray-100"
            } transition-all`}
            required
          ></textarea>

          <Button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-cyan-600 transition"
          >
            {loading ? "Sending..." : "Send Message ✉️"}
          </Button>
        </form>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <img src="/contact.png" alt="contact" className="w-[40rem]" />
      </div>
    </motion.div>
  );
};

export default Contact;
