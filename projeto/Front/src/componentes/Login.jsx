import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../componentes/imagens/logo.png";
import axios from "axios";

export default function Login() {
    const [edv, setEdv] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const logar = async () => {
        console.log("User: ", edv);
        console.log("Pass: ", password);
    
        try {
            // Verifique se a URL está correta para a autenticação JWT
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: edv,  // username (EDV)
                password: password // senha
            });
    
            // Salva o token no localStorage
            localStorage.setItem('token', response.data.access);
            console.log("Token salvo no localStorage:", response.data.access);
    
            // Redireciona para a página que o usuário tentou acessar originalmente ou para a Home
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            console.log("Erro ao fazer login:", error.response || error);
            alert("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md shadow-xl relative">
                <div className="absolute top-0 right-0 w-1/2 h-0.5 bg-[#9E2AAF] rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#4BB25A] rounded-bl-lg"></div>
                <div className="flex flex-col items-center mb-4">
                    <div className="w-full text-center">
                        <img src={logo} alt="Logo" className="w-30 inline-block ml-2" />
                    </div>
                </div>
                <h2 className="text-2xl font-medium mb-6 text-center">LOGIN</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1">EDV</label>
                    <input
                        type="text"
                        className="w-full px-2 py-1 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                        onChange={(event) => setEdv(event.target.value)}
                        value={edv}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-1">SENHA</label>
                    <input
                        type="password"
                        className="w-full px-2 py-1 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-44 h-11 rounded-sm cursor-pointer bg-[#C088C9] shadow-xl text-white font-bold py-2 hover:bg-[#D6B3DC]"
                    >
                        VOLTAR
                    </button>
                    <button
                        type="button"
                        className="w-44 rounded-sm h-11 cursor-pointer bg-[#4BB25A] shadow-xl text-white font-bold py-2 hover:bg-[#86C28F]"
                        onClick={logar} // Chama a função logar
                    >
                        ENTRAR
                    </button>
                </div>
            </div>
        </div>
    );
}
