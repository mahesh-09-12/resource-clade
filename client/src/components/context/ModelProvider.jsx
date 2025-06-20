import React, { createContext, useContext, useState } from "react";
const ModelContext = createContext();
export const ModelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectePath, setRedirectPath] = useState("/");
  return (
    <ModelContext.Provider
      value={{ isOpen, setIsOpen, redirectePath, setRedirectPath }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
