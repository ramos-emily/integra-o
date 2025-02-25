import React from "react";
import Footer from "../componentes/footer";
import Header from "../componentes/header";

export default function Home() {
  return (


    
    <>
      {/* Componente Header */}
      <Header />

      {/* Conteúdo Principal */}
      <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-4">
        {/* Espaço para o Texto ou Outro Conteúdo */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Bem-vindo ao Meu Site!</h1>
          {/* Título "Ranking" */}
          <h1 className="text-3xl font-bold text-green-700">Ranking</h1>
        </div>
        
        {/* Container do Jogo */}
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            src="/jogo/index.html"
            title="Meu Jogo"
            className="w-full h-[60vh] border-none"
          ></iframe>
        </div>
      </div>

      {/* Componente Footer */}
      <Footer />
    </>
  );
}