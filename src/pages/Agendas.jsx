import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AgendasContext } from '../context/AgendasContext';

const Agendas = () => {
  const { agendas } = useContext(AgendasContext);
  const navigate = useNavigate(); 

  
  const agendasOrdenadas = agendas.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

  
  const handleCadastroClick = () => {
    navigate("/cadastro-apresentacao");
  };

  return (
    <div>
      <h1>Agenda de Apresentações</h1>
      
      <button onClick={handleCadastroClick}>Cadastrar Nova Apresentação</button>
      
      <table>
        <thead>
          <tr>
            <th>Data e Hora</th>
            <th>País</th>
            <th>Autoridade - Cargo</th>
          </tr>
        </thead>
        <tbody>
          {agendasOrdenadas.map((agenda, index) => (
            <tr key={index}>
              <td>{new Date(agenda.dataHora).toLocaleString()}</td>
              <td>{agenda.pais}</td> 
              <td>{agenda.autoridade} - {agenda.cargo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agendas;
