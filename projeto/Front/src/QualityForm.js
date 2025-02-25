import React, { useState, useEffect } from 'react';
import { createFormulario, getChecklistItens } from './api';  // Importe as funções do serviço

const QualityForm = () => {
    const [formulario, setFormulario] = useState({
        nome: '',
        checklist: [],
    });

    const [checklistItens, setChecklistItens] = useState([]);

    useEffect(() => {
        // Buscar os itens do checklist ao carregar a página
        getChecklistItens().then(response => {
            setChecklistItens(response);
        }).catch(error => console.error("Erro ao buscar checklist:", error));
    }, []);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleChecklistChange = (e, itemId) => {
        setFormulario(prevFormulario => {
            const updatedChecklist = prevFormulario.checklist.includes(itemId)
                ? prevFormulario.checklist.filter(id => id !== itemId) // Remove se já estiver marcado
                : [...prevFormulario.checklist, itemId]; // Adiciona se não estiver marcado

            return { ...prevFormulario, checklist: updatedChecklist };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createFormulario(formulario); // Envia o formulário
            console.log("Formulário criado com sucesso:", response);
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nome"
                value={formulario.nome}
                onChange={handleChange}
                placeholder="Nome do Formulário"
                required
            />

            <h3>Checklist</h3>
            {checklistItens.map((item) => (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        checked={formulario.checklist.includes(item.id)}
                        onChange={(e) => handleChecklistChange(e, item.id)}
                    />
                    <label>{item.descricao}</label>
                </div>
            ))}

            <button type="submit">Enviar</button>
        </form>
    );
};

export default QualityForm;
