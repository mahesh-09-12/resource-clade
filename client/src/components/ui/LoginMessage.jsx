import React from "react";
import { Link } from "react-router-dom";

const LoginMessage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h3 className="text-4xl font-bold text-red-500 mb-4">Sign in</h3>
      <p className="text-gray-600 mb-6">please sign in to continue</p>
      <Link
        to="/"
        className="px-4 py-2 bg-cyan-600 rounded-md hover:bg-cyan-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default LoginMessage;
