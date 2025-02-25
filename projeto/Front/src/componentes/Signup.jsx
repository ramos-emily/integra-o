import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import img from "../componentes/imagens/bosch_logo.png"; // Importe a imagem aqui
import logo from "../componentes/imagens/logo.png";
import axios from "axios";

export default function Signup() {
    const [edv, setEdv] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const cadastrar = async () => {
      console.log("EDV: ", edv);
      console.log("Senha: ", password);
  
      try {
          // Envia os dados para o back-end
          const response = await axios.post('http://127.0.0.1:8000/signup/', {
              username: edv,
              password: password
          });
  
          if (response.status === 200 || response.status === 201) {
              console.log("Resposta do backend:", response.data);
              alert('Usuário cadastrado com sucesso!');
              navigate('/'); // Redireciona para a Home após o cadastro
          } else {
              console.error('Erro ao cadastrar usuário:', response.data);
              alert('Erro ao cadastrar usuário: ' + response.data.message);
          }
      } catch (error) {
          console.error('Erro na requisição:', error);
          alert('Erro na requisição: ' + error.message);
      }
  };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            {/* Card de Cadastro centralizado com bordas coloridas em lados opostos */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md shadow-xl relative">
                {/* Linha verde no topo até a metade, alinhada à direita */}
                <div className="absolute top-0 right-0 w-1/2 h-0.5 bg-[#9E2AAF] rounded-tr-lg"></div>

                {/* Linha azul na parte inferior até a metade, alinhada à esquerda */}
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#4BB25A] rounded-bl-lg"></div>

                {/* Logo e nome da Bosch centralizados */}
                <div className="flex flex-col items-center mb-4">
                    <div className="w-full text-center">
                        <img src={logo} alt="Logo" className="w-30 inline-block ml-2" />
                    </div>
                </div>

                <h2 className="text-2xl font-medium mb-6 text-center">CADASTRO</h2>

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
                        type="button"  // Botão de voltar não deve ser do tipo "submit"
                        onClick={() => navigate('/login')}  // Redireciona para a página de login
                        className="w-44 h-11 rounded-sm cursor-pointer bg-[#C088C9] shadow-xl text-white font-bold py-2 hover:bg-[#D6B3DC]"
                    >
                        VOLTAR
                    </button>

                    <button
                        type="submit"  // Botão de cadastro deve ser do tipo "submit"
                        className="w-44 rounded-sm h-11 cursor-pointer bg-[#4BB25A] shadow-xl text-white font-bold py-2 hover:bg-[#86C28F]"
                        onClick={cadastrar}
                    >
                        CADASTRAR
                    </button>
                </div>
            </div>
        </div>
    );
}