import React from 'react';
import robotImage from '../assets/robot-happy.png';
import liresLogoImage from '../assets/logo-lires.png';

const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 text-gray-800 font-poppins">
      
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full h-full box-border text-center flex flex-col">
        
        <div className="flex flex-col flex-shrink-0">
          <div className="pb-2 flex justify-start">
            <img src={liresLogoImage} alt="Lires Logo" className="h-24" />
          </div>
          <hr className="my-0 mb-4" />
        </div>

        <div className="flex-grow flex items-center justify-center">
        </div>
      </div>

      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        
        {/* A caixa de conteúdo do modal agora tem uma sombra azul personalizada */}
        <div 
          className="bg-white p-8 rounded-2xl border-2 border-blue-400 flex items-center gap-8 max-w-2xl"
          style={{
            boxShadow: '0 0 50px rgba(90, 177, 255, 0.6)', // Sombra azul
          }}
        >
          <div className="flex-grow text-left">
            <p className="text-xl font-semibold mb-2" style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Você vai começar do básico em Libras. Prepare-se para sua primeira aula!
            </p>
            <button
              className="mt-4 text-lg font-semibold py-3 px-8 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
                boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
              }}
            >
              Iniciar
            </button>
          </div>
          <div className="flex-shrink-0 w-48">
            <img 
              src={robotImage} 
              alt="Robô Amigável" 
              className="w-full robot-float" 
              style={{
                animation: 'float 3s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
      
      <style>{floatAnimation}</style>
    </div>
  );
}

export default App;