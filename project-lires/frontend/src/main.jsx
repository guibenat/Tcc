import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx'; 
// Importo o arquivo de estilos globais (inclui o Tailwind e as animações base)
import './style/index.css'; 

/**
 * Ponto de entrada principal do aplicativo.
 * Usa o método 'createRoot' do React 18 para montar a aplicação no DOM
 * (no elemento com id='root').
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode: Ajuda a identificar possíveis problemas no código durante o desenvolvimento.
  <React.StrictMode>
    {/* O App é o componente raiz que contém o roteamento e o contexto global. */}
    <App />
  </React.StrictMode>,
);