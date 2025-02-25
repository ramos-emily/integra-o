import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica se o token existe
    const location = useLocation();

    // Se não houver token, redireciona para login e guarda a página original
    if (!token) {
        console.log("Usuário não autenticado. Redirecionando para login...");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
