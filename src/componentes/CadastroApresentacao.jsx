import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AutoridadesContext } from "../context/AutoridadesContext";
import { AgendasContext } from "../context/AgendasContext";

const CadastroApresentacao = () => {
  const { autoridades } = useContext(AutoridadesContext);
  const { agendas, cadastrarAgenda } = useContext(AgendasContext);
  const navigate = useNavigate();

  const [autoridadeSelecionada, setAutoridadeSelecionada] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [erro, setErro] = useState("");

  
  const autoridadesList = Object.entries(autoridades).flatMap(([pais, listaDeAutoridades]) =>
    listaDeAutoridades.map((autoridade, index) => ({
      pais,
      autoridade,
      key: `${pais}-${index}`,
    }))
  );

 
  const verificarConflitos = (novaDataHora) => {
    const novaData = new Date(novaDataHora);

    
    for (let agenda of agendas) {
      const agendaData = new Date(agenda.dataHora);
      const tempoAntes = new Date(agendaData.getTime() - 15 * 60000); 
      const tempoDepois = new Date(agendaData.getTime() + 15 * 60000); 

      if (novaData >= tempoAntes && novaData <= tempoDepois) {
        return true; 
      }
    }
    return false;
  };

  
  const cadastrarApresentacao = (e) => {
    e.preventDefault();

    if (!autoridadeSelecionada || !dataHora) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    
    const dataSelecionada = new Date(dataHora);
    const dataPermitida = [new Date("2025-11-18T00:00:00"), new Date("2025-11-19T23:59:59")];

    if (dataSelecionada < dataPermitida[0] || dataSelecionada > dataPermitida[1]) {
      setErro("A data e hora selecionada devem ser entre 18 e 19 de novembro de 2025.");
      return;
    }

    
    if (verificarConflitos(dataHora)) {
      setErro("A data e hora selecionada conflitam com outra apresentação.");
      return;
    }

    
    const autoridadeSelecionadaInfo = autoridadesList.find(
      ({ autoridade }) => autoridade.nome === autoridadeSelecionada
    );

    
    cadastrarAgenda({
      pais: autoridadeSelecionadaInfo.pais,
      autoridade: autoridadeSelecionadaInfo.autoridade.nome,
      cargo: autoridadeSelecionadaInfo.autoridade.cargo,
      dataHora: dataHora,
    });

    
    navigate("/agendas");
  };

  return (
    <div>
      <h1>Cadastrar Apresentação</h1>
      {erro && <div className="error">{erro}</div>}
      <form onSubmit={cadastrarApresentacao}>
        <div>
          <label>Autoridade:</label>
          <select
            value={autoridadeSelecionada}
            onChange={(e) => setAutoridadeSelecionada(e.target.value)}
          >
            <option value="">Selecione uma autoridade</option>
            {autoridadesList.map(({ pais, autoridade, key }) => (
              <option key={key} value={autoridade.nome}>
                {pais} - {autoridade.nome} - {autoridade.cargo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            min="2025-11-18T00:00"
            max="2025-11-19T23:59"
          />
        </div>

        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroApresentacao;



