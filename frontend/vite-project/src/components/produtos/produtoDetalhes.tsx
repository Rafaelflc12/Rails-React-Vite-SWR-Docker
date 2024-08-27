import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProduto } from '../../services/apiService';

const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: produto, error } = useFetchProduto(id!);

  if (error) return <div>Failed to load post</div>;
  if (!produto) return <div>Loading...</div>;

  return (
    <div>
      <h1>{produto.nome}</h1>
      <p>{produto.descricao}</p>
    </div>
  );
};

export default ProdutoDetalhes;