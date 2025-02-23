import React, { useEffect, useState } from 'react';

function FormulariosList() {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Faz a requisição para a API
        fetch('/api/formularios/')  // Use a URL completa se o proxy não estiver configurado
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar os formulários: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Verifica se os dados são um array antes de atualizar o estado
                if (Array.isArray(data)) {
                    setFormularios(data);  // Atualiza o estado com os dados recebidos
                } else {
                    throw new Error('Dados recebidos não são um array.');
                }
                setLoading(false);     // Indica que os dados foram carregados
            })
            .catch(error => {
                setError(error.message);  // Captura erros
                setLoading(false);
            });
    }, []);  // O array vazio [] garante que o useEffect só roda uma vez (ao montar o componente)

    if (loading) {
        return (
            <div className="loading">
                <p>Carregando formulários...</p>
                <div className="spinner"></div> {/* Adicione um spinner ou animação de carregamento */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <p>Erro ao carregar os formulários:</p>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Tentar novamente</button>
            </div>
        );
    }

    return (
        <div className="formularios-list">
            <h1>Formulários</h1>
            {formularios.length > 0 ? (
                <ul>
                    {formularios.map(formulario => (
                        <li key={formulario.id}>
                            <strong>{formulario.nome || 'Sem nome'}</strong>
                            <p>{formulario.descricao || 'Sem descrição'}</p> {/* Exibe mais detalhes, se disponível */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum formulário encontrado.</p>
            )}
        </div>
    );
}

export default FormulariosList;