import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/custom/ProtectedRoute";

import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/custom/Navbar";
import { useTheme } from "./components/context/ThemeProvider";
import Resources from "./components/Resources/Resources";
import ResourceDetails from "./components/Resources/ResourceDetails";
import { ResourceProvider } from "./components/context/ResourceProvider";
import ThanksMessage from "./components/custom/ThanksMessage";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/ui/NotFound";
import useNetworkStatus from "./components/custom/useNetworkStatus";
import ScrollToTop from "./components/custom/ScrollToTop";
import Footer from "./components/custom/Footer";
const App = () => {
  const { theme } = useTheme();
  const { isOnline, connectionSpeed } = useNetworkStatus();
  return (
    <ResourceProvider>
      <div
        className={`w-full min-h-screen flex flex-col ${
          theme === "light"
            ? "text-gray-800 bg-gray-100"
            : "text-gray-300 bg-zinc-900"
        } transition-all`}
      >
        <ScrollToTop />
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            richColors: true,
            duration: 3000,
            style: {
              fontWeight: "500",
            },
          }}
          reverseOrder={false}
        />
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-center text-xs z-50">
            ⚠️ You are offline
          </div>
        )}

        {isOnline && connectionSpeed === "slow-2g" && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-center text-xs z-50">
            ⚠️ Network is very slow
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourceDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/thanks" element={<ThanksMessage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ResourceProvider>
  );
};

export default App;
