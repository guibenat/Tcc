import React from 'react';
// Importe o BrowserRouter corretamente
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// IMPORTA O PROVEDOR DE CONTEXTO
import { SettingsProvider } from './components/SettingsContext'; // <-- Caminho corrigido
import ActivityPlayer from './pages/ActivityPlayer';


// Layouts
import SettingsLayout from './layouts/SettingsLayout'; // <-- Caminho corrigido

// Páginas de Autenticação
import Inicio from './pages/Inicio'; // <-- Caminho corrigido
import Cadastro from './pages/Cadastro'; // <-- Caminho corrigido
import Login from './pages/Login'; // <-- Caminho corrigido
import EsqueceuSenha from './components/EsqueceuSenha'; // <-- Caminho corrigido
import Inicial from './pages/Inicial'; // <-- Caminho corrigido
// import ComecarDoZero from './pages/ComecarDoZero'; // <-- REMOVIDO
import Finalizado1 from './components/finalizado1'; // <-- Caminho corrigido

// Páginas Principais (assumindo que todas estão em /pages)
import Home from './pages/Home'; // <-- Caminho corrigido
import AlfabetoPage from './pages/AlfabetoPage'; // <-- Caminho corrigido
import VideosPage from './pages/VideosPage'; // <-- Caminho corrigido
import FeedPage from './pages/FeedPage'; // <-- Caminho corrigido
import LojaPage from './pages/LojaPage'; // <-- Caminho corrigido
import UserPage from './pages/UserPage'; // <-- Caminho corrigido
import PraticarPage from './pages/PraticarPage'; // <-- Caminho corrigido// <-- ADICIONADO e caminho corrigido

// Páginas de Conteúdo das Configurações (assumindo que estão em /pages)
import GerenciamentoConta from './pages/GerenciamentoConta'; // <-- Caminho corrigido
import ConfiguracoesPrivacidade from './pages/Configurações'; // <-- Caminho corrigido
import Seguranca from './pages/Segurança'; // <-- Caminho corrigido
import Encerramento from './pages/EncerramentoLires'; // <-- Caminho corrigido
import Notificacoes from './pages/Notificacoes'; // <-- Caminho corrigido
import Preferencias from './pages/Preferencias'; // <-- Caminho corrigido
import Assinatura from './pages/Assinatura'; // <-- Caminho corrigido

// --- Componente Principal App ---
function App() {
  return (

    // "Abraça" toda a aplicação com o Provedor de Configurações
    <SettingsProvider> 
      
      {/* Filtros SVG globais (movidos de Preferencias.jsx) */}
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
          
          {/* --- MUDANÇA PRINCIPAL AQUI --- */}
          {/* Rota de lição: agora aceita um parâmetro (ex: "comecar-do-zero") */}
          <Route path="/lesson/:lessonId" element={<ActivityPlayer />} />
          
          {/* Rotas antigas removidas (elas eram redundantes ou erradas) */}
          {/* <Route path="/comecar-do-zero" element={<ActivityPlayer />} /> <-- REMOVIDA */}
          {/* <Route path="/activity" element={<ActivityPlayer />} /> <-- REMOVIDA */}
          
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