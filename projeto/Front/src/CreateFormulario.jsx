import React, { useState } from 'react';
import { createFormulario } from './api';  // Importe a função do serviço

const CreateFormulario = () => {
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createFormulario({ nome });  // Faz a requisição POST
            alert('Formulário criado com sucesso!');
            setNome('');
        } catch (error) {
            console.error('Erro ao criar formulário:', error);
        }
    };

    return (
        <div>
            <h1>Criar Formulário</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Formulário"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default CreateFormulario;