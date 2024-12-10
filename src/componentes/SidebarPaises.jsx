import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SidebarPaises.css";

const SidebarPaises = () => {
  const [paises, setPaises] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const navigate = useNavigate();

  const paisesG20 = [
    "South Africa",
    "Germany",
    "Saudi Arabia",
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "South Korea",
    "United States",
    "France",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Mexico",
    "United Kingdom",
    "Russia",
    "Turkey",
  ];

  useEffect(() => {
    const fetchPaises = async () => {
      const cachedData = localStorage.getItem("g20Countries");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setPaises(parsedData);
        setFilteredCountries(parsedData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const filteredCountries = data
          .filter((country) => paisesG20.includes(country.name.common))
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        setPaises(filteredCountries);
        setFilteredCountries(filteredCountries);
        localStorage.setItem("g20Countries", JSON.stringify(filteredCountries));
      } catch (error) {
        console.error("Erro ao buscar os países:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaises();
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country.cca3); 
    navigate(`/countries/${country.cca3}`, { state: { country } });
  };

  const handleRegionChange = (region) => {
    let updatedRegions;
    if (selectedRegions.includes(region)) {
      updatedRegions = selectedRegions.filter((r) => r !== region);
    } else {
      updatedRegions = [...selectedRegions, region];
    }
    setSelectedRegions(updatedRegions);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const filteredByNameAndRegion = paises.filter((country) => {
    const nameMatches = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const regionMatches = selectedRegions.length
      ? selectedRegions.includes(country.region)
      : true;

    return nameMatches && regionMatches;
  });

  const uniqueRegions = [...new Set(paises.map((country) => country.region))];

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Filtrar por Região</h2>
      <div className="region-selector">
        {uniqueRegions.map((region) => (
          <label key={region} className="region-option">
            <input
              type="checkbox"
              value={region}
              checked={selectedRegions.includes(region)}
              onChange={() => handleRegionChange(region)}
            />
            {region || "Sem Região"}
          </label>
        ))}
      </div>

      <h2 className="sidebar-title">Buscar por País</h2>
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <h2 className="sidebar-title">Países do G20</h2>
      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <ul className="countries-list">
          {filteredByNameAndRegion.map((country) => (
            <li
              key={country.cca3}
              className={`country-item ${
                selectedCountry === country.cca3 ? "selected" : ""
              }`}
              onClick={() => handleCountryClick(country)}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarPaises;











