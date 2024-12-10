import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AutoridadesContext } from "../context/AutoridadesContext";

const Authorities = () => {
  const { autoridades } = useContext(AutoridadesContext);
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate("/authorities/new");
  };

  return (
    <div>
      <h1>Lista de Autoridades</h1>
      {Object.keys(autoridades || {}).length === 0 ? (
        <p>Nenhuma autoridade cadastrada.</p>
      ) : (
        <ul>
          {Object.entries(autoridades).map(([pais, autoridadesPais]) => (
            <li key={pais}>
              <h2>{pais}</h2>
              <ul>
                {autoridadesPais.map((autoridade, index) => (
                  <li key={index}>
                    <strong>{autoridade.nome}</strong> - {autoridade.cargo} - {autoridade.email}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default Authorities;


