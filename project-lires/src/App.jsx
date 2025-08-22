import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Personagem from './pages/Personagem';
import Inicio from './pages/Inicio';
import Loja from './pages/Loja';

import Assinatura from './pages/Assinatura';


function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personagem" element={<Personagem />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/user" element={<User />} />
          <Route path='/loja' element={<Loja/>} />
          <Route path='/Assinatura' element={<Assinatura/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;