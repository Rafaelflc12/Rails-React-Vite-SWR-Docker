import React from 'react';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../services/apiService';
import { Categoria } from '../../types/types';
import useSWR from 'swr';

const CategoriaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: categoria, error } = useSWR<Categoria>(`/api/produto/categoria/${id}`, fetcher);

  if (error) return <div>Failed to load post</div>;
  if (!categoria) return <div>Loading...</div>;

  return (
    <div>
      <h1>{categoria.nome}</h1>
    </div>
  );
};

export default CategoriaDetalhes;