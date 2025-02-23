import React from "react";

const Jogo = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-900">
            <iframe
                src="/jogo/index.html"
                title="Meu Jogo"
                className="w-full h-full border-none"
            ></iframe>
        </div>
    );
};

export default Jogo;