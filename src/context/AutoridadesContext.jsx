import React, { createContext, useState } from "react";

export const AutoridadesContext = createContext();

export const AutoridadesProvider = ({ children }) => {
  const [autoridades, setAutoridades] = useState({});

  const cadastrarAutoridade = (pais, autoridade) => {
    setAutoridades((prev) => ({
      ...prev,
      [pais]: [...(prev[pais] || []), autoridade],
    }));
  };

  return (
    <AutoridadesContext.Provider value={{ autoridades, cadastrarAutoridade }}>
      {children}
    </AutoridadesContext.Provider>
  );
};
