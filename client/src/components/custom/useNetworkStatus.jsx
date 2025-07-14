import { useEffect, useState } from "react";

const getConnectionSpeed = () => {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  return connection?.effectiveType || "unknown";
};

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionSpeed, setConnectionSpeed] = useState(getConnectionSpeed());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setConnectionSpeed(getConnectionSpeed());
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const connection = navigator.connection;
    if (connection) {
      connection.addEventListener("change", () => {
        setConnectionSpeed(getConnectionSpeed());
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (connection) {
        connection.removeEventListener("change", () => {});
      }
    };
  }, []);

  return { isOnline, connectionSpeed };
};

export default useNetworkStatus;
