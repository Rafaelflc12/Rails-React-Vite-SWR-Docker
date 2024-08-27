import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from '../src/contexts/ApiContext';
import Produto from '../src/components/produtos/produtos';
import Home from '../src/components/home/HomePage';
import ProdutoDetalhes from './components/produtos/produtoDetalhes';

const App: React.FC = () => {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produto />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
};

export default App;