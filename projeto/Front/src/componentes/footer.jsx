import React from "react";
import img from "../componentes/imagens/Bosch-Supergraphic_Stripe_RGB.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gray border-t shadow-lg border-gray-300 text-sm text-gray-700 relative mt-[0px] ">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Texto à esquerda */}
        <div className="flex items-center gap-4">
          <span>© 2025 Robert Bosch GmbH</span>
          <span>
            Contato:{" "}
            <a href="mailto:ct67ca@bosch.com" className="underline">
              ct67ca@bosch.com
            </a>
          </span>
        </div>   

        {/* Texto à direita */}
        <div className="text-green-700 font-bold">
          <span className="text-lg">GS</span>
          <span className="text-xs">core | Bosch</span>
        </div>
      </div>

      {/* Imagem abaixo do conteúdo */}
      <img src={img} alt="imagem base" className="w-full mt-2" />
    </footer>
  );
}
