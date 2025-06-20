import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    getResources();
    getFavorites();
  }, []);

  const getResources = async () => {
    setLoading(true);
    try {
      const resource = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/resources`
      );
      setResources(resource.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getFavorites = async () => {
    setLoading(true);
    try {
      const favs = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/favorites/${user.id}`
      );
      const favIds = favs.data.map((fav) => fav.resourceId._id);
      setFavorites(favIds);
    } catch (error) {
      if (resources && !favorites)
        toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResourceContext.Provider
      value={{ resources, setResources, favorites, setFavorites, loading }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => useContext(ResourceContext);
