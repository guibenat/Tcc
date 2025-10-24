import React from 'react';
// Importe o BrowserRouter corretamente
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

// --- Componentes Placeholder ---
// Componentes temporários para as rotas que ainda não foram criadas
// Isso evita que o aplicativo quebre ao tentar importar arquivos inexistentes.
const Preferencias = () => (
    <div className="content-box anim-enter">
        <h1 className="text-purple-600 font-bold text-5xl">Preferências</h1>
        <p>Página em construção...</p>
    </div>
);

// --- Componente Principal App ---
function App() {
  return (
    // Removido o <div> desnecessário que quebrava o layout
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
            
            {/* Rota padrão para /configuracoes (ex: se o usuário clicar no menu de conta) */}
            {/* Vamos redirecionar para a primeira sub-página */}
            <Route index element={<GerenciamentoConta />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;