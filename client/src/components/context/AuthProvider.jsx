import React, { useState, useContext, createContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useModel } from "./ModelProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setIsOpen, redirectPath, setRedirectPath } = useModel();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("rcuser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your connection.");
        return;
      }

      if (!tokenRes.access_token) {
        toast.error("Authentication failed. Please try again.");
        return;
      }
      await getUserDetails(tokenRes.access_token);
    },
    onError: (err) => {
      console.error("Google Login Error: ", err);
      toast.error("Google Login Error!");
    },
  });

  const getUserDetails = async (accessToken) => {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUser(data);
      localStorage.setItem("rcuser", JSON.stringify(data));
      setIsOpen(false);
      toast.success("Sign in success");
      navigate(redirectPath);
      setRedirectPath("/");
    } catch (error) {
      if (!navigator.onLine) {
        toast.error("You're offline. Connect to the internet and try again.");
      } else if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please check your connection.");
      } else {
        console.error("Error fetching user info:", error);
        toast.error("Sign in failed! Please try again later.");
      }
    }
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("rcuser");
    toast.success("Signed out successfully!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
