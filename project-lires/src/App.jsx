import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Personagem from './pages/Personagem';


function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personagem" element={<Personagem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;