import axios from 'axios';

// Função para enviar o formulário com o token JWT
const createFormulario = async (formularioData) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error("Token não encontrado. O usuário precisa estar logado.");
        }

        const response = await axios.post(
            'http://127.0.0.1:8000/api/formulario/', 
            formularioData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("Formulário criado com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar o formulário:", error.response || error);
        throw error;
    }
};

// Função para obter os itens de checklist
const getChecklistItens = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/checklistitens/');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar checklist:", error);
        throw error;
    }
};

export { createFormulario, getChecklistItens };
