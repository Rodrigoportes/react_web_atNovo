import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AutoridadesContext } from "../context/AutoridadesContext";

const CadastroAutoridade = () => {
  const { cadastrarAutoridade, autoridades } = useContext(AutoridadesContext);
  const navigate = useNavigate();
  const location = useLocation();
  const countryCode = location.state?.countryCode || "";

  const paisesG20 = [
    { nome: "South Africa", tld: ".za" },
    { nome: "Germany", tld: ".de" },
    { nome: "Saudi Arabia", tld: ".sa" },
    { nome: "Argentina", tld: ".ar" },
    { nome: "Australia", tld: ".au" },
    { nome: "Brazil", tld: ".br" },
    { nome: "Canada", tld: ".ca" },
    { nome: "China", tld: ".cn" },
    { nome: "South Korea", tld: ".kr" },
    { nome: "United States", tld: ".us" },
    { nome: "France", tld: ".fr" },
    { nome: "India", tld: ".in" },
    { nome: "Indonesia", tld: ".id" },
    { nome: "Italy", tld: ".it" },
    { nome: "Japan", tld: ".jp" },
    { nome: "Mexico", tld: ".mx" },
    { nome: "United Kingdom", tld: ".uk" },
    { nome: "Russia", tld: ".ru" },
    { nome: "Turkey", tld: ".tr" },
  ];

  const [autoridade, setAutoridade] = useState({
    nome: "",
    cargo: "",
    email: "",
    pais: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutoridade((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!countryCode) {
      alert("Nenhum país foi selecionado para o cadastro.");
      return;
    }

    
    const nomeParts = autoridade.nome.trim().split(" ");
    if (nomeParts.length < 2 || nomeParts.some((part) => part.length < 2)) {
      alert("Por favor, insira um nome completo com pelo menos dois nomes.");
      return;
    }

   
    const autoridadesDoPais = autoridades[countryCode] || [];
    const cargoExistente = autoridadesDoPais.some(
      (aut) => aut.cargo === autoridade.cargo
    );

    if (cargoExistente) {
      alert(
        `O cargo "${autoridade.cargo}" já foi atribuído a uma autoridade neste país.`
      );
      return;
    }

  
    const paisSelecionado = paisesG20.find(
      (pais) => pais.nome === autoridade.pais
    );
    if (paisSelecionado && !autoridade.email.endsWith(paisSelecionado.tld)) {
      alert(
        `O e-mail deve ter um domínio que termina com "${paisSelecionado.tld}".`
      );
      return;
    }

    cadastrarAutoridade(countryCode, autoridade);
    alert("Autoridade cadastrada com sucesso!");
    navigate(`/countries/${countryCode}`);
  };

  return (
    <div>
      <h1>Cadastrar Autoridade</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={autoridade.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cargo:</label>
          <select
            name="cargo"
            value={autoridade.cargo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o cargo</option>
            <option value="Chefe de Estado">Chefe de Estado</option>
            <option value="Ministros de Finança">Ministros de Finança</option>
            <option value="Presidente de Banco Central">
              Presidente de Banco Central
            </option>
          </select>
        </div>
        <div>
          <label>País:</label>
          <select
            name="pais"
            value={autoridade.pais}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o país</option>
            {paisesG20.map((pais, index) => (
              <option key={index} value={pais.nome}>
                {pais.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={autoridade.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroAutoridade;












