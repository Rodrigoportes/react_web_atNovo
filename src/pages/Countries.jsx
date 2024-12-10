import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AutoridadesContext } from "../context/AutoridadesContext";

const Countries = () => {
  const { countryCode } = useParams(); 
  const navigate = useNavigate();
  const { autoridades } = useContext(AutoridadesContext);
  
  const [countryDetails, setCountryDetails] = useState(null);
  const [autoridadesDoPais, setAutoridadesDoPais] = useState([]);

  useEffect(() => {
    
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        setCountryDetails(data[0]); 
      } catch (error) {
        console.error("Erro ao buscar os dados do país:", error);
      }
    };

    fetchCountryData();

    
    setAutoridadesDoPais(autoridades[countryCode] || []);
  }, [countryCode, autoridades]);

  if (!countryDetails) {
    return <p>Selecione um país na sidebar</p>;
  }

  const { name, capital, region, languages, tld } = countryDetails;
  const firstLanguage = languages ? Object.values(languages)[0] : "Idioma não disponível";

  const handleNewAuthority = () => {
    navigate("/authorities/new", { state: { countryCode } });
  };

  return (
    <div>
      <h1>Detalhes de {name.common}</h1>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Região:</strong> {region}</p>
      <p><strong>Idioma:</strong> {firstLanguage}</p>
      <p><strong>Domínio:</strong> {tld}</p>

      <h2>Autoridades Cadastradas:</h2>
      {autoridadesDoPais.length === 0 ? (
        <p>Nenhuma autoridade cadastrada.</p>
      ) : (
        <ul>
          {autoridadesDoPais.map((autoridade, index) => (
            <li key={index}>
              <strong>{autoridade.nome}</strong> - {autoridade.cargo} - {autoridade.email}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleNewAuthority}>Cadastrar Nova Autoridade</button>
    </div>
  );
};

export default Countries;






