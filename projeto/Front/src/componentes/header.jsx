import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import img from "../componentes/imagens/Bosch-Supergraphic_Stripe_RGB.png";
import logo from "../componentes/imagens/logo.png";

export default function Header() {
    const navigate = useNavigate(); // Hook para navegação
    // Função para verificar se o usuário é um administrador
    const isAdmin = () => {
        // Exemplo de como verificar se o usuário está autenticado e é administrador
        // Você pode substituir isso por uma verificação real com base no que estiver usando (localStorage, context API, etc.)
        const userRole = localStorage.getItem("userRole");  // Aqui, você pode salvar o papel do usuário no localStorage ou contexto
        return userRole === 'admin'; // Retorne true se o usuário for admin
    };

    // Função para navegação para a página "Quality Check" com verificação de permissão
    const handleNavigateToQualityCheck = () => {
        if (isAdmin()) {
            navigate("/quality"); // Se for admin, vai para "Quality Check"
        } else {
            navigate("/login"); // Caso contrário, redireciona para a página de login
        }
    };

    return (
        <header className="w-full borde-b shadow-sm fixed top-0 left-0 bg-white z-50">
            {/* Barra colorida superior */}
            <img src={img} alt="imagem topo" />

            {/* Conteúdo da header */}
            <div className="flex items-center justify-between px-10 py-4">
                {/* Logo */}
                <div className="text-green-700 font-bold text-3xl cursor-pointer" onClick={() => navigate("/")}>
                    GS<span className="text-gray-500 font-normal">core | </span>
                    <img src={logo} className="w-20 inline-block ml-2" />
                </div>


                {/* Menu */}
                <ul className="flex space-x-8 text-black font-medium">
                    <li className="relative group cursor-pointer" onClick={() => navigate("/quality")}>
                        <span className="hover:text-blue-600">QUALITY CHECK</span>
                        <div className="w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="relative group cursor-pointer" onClick={() => navigate("/scorecad")}>
                        <span className="hover:text-purple-600">SCORECAD</span>
                        <div className="w-full h-1 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="relative group cursor-pointer" onClick={() => navigate("/sobre")}>
                        <span className="hover:text-green-600">SOBRE NÓS</span>
                        <div className="w-full h-1 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="relative group cursor-pointer" onClick={() => navigate("/Signup")}>
                        <span className="hover:text-blue-600">CADASTRO</span>
                        <div className="w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                </ul>
            </div>
        </header>
    );
}