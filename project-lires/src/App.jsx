import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Personagem from './pages/Personagem';
import Inicio from './pages/Inicio';
import Loja from './pages/Loja';
import Praticar from './pages/Praticar';


function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Loja />} />
          <Route path="/personagem" element={<Personagem />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/user" element={<User />} />
          <Route path='/loja' element={<Home/>} />
          <Route path='/Praticar' element={<Loja/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;