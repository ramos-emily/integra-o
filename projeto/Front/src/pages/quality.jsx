import React, { useState } from 'react';
import img from "../componentes/imagens/Bosch-Supergraphic_Stripe_RGB.png";
import Footer from "../componentes/footer";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../componentes/header";
import axios from 'axios';

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
    const [number, setNumber] = useState('')
    const [created, setCreated] = useState('')
    const [country_of_request, setCountry_of_request] = useState('')
    const [assignment_group, setAssignment_group] = useState('')
    const [assigned_to, setAssigned_to] = useState('')
    const [state, setState] = useState('')
    const [channel, setChannel] = useState('')
    const [additional_comments, setAdditional_comments] = useState('')
    const [,] = useState('')
    const [,] = useState('')
    const token = localStorage.getItem('token')

    
//VER AQUIIIIII!!!!!!!!

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/api/quality-form/', 
            {
                number: number,
                created: created,
                country_of_request: country_of_request,
                assignment_group: assignment_group,
                assigned_to: assigned_to,
                state: state,
                channel: channel,
                additional_comments: additional_comments,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Resposta do backend:', data);
                alert('Formulário enviado com sucesso!');
            } else {
                const errorData = await response.json();
                console.error('Erro ao enviar dados:', errorData.message);
                alert('Erro ao enviar formulário: ' + errorData.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na requisição: ' + error.message);
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
        const { name, checked, value } = e.target;
        setFormData(prevState => {
            const updatedList = checked
                ? [...prevState[name], value]
                : prevState[name].filter(item => item !== value);
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
                        <input type="text" name="number" placeholder="Number" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" value={number} onChange={(e)=>setNumber(e.target.value)} />
                        <input type="text" name="created" placeholder="Created" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" value={created} onChange={(e)=>setCreated(e.target.value)} />
                        <input type="text" name="country_of_request" placeholder="Country of request" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" value={country_of_request} onChange={(e)=>setCountry_of_request(e.target.value)}  />
                        <input type="text" name="assignment_group" placeholder="Assignment group" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" value={assignment_group} onChange={(e)=>setAssignment_group(e.target.value)}  />
                        <input type="text" name="assigned_to" placeholder="Assigned to" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none"value={assigned_to} onChange={(e)=>setAssigned_to(e.target.value)}  />
                        <input type="text" name="state" placeholder="State" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" value={state} onChange={(e)=>setState(e.target.value)} />
                        <input type="text" name="channel" placeholder="Channel" className="border border-gray-300 p-2 rounded mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none" value={channel} onChange={(e)=>setChannel(e.target.value)} />
                    </div>
                    <textarea name="additional_comments" placeholder="Additional comments" className="w-full border border-gray-300 p-2 rounded mt-4 mb-4 hover:border-gray-600 focus:border-gray-600 focus:outline-none"  value={additional_comments} onChange={(e)=>setAdditional_comments(e.target.value)} />

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