import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot em vez de ReactDOM
import App from './App';

// Criação da raiz usando createRoot
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement); // Cria a raiz
  // Renderização do componente
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}