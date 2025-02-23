import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Sobre from "./pages/sobre";
import Quality from "./pages/quality";
import Scorecad from "./pages/scorecad";
import FormularioList from './pages/FormularioList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/scorecad" element={<Scorecad />} />
                <Route path="/quality" element={<Quality />} />
                <Route path="/formularios" element={<FormularioList />} />
            </Routes>
        </Router>
    );
}

export default App;

