import React from 'react';
import { FaSearch, FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import img from "../componentes/imagens/Bosch-Supergraphic_Stripe_RGB.png";
import { Link } from 'react-router-dom';
import Footer from '../componentes/footer'; 
import Header from "../componentes/header";

export default function Scorecad() {
    return (
        <>
           <Header />

            {/* Espaço para não ficar atrás do header fixo */}
            <div className="mt-24 flex flex-col items-center min-h-screen">
                {/* Quadrado Centralizado */}
                <div className="w-96 h-60 bg-gray-300 flex items-center justify-center mt-16">
                    <span className="text-black text-xl font-bold">GRÁFICOS</span>
                </div>

                {/* Adiciona um espaço extra para o footer não sobrepor conteúdo */}
                <div className="flex-grow"></div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}