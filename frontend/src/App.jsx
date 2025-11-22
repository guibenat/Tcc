import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './components/SettingsContext';
import ActivityPlayer from './pages/ActivityPlayer';

// Layouts
import SettingsLayout from './layouts/SettingsLayout';

// Páginas de Autenticação
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import EsqueceuSenha from './components/EsqueceuSenha';
import Inicial from './pages/Inicial';
import Finalizado1 from './components/finalizado1'; 

// Páginas Principais
import Home from './pages/Home';
import AlfabetoPage from './pages/AlfabetoPage';
import VideosPage from './pages/VideosPage';
import FeedPage from './pages/FeedPage';
import LojaPage from './pages/LojaPage';
import UserPage from './pages/UserPage'; 
import PraticarPage from './pages/PraticarPage';

// Páginas de Configurações
import GerenciamentoConta from './pages/GerenciamentoConta'; 
import ConfiguracoesPrivacidade from './pages/Configurações';
import Seguranca from './pages/Segurança';
import Encerramento from './pages/EncerramentoLires';
import Notificacoes from './pages/Notificacoes'; 
import Preferencias from './pages/Preferencias';
import Assinatura from './pages/Assinatura';

function App() {
  return (
    <SettingsProvider> 
      
      {/* Filtros SVG globais (daltonismo) */}
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

      <BrowserRouter>
        <Routes>
          {/* Rotas de Autenticação */}
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
          <Route path="/inicial" element={<Inicial />} />
          
          <Route path="/lesson/:lessonId" element={<ActivityPlayer />} />
          <Route path="/finalizado" element={<Finalizado1 />} />
          
          {/* Rotas Principais do App */}
          <Route path="/home" element={<Home />} />
          <Route path="/alfabeto" element={<AlfabetoPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/loja" element={<LojaPage />} />
          <Route path="/praticar" element={<PraticarPage />} />

          {/* Rotas de Perfil */}
          <Route path="/perfil" element={<UserPage />} />
          <Route path="/usuario/:username" element={<UserPage />} /> 
          

          {/* Rotas de Configurações Aninhadas */}
          <Route path="/configuracoes" element={<SettingsLayout />}>
            <Route index element={<GerenciamentoConta />} /> 
            <Route path="gerenciamento-de-conta" element={<GerenciamentoConta />} />
            <Route path="privacidade" element={<ConfiguracoesPrivacidade />} />
            <Route path="seguranca" element={<Seguranca />} />
            <Route path="encerramento" element={<Encerramento />} />
            <Route path="preferencias" element={<Preferencias />} />
            <Route path="notificacoes" element={<Notificacoes />} />
            <Route path="assinatura" element={<Assinatura />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;