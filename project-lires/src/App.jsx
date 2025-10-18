import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Personagem from './pages/Personagem';
import Inicio from './pages/Inicio';
import Loja from './pages/Loja';
import Praticar from './pages/Praticar';
import FeedLires from './components/FeedLires';
import EncerramentoL from './components/EncerramentoLires';
import Configuracoes from './pages/Configurações';
import Notificação from './pages/Notificação';
import Segurança from './pages/Segurança';
import Login from './pages/Login';
import Inicial2 from './components/Inicial2';
import Inicial3 from './components/Inicial3';
import Inicial4 from './components/Inicial4';
import Inicial5 from './components/Inicial5';
import Inicial from './pages/Inicial';
import ComecarZero1 from './components/ComecarZero1';
import ComecarZero2 from './components/ComecarZero2';
import ComecarZero3 from './components/ComecarZero3';
import ComecarZero4 from './components/ComecarZero4';
import ComecarZero5 from './components/ComecarZero5';
import ComecarZero6 from './components/ComecarZero6';
import ComecarZero7 from './components/ComecarZero7';
import ComecarDoZero from './pages/ComecarDoZero';
import DescubraNivel1 from './components/DescubraNivel1';
import Finalizado1 from './components/finalizado1';
import EsqueceuSenha from './components/EsqueceuSenha';
import Cadastro from './pages/Cadastro';




function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Configuracoes />} />
          <Route path="/personagem" element={<FeedLires />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/user" element={<User />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/Praticar' element={<Loja/>} />
          <Route path='/Notificações' element={<Notificação/>} />
          <Route path='/Segurança' element={<Segurança />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Inicial' element={<Inicial />} />
          <Route path='/ComecarDoZero' element={<ComecarDoZero />} />
          <Route path='/DescubraNivel1' element={<DescubraNivel1 />} />
          <Route path='/finalizado1' element={<Finalizado1 />} />
          <Route path='/EsqueceuSenha' element={<EsqueceuSenha />} />
          <Route path='/Cadastro' element={<Cadastro />} />
      
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;