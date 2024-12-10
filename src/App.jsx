import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutoridadesProvider } from "./context/AutoridadesContext";
import { AgendasProvider } from "./context/AgendasContext"; 
import SidebarPaises from "./componentes/SidebarPaises";
import FooterMenu from "./componentes/FooterMenu";
import Countries from "./pages/Countries";
import Authorities from "./pages/Authorities";
import Agendas from "./pages/Agendas";
import CadastroAutoridade from "./componentes/CadastroAutoridade";
import CadastroApresentacao from "./componentes/CadastroApresentacao"; 
import NotFound from "./pages/NotFound";
import "./css/App.css";

const App = () => {
  return (
    <AutoridadesProvider>
      <AgendasProvider> 
        <Router>
          <div className="app">
            <SidebarPaises />
            <div className="content">
              <Routes>
                <Route path="/countries" element={<Countries />} />
                <Route path="/countries/:countryCode" element={<Countries />} />
                <Route path="/authorities" element={<Authorities />} />
                <Route path="/authorities/new" element={<CadastroAutoridade />} />
                <Route path="/cadastro-apresentacao" element={<CadastroApresentacao />} /> 
                <Route path="/agendas" element={<Agendas />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <FooterMenu />
          </div>
        </Router>
      </AgendasProvider>
    </AutoridadesProvider>
  );
};

export default App;




