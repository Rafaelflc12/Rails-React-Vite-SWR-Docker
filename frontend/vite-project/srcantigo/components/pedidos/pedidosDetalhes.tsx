import React from 'react';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../services/apiService';
import { Pedido } from '../../types/types';
import useSWR from 'swr';

const PedidoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pedido, error } = useSWR<Pedido>(`/api/estoque/pedidos/${id}`, fetcher);

  if (error) return <div>Failed to load post</div>;
  if (!pedido) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pedido?.status}</h1>
      <p>{pedido?.preco_total}</p>
    </div>
  );
};

export default PedidoDetalhes;