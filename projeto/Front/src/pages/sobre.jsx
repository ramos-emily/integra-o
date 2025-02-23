import React from "react";
import Footer from "../componentes/footer"; // Certifique-se de que o caminho está correto
import Header from "../componentes/header";
import foto_geral from "../componentes/imagens/foto_geral.jpeg";
import img_duda from "../componentes/imagens/duda.jpg";
import img_julia from "../componentes/imagens/julia.jpg";
import img_tamires from "../componentes/imagens/tamires.jpg";
import img_emily from "../componentes/imagens/emily.jpg";
import Carrossel from "../componentes/carrossel";
import img_larissa from "../componentes/imagens/Larissa.jpg";

export default function Home() {
  return (
    <>
      {/* Componente Header */}
      <Header />

      <div className="relative w-full h-90 overflow-hidden mt-20">
        {/* Texto sobre a imagem */}
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">
          Sobre Nós
        </h1>

        {/* Imagem ajustada */}
        <img src={foto_geral} className="w-full h-full object-cover object-top" alt="Foto Geral" />
      </div>

      <Carrossel />

      <div className="w-full flex flex-col items-center mt-40">
        <h2 className="text-4xl font-bold mb-10">EQUIPE</h2>
        <div className="w-full max-w-5xl flex flex-col gap-10 mr-70">
          <div className="flex items-center gap-4 justify-start">
            <img
              src={img_emily}
              alt="Imagem Emily Vitória"
              className="w-66 h-66 rounded-full object-cover"
            />
            <div>
              <h3 className="text-3xl font-bold">Emily Vitória</h3>
              <p className="text-gray-600">Desenvolvedor Backend</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <img
              src={img_julia}
              alt="Imagem Júlia Vitória"
              className="w-66 h-66 rounded-full object-cover"
            />
            <div>
              <h3 className="text-3xl font-bold">Júlia Vitória</h3>
              <p className="text-gray-600">Desenvolvedor Backend</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <img
              src={img_duda}
              alt="Imagem Maria Eduarda"
              className="w-66 h-66 rounded-full object-cover"
            />
            <div>
              <h3 className="text-3xl font-bold">Maria Eduarda</h3>
              <p className="text-gray-600">Desenvolvedor Frontend & UI/UX</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <img
              src={img_tamires}
              alt="Imagem Kelvin Lacerda"
              className="w-66 h-66 rounded-full object-cover"
            />
            <div>
              <h3 className="text-3xl font-bold">Kelvin Lacerda</h3>
              <p className="text-gray-600">Desenvolvedor Frontend</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <img
              src={img_tamires}
              alt="Imagem Tamires Oliveira"
              className="w-66 h-66 rounded-full object-cover"
            />
            <div>
              <h3 className="text-3xl font-bold">Tamires Oliveira</h3>
              <p className="text-gray-600">Desenvolvedor Frontend</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-start mb-30">
            <img
              src={img_larissa}
              alt="Imagem Larissa Santos"
              className="w-66 h-66 rounded-full object-cover"
            />
            <div>
              <h3 className="text-3xl font-bold">Larissa Santos</h3>
              <p className="text-gray-600">Responsável Documentação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Componente Footer */}
      <Footer />
    </>
  );
}