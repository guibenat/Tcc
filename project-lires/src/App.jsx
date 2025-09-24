import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Personagem from './pages/Personagem';
import Inicio from './pages/Inicio';
import Loja from './pages/Loja';
import Planos from './pages/Planos';
import Assinatura from './pages/Assinatura';
import Login from './pages/Login';
import Cadastre from './pages/cadastre';
import Segurança from './pages/Segurança';
import Configuracoes from './pages/GerenciamentoConta';
import ConfiguracoesGerenciamento from './pages/GerenciamentoConta';
import FeedLires from './pages/FeedLires';
import EncerramentoL from './pages/EncerramentoLires';
import ConfiguracoesNotificações from './pages/Notificação';



function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Cadastre />} />
          <Route path="/home" element={<Login />} />
          <Route path="/personagem" element={<Personagem />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/user" element={<User />} />
          <Route path='/loja' element={<Loja/>} />
          <Route path='/Assinatura' element={<Assinatura/>} />
          <Route path='/Planos' element={<Planos/>} />
          <Route path="/Cadastre" element={<Cadastre />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Segurança" element={<Segurança/>} />
          <Route path="/Notificação" element={<ConfiguracoesNotificações/>} />
          <Route path="/GerenciamentoConta" element={<ConfiguracoesGerenciamento />} />
          <Route path="/FeedLires" element={<FeedLires/>} />
          <Route path="/EncerramentoLires" element={<EncerramentoL />} />
          <Route path="/Configurações" element={<Configuracoes/>} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;