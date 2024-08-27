import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';

const Produtos: React.FC = () => {
  const { produtos, loading } = useApi();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos?.map(produto => (
          <li key={produto.id}>
            <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;