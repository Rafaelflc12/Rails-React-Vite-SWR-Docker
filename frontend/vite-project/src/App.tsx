import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from '../src/components/produtos/produtos';
import Pedido from '../src/components/pedidos/pedidos';
import Categoria from '../src/components/categorias/categorias';
import Home from '../src/components/home/HomePage';
import ProdutoDetalhes from './components/produtos/produtoDetalhes';
import PedidoDetalhes from './components/pedidos/pedidosDetalhes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produto />} />
      <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
      <Route path="/categorias" element={<Categoria />} />
      <Route path="/pedidos" element={<Pedido />} /> */
      <Route path="/pedidos/:id" element={<PedidoDetalhes />} /> 
      </Routes>
    </Router>
  );
};

export default App;