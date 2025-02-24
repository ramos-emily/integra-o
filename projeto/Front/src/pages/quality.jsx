import React, { useState } from 'react';
import img from "../componentes/imagens/Bosch-Supergraphic_Stripe_RGB.png";
import Footer from "../componentes/footer";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../componentes/header";

export default function Quality() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        number: '',
        created: '',
        country_of_request: '',
        assignment_group: '',
        assigned_to: '',
        state: '',
        channel: '',
        additional_comments: '',
        format: [],
        checks_and_handling: [],
        taxonomy: []
    });

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/formulario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Resposta do backend:', data);
                alert('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => {
            const updatedList = checked
                ? [...prevState[name], e.target.value]
                : prevState[name].filter(item => item !== e.target.value);
            return {
                ...prevState,
                [name]: updatedList
            };
        });
    };

    return (
        <>
            <Header />
            <div className="mt-40 px-10 pb-20 mx-auto max-w-4xl text-center">
                <h1 className="mb-10">Quality Check</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md w-full">
                    <div className="grid grid-cols-1 gap-4">
                        <input type="text" name="number" placeholder="Number" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                        <input type="text" name="created" placeholder="Created" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                        <input type="text" name="country_of_request" placeholder="Country of request" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                        <input type="text" name="assignment_group" placeholder="Assignment group" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                        <input type="text" name="assigned_to" placeholder="Assigned to" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                        <input type="text" name="state" placeholder="State" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                        <input type="text" name="channel" placeholder="Channel" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange} />
                    </div>
                    <textarea name="additional_comments" placeholder="Additional comments" className="w-full border border-gray-300 p-2 rounded mt-4 mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" onChange={handleChange}></textarea>

                    <div className="mt-4 flex space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-44 h-11 rounded-xs cursor-pointer bg-[#C088C9] shadow-xl text-white py-2 hover:bg-[#D6B3DC]"
                        >
                            Previous Record
                        </button>

                        <button
                            type="button"
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
                                <input type="checkbox" name="format" value={item} onChange={handleCheckboxChange} className="w-4 h-4" />
                                <span>Format-{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-15 p-4 shadow-lg rounded-md">
                    <h3 className="text-xl">Checks and Handling / Knowledge Base</h3>
                    <hr className="my-2 border-gray-600 w-90 mx-auto" />
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="checks_and_handling" value="Complete Checks / Replies" onChange={handleCheckboxChange} className="w-4 h-4" />
                        <span>Complete Checks / Replies</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="checks_and_handling" value="Follow-up / Documentation" onChange={handleCheckboxChange} className="w-4 h-4" />
                        <span>Follow-up / Documentation</span>
                    </label>
                </div>

                <div className="mt-15 p-4 shadow-lg rounded-md">
                    <h3 className="text-xl">Taxonomy</h3>
                    <hr className="my-2 border-gray-600 w-25 mx-auto" />
                    <div className="grid grid-cols-2 gap-2">
                        {['Resolution code', 'Resolution field', 'Main Category', 'SubCategory', 'Template Used', 'Additional Agents'].map((item, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input type="checkbox" name="taxonomy" value={item} onChange={handleCheckboxChange} className="w-4 h-4" />
                                <span>Taxonomy_{item.replace(' ', '_')}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}