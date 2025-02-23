import React from "react";
import Footer from "../componentes/footer"; 
import Header from "../componentes/header";

export default function Home() {
  return (
    <>
      {/* Componente Header */}
      <Header />

      <div className="h-screen w-screen m-auto flex flex-col items-center bg-gray-100">
        <h1 className="text-3xl font-bold text-green-700 absolute top-2/9">
          Ranking
        </h1>
      </div>

      <div className="h-screen w-screen m-auto flex flex-col items-center bg-gray-100">
        <h1 className="text-3xl font-bold text-green-700 absolute top-2/2">
          Gráfico
        </h1>
      </div>

      {/* Componente Footer */}
      <Footer />
    </>
  );
}
