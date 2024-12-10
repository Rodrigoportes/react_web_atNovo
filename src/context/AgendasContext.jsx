import React, { createContext, useState } from "react";

export const AgendasContext = createContext();

export const AgendasProvider = ({ children }) => {
  const [agendas, setAgendas] = useState([]);

  const cadastrarAgenda = (agenda) => {
    setAgendas((prevAgendas) => [...prevAgendas, agenda]);
  };

  return (
    <AgendasContext.Provider value={{ agendas, cadastrarAgenda }}>
      {children}
    </AgendasContext.Provider>
  );
};
