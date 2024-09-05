import React, { useState } from 'react';
import useSWR from 'swr';
import { Pedido } from '../../types/types';
import { fetcher } from '../../services/apiService';


const Pedidos: React.FC = () => {
  const { data: pedidos, error, mutate } = useSWR<Pedido[]>('/api/estoque/pedidos', fetcher);
  const [status, setStatus] = useState('');
  const [preco_total, setPrecoTotal] = useState('');
  const [base_usuarios_id, setBaseUsuariosId] = useState('');

  if (error) return <div>Erro ao carregar produtos.</div>;
  if (!pedidos) return <div>Carregando...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoPedido = { estoque_pedido:{status, preco_total: parseFloat(preco_total), base_usuarios_id: parseFloat(base_usuarios_id)} };

    try {
      const response = await fetch('/api/estoque/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPedido),
      });

      if (response.ok) {
        const pedidoAdicionado = await response.json();
        mutate([...pedidos, pedidoAdicionado], false);  // Atualiza a lista sem revalidar
        setStatus('');
        setPrecoTotal('');
        setBaseUsuariosId('');
        alert('Pedido adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar o pedido!');
      }
    } catch (error) {
      console.error('Erro ao adicionar o pedido:', error);
      alert('Erro ao adicionar o pedido!');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/estoque/pedidos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mutate(pedidos.filter((pedido) => pedido.id !== id), false);  // Remove o produto localmente
        alert('Pedido removido com sucesso!');
      } else {
        alert('Erro ao remover o pedido!');
      }
    } catch (error) {
      console.error('Erro ao remover o pedido:', error);
      alert('Erro ao remover o pedido!');
    }
  };

  return (
    <div>
      <h1> Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            {pedido.status} - R$ {pedido.preco_total}
            <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            value={preco_total}
            onChange={(e) => setPrecoTotal(e.target.value)}
            required
          />
        </label>
        
        <label>
          Usuário:
          <input
            type="number"
            value={base_usuarios_id}
            onChange={(e) => setBaseUsuariosId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Adicionar Pedido</button>
      </form>
    </div>
  );
};

export default Pedidos;