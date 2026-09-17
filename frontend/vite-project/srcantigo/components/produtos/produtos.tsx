import React, { useState } from 'react';
import useSWR from 'swr';
import { Produto } from '../../types/types';
import { fetcher } from '../../services/apiService';


const Produtos: React.FC = () => {
  const { data: produtos, error, mutate } = useSWR<Produto[]>('/api/produto/produtos', fetcher);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [produto_categoria_id, setCategoriaId] = useState('');

  if (error) return <div>Erro ao carregar produtos.</div>;
  if (!produtos) return <div>Carregando...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoProduto = { produto_produto:{nome, preco: parseFloat(preco), estoque: parseFloat(estoque), produto_categoria_id: parseInt(produto_categoria_id)} };

    try {
      const response = await fetch('/api/produto/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
      });

      if (response.ok) {
        const produtoAdicionado = await response.json();
        mutate([...produtos, produtoAdicionado], false);  // Atualiza a lista sem revalidar
        setNome('');
        setPreco('');
        setEstoque('');
        setCategoriaId('');
        alert('Produto adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar o produto!');
      }
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
      alert('Erro ao adicionar o produto!');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/produto/produtos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mutate(produtos.filter((produto) => produto.id !== id), false);  // Remove o produto localmente
        alert('Produto removido com sucesso!');
      } else {
        alert('Erro ao remover o produto!');
      }
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
      alert('Erro ao remover o produto!');
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
            <button onClick={() => handleDelete(produto.id)}>Excluir</button>
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
        <label>
          Preço:
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </label>
        <label>
          Estoque:
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            required
          />
        </label>
        <label>
          Categoria ID:
          <input
            type="number"
            value={produto_categoria_id}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default Produtos;