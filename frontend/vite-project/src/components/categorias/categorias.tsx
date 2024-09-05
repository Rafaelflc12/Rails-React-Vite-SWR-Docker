import React, { useState } from 'react';
import useSWR from 'swr';
import { Categoria } from '../../types/types';
import { fetcher } from '../../services/apiService';

const Categorias: React.FC = () => {
  const { data: categorias, error, mutate } = useSWR<Categoria[]>('/api/produto/categoria', fetcher);
  const [nome, setNome] = useState('');

  if (error) return <div>Erro ao carregar categorias.</div>;
  if (!categorias) return <div>Carregando...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaCategoria = { nome };

    try {
      const response = await fetch('/api/produto/categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaCategoria),
      });

      if (response.ok) {
        const categoriaAdicionada = await response.json();
        mutate([...categorias, categoriaAdicionada], false);
        setNome('');
        alert('Categoria adicionada com sucesso!');
      } else {
        alert('Erro ao adicionar a categoria!');
      }
    } catch (error) {
      console.error('Erro ao adicionar a categoria:', error);
      alert('Erro ao adicionar a categoria!');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/produto/categorias/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mutate(categorias.filter((categoria) => categoria.id !== id), false);
        alert('Categoria removida com sucesso!');
      } else {
        alert('Erro ao remover a categoria!');
      }
    } catch (error) {
      console.error('Erro ao remover a categoria:', error);
      alert('Erro ao remover a categoria!');
    }
  };

  return (
    <div>
      <h1>Categorias</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.nome}
            <button onClick={() => handleDelete(categoria.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <button type="submit">Adicionar Categoria</button>
      </form>
    </div>
  );
};

export default Categorias;