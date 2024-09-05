import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Gerenciamento</h1>
      <nav>
        <ul>
          <li>
            <Link to="/produtos">
              <button>Gerenciar Produtos</button>
            </Link>
          </li>
          <li>
            <Link to="/categorias">
              <button>Gerenciar Categorias</button>
            </Link>
          </li>
          <li>
            <Link to="/pedidos">
              <button>Gerenciar Pedidos</button>
            </Link>
          </li>
          <li>
            <Link to="/pedidoitens">
              <button>Gerenciar Itens de Pedidos</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
