import React from 'react';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../services/apiService';
import { Produto } from '../../types/types';
import useSWR from 'swr';

const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: produto, error } = useSWR<Produto>(`/api/produto/produtos/${id}`, fetcher);

  if (error) return <div>Failed to load post</div>;
  if (!produto) return <div>Loading...</div>;

  return (
    <div>
      <h1>{produto?.nome}</h1>
      <p>{produto?.descricao}</p>
    </div>
  );
};

export default ProdutoDetalhes;