import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from '../src/components/produtos/produtos';
import Pedido from '../src/components/pedidos/pedidos';
import Categoria from '../src/components/categorias/categorias';
import Home from '../src/components/home/HomePage';
import ProdutoDetalhes from './components/produtos/produtoDetalhes';
import PedidoDetalhes from './components/pedidos/pedidosDetalhes';
import Header from './components/Header'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
        <main className="flex-1">
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
        </main>
      <Footer />
    </div>
  );
};

export default App;