import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useModel } from "../context/ModelProvider";
import { Outlet, useLocation } from "react-router-dom";
import LoginMessage from "../ui/LoginMessage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { setIsOpen, setRedirectPath } = useModel();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setRedirectPath(location.pathname);
      setIsOpen(true);
    }
  }, [user, setIsOpen, location, setRedirectPath]);

  return user ? <Outlet /> : <LoginMessage />;
};

export default ProtectedRoute;
