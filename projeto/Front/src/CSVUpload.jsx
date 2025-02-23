import React, { useState } from 'react';
import { uploadCSV } from './api';  // Importe a função do serviço

const CSVUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                await uploadCSV(file);  // Faz a requisição POST com o arquivo
                alert('CSV enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar CSV:', error);
            }
        } else {
            alert('Selecione um arquivo CSV.');
        }
    };

    return (
        <div>
            <h1>Upload de CSV</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar CSV</button>
        </div>
    );
};

export default CSVUpload;