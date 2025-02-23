import React from 'react';
import img from "../componentes/imagens/Bosch-Supergraphic_Stripe_RGB.png";
import Footer from "../componentes/footer";
import { Link } from 'react-router-dom';
import Header from "../componentes/header";

export default function Quality() {
    return (
        <>
            <Header />
            {/* Conteúdo da Página */}
            <div className="mt-40 px-10 pb-20 mx-auto max-w-4xl text-center">
                <h1 className="mb-10">Quality Check</h1>
                <form className="bg-white p-6 shadow-md rounded-md w-full">
                    <div className="grid grid-cols-1 gap-4">
                        <input type="text" placeholder="Number" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                        <input type="text" placeholder="Created" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                        <input type="text" placeholder="Country of request" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                        <input type="text" placeholder="Assignment group" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                        <input type="text" placeholder="Assigned to" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                        <input type="text" placeholder="State" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                        <input type="text" placeholder="Channel" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" />
                    </div>
                    <textarea placeholder="Additional comments" className="w-full border border-gray-300 p-2 rounded mt-4 mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none"></textarea>


                    <div className="mt-4 flex space-x-2">
                        <button
                            type="submit"
                            onClick={() => navigate("/")}
                            className="w-44 h-11 rounded-xs cursor-pointer bg-[#C088C9] shadow-xl text-white py-2 hover:bg-[#D6B3DC]"
                        >
                            Previous Record
                        </button>

                        <button
                            type="submit"
                            onClick={() => navigate("/")}
                            className="w-44 rounded-xs h-11 cursor-pointer bg-[#4BB25A] shadow-xl text-white py-2 hover:bg-[#86C28F]"
                        >
                            Back to Date Range
                        </button>
                    </div>
                </form>

                {/* Seções de checkboxes */}
                <div className="mt-15 p-4 shadow-lg rounded-md">
                    <h3 className="text-xl">Format</h3>
                    <hr className="my-2 border-gray-600 w-25 mx-auto" />
                    <div className="grid grid-cols-3 gap-2">
                        {['Salutation', 'Punctuation', 'Attachments', 'Format of Reply', 'Spacing', 'Grammar', 'N/A'].map((item, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                   <input type="checkbox" className="w-4 h-4" />
                                <span>Format-{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-15 p-4 shadow-lg rounded-md">
                    <h3 className="text-xl">Checks and Handling / Knowledge Base</h3>
                    <hr className="my-2 border-gray-600 w-90 mx-auto" />
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Complete Checks / Replies</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Follow-up / Documentation</span>
                    </label>
                </div>

                <div className="mt-15 p-4 shadow-lg rounded-md">
                    <h3 className="text-xl">Taxonomy</h3>
                    <hr className="my-2 border-gray-600 w-25 mx-auto" />
                    <div className="grid grid-cols-2 gap-2">
                        {['Resolution code', 'Resolution field', 'Main Category', 'SubCategory', 'Template Used', 'Additional Agents'].map((item, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                   <input type="checkbox" className="w-4 h-4" />
                                <span>Taxonomy_{item.replace(' ', '_')}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer fixo no final */}
            <Footer />
        </>
    );
}
