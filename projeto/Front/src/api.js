import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/',
});



// Funções para consumir a API
export const getFormularios = () => api.get('formularios/');
export const createFormulario = (formulario) => api.post('formularios/', formulario);
export const getChecklistItens = () => api.get('checklist-itens/');
export const uploadCSV = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('csv-files/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default api;