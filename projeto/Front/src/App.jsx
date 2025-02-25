import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./componentes/Login.jsx";
import Signup from "./componentes/Signup.jsx";
import Sobre from "./pages/sobre.jsx";
import Quality from "./pages/quality.jsx";
import Scorecad from "./pages/scorecad.jsx";
import FormularioList from './pages/FormularioList.jsx';
import ProtectedRoute from './componentes/ProtectedRoute.jsx';

function App() {
    return (
        <Router>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/formularios" element={<FormularioList />} />

                {/* Rotas protegidas */}
                <Route
                    path="/quality"
                    element={
                        <ProtectedRoute>
                            <Quality />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/scorecad"
                    element={
                        <ProtectedRoute>
                            <Scorecad />
                        </ProtectedRoute>
                    }
                />

                {/* Rota de login (pública) */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;