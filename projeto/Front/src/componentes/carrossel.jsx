import { useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import { GoGoal } from "react-icons/go";
import { RiSearchEyeLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io"; 
import { FaArrowTrendUp } from "react-icons/fa6";

const items = [
  { name: "Resultados são impactados pela falta de estratégias específicas", icon: <GoGoal className="text-5xl text-[#9E2AAF] mb-4" /> },
  { name: "Capacitação inadequada não resolve as falhas recorrentes", icon: <FaBookReader className="text-5xl text-[#4BB25A] mb-4" /> },
  { name: "A solução é personalizada para identificar e corrigir erros continuamente!", icon: <RiSearchEyeLine className="text-5xl text-blue-500 mb-4" /> },
  { name: "A falta de uma abordagem direcionada prejudica o crescimento", icon: <FaArrowTrendUp  className="text-5xl text-[#4BB25A] mb-4" /> },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 2;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Itens visíveis (somente dois itens por vez)
  const visibleItems = [
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
  ];

  return (
    <div className="w-full flex flex-col items-center p-6 rounded-lg mt-40">
      <h2 className="text-3xl mb-4">
        Erros repetidos impactam os <span className="text-3xl">resultados</span>
      </h2>
      <div className="relative mt-10 w-full max-w-6xl h-80 flex items-center justify-center gap-16 bg-white p-10 rounded-lg shadow-md">
        {/* Botão da esquerda */}
        <button
          className="absolute left-4 p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          onClick={prevSlide}
        >
          <FaChevronLeft className="text-2xl text-gray-600" />
        </button>

        {/* Itens do carrossel */}
        <div className="flex space-x-16 w-full max-w-4xl">
          {visibleItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center transition-all duration-500 w-1/2">
              {item.icon}
              <p className="text-2xl text-center break-words">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Botão da direita */}
        <button
          className="absolute right-4 p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          onClick={nextSlide}
        >
          <FaChevronRight className="text-2xl text-gray-600" />
        </button>
      </div>
    </div>
  );
}