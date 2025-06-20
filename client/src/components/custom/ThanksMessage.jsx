import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ThanksMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
      <FaCheckCircle className="text-green-500 text-5xl mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">
        Your message has been successfully sent. We appreciate your feedback and
        will get back to you shortly.
      </p>
    </div>
  );
};

export default ThanksMessage;
