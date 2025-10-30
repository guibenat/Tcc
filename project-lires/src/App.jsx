import React from 'react';
// Importe o BrowserRouter corretamente
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// IMPORTA O PROVEDOR DE CONTEXTO
import { SettingsProvider } from './components/SettingsContext'; // <-- ADICIONADO


// Layouts
import SettingsLayout from './layouts/SettingsLayout'; // Layout para Configurações

// Páginas de Autenticação
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import EsqueceuSenha from './components/EsqueceuSenha';
import Inicial from './pages/Inicial';
import ComecarDoZero from './pages/ComecarDoZero';
import Finalizado1 from './components/Finalizado1';

// Páginas Principais (assumindo que todas estão em /pages)
import Home from './pages/Home';
import AlfabetoPage from './pages/AlfabetoPage';
import VideosPage from './pages/VideosPage';
import FeedPage from './components/FeedPage';
import LojaPage from './pages/LojaPage';
import UserPage from './pages/UserPage';
import PraticarPage from './pages/PraticarPage'; // Assumindo que você renomeou Praticar.jsx

// Páginas de Conteúdo das Configurações (assumindo que estão em /pages)
import GerenciamentoConta from './pages/GerenciamentoConta';
import ConfiguracoesPrivacidade from './pages/Configurações';
import Seguranca from './pages/Segurança';
import Encerramento from './pages/EncerramentoLires';
import Notificacoes from './pages/Notificacoes';
import Preferencias from './pages/Preferencias';
import Assinatura from './pages/Assinatura';

// --- Componente Principal App ---
function App() {
  return (

    // "Abraça" toda a aplicação com o Provedor de Configurações
    <SettingsProvider> 
      
      {/* Filtros SVG globais (movidos de Preferencias.jsx)
        Isso garante que os filtros de daltonismo estejam disponíveis
        em todas as páginas, pois o Contexto (que está acima) 
        vai aplicá-los na tag <html>.
      */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"/>
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"/>
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0"/>
          </filter>
        </defs>
      </svg>

      {/* O resto da sua aplicação (Router) fica AQUI DENTRO */}
      <BrowserRouter>
        <Routes>
          {/* Rotas de Autenticação */}
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
          <Route path="/inicial" element={<Inicial />} />
          <Route path="/comecar-do-zero" element={<ComecarDoZero />} />
          <Route path="/finalizado" element={<Finalizado1 />} />
          
          {/* Rotas Principais do App */}
          <Route path="/home" element={<Home />} />
          <Route path="/alfabeto" element={<AlfabetoPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/loja" element={<LojaPage />} />
          <Route path="/perfil" element={<UserPage />} />
          <Route path="/praticar" element={<PraticarPage />} />
          
          {/* Rotas de Configurações Aninhadas */}
          <Route path="/configuracoes" element={<SettingsLayout />}>
            <Route path="gerenciamento-de-conta" element={<GerenciamentoConta />} />
            <Route path="privacidade" element={<ConfiguracoesPrivacidade />} />
            <Route path="seguranca" element={<Seguranca />} />
            <Route path="encerramento" element={<Encerramento />} />
            <Route path="preferencias" element={<Preferencias />} />
            <Route path="notificacoes" element={<Notificacoes />} />
            <Route path="assinatura" element={<Assinatura />} />
            
            {/* Rota padrão para /configuracoes (mantida) */}
            <Route index element={<GerenciamentoConta />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider> // <-- FIM DO PROVEDOR
  );
}

export default App;