import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Verifica se há um token no localStorage
    const token = localStorage.getItem('token');

    // Se não houver token, redireciona para a página de login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se houver token, renderiza o componente filho (página protegida)
    return children;
};

export default ProtectedRoute;