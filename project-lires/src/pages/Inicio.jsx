import React from 'react';
// 1. Importar o hook useNavigate para navegação
import { useNavigate } from 'react-router-dom';

import logoLiresImg from '../assets/logo-lires.png';
import roboPrincipalImg from '../assets/LoginLogo.png';
import grupoInclusivoImg from '../assets/RoboPessoas.png';
import conexaoImg from '../assets/GarotaNotebook.png';
import bandeiraBrasilImg from '../assets/Brasil.jpg';


// --- Componentes de Seção (Sem alterações) ---

const Header = () => (
  <header className="py-8">
    <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <img src={logoLiresImg} alt="Logo Lires" className="h-16 sm:h-20 w-auto" />
      <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
        <img src={bandeiraBrasilImg} alt="Bandeira do Brasil" className="w-6 h-auto" />
        <span>Idioma</span>
      </button>
    </div>
  </header>
);

const StickyActions = ({ onStart, onLogin, isVisible }) => (
  <div
    className={`fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md z-50 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}
  >
    <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
      <div>
        <img src={logoLiresImg} alt="Logo Lires" className="h-12 sm:h-14 w-auto" />
      </div>
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={onStart}
          className="hidden sm:block text-sm sm:text-base font-semibold py-2 px-4 sm:px-8 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105"
          style={{
            backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)',
            boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)',
          }}
        >
          Comece agora
        </button>
        <button
          onClick={onLogin}
          className="text-sm sm:text-base font-semibold py-2 px-4 sm:px-8 rounded-full border-2 transition-colors duration-300 bg-white hover:bg-violet-50"
          style={{
            borderColor: '#b081ff',
            color: '#b081ff',
          }}
        >
          Login
        </button>
      </div>
    </div>
  </div>
);

const Hero = ({ imagemRobo, onStart, onLogin }) => (
  <section className="text-center md:text-left py-16 md:py-24">
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
      <div className="md:w-1/2 flex justify-center fade-in-up" style={{ animationDelay: '0.2s' }}>
        <img src={imagemRobo} alt="Robô Lires amigável" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg floating-robot" />
      </div>
      <div className="md:w-1/2 flex flex-col items-center md:items-start fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          Aprender libras ficou mais fácil e 
          <span className="text-purple-500"> divertido com a gente!</span>
        </h2>
        <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
          <button 
            onClick={onStart}
            className="text-lg font-semibold py-3 px-12 border-none rounded-full cursor-pointer text-white transition transform duration-200 hover:scale-105"
            style={{ 
              backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', 
              boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' 
            }}
          >
            Comece agora
          </button>
          <button 
            onClick={onLogin}
            className="bg-white text-lg font-semibold py-3 px-12 rounded-full border-2 transition-colors duration-300 hover:bg-violet-50"
             style={{
               borderColor: '#b081ff',
               color: '#b081ff',
            }}
          >
            Já tenho uma conta
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Features = ({ imagemGrupo, imagemConexao }) => (
  <>
    {/* Seção de Features 1 */}
    <section className="py-16 text-center md:text-left">
      <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 fade-in-up flex flex-col justify-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-teal-500">
            Acessível, Inclusivo e Transformador.
          </h3>
          <p className="text-lg text-fuchsia-500 leading-relaxed">
            Aprender Libras com o Lires abre um mundo de comunicação e conexão! Com aulas claras e interativas, você descobre como construir pontes e promover a verdadeira inclusão. Comece sua jornada transformadora hoje mesmo!
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center fade-in-up" style={{ animationDelay: '0.2s' }}>
          <img src={imagemGrupo} alt="Grupo de pessoas diversas com o robô Lires" className="max-w-md w-full rounded-lg" />
        </div>
      </div>
    </section>

    {/* Seção de Features 2 */}
    <section className="py-16 text-center md:text-left">
      <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="md:w-1/2 fade-in-up flex flex-col justify-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-teal-500">
            Mantenha a conexão
          </h3>
          <p className="text-lg text-fuchsia-500 leading-relaxed">
            É simples criar o hábito de se comunicar em Libras com recursos visuais claros, atividades interativas e a inspiração da nossa comunidade de aprendizes no Lires.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center fade-in-up" style={{ animationDelay: '0.2s' }}>
          <img src={imagemConexao} alt="Pessoa aprendendo Libras em um laptop" className="max-w-md w-full rounded-lg" />
        </div>
      </div>
    </section>
  </>
);

const CallToAction = () => (
    <section className="text-center py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <h4 className="text-3xl sm:text-4xl font-bold">
          Aprenda libras com <span className="text-purple-500">Lires</span>
        </h4>
      </div>
    </section>
);
  
const Footer = () => (
    <footer className="relative bg-gradient-to-b from-violet-400 to-blue-500 text-white pt-20 pb-8">
      {/* Top Wavy SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[150px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
          <a href="#" className="hover:underline">Sobre Nós</a>
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Loja</a>
        </div>
        
        <div className="text-center text-sm text-white/70 border-t border-white/20 pt-6 mt-8">
          <p>&copy; {new Date().getFullYear()} Lires. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
);


// --- Componente Principal ---

export default function Inicio() {
  const [showSticky, setShowSticky] = React.useState(false);
  const heroRef = React.useRef(null);
  
  // 2. Inicializar a função de navegação
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      const heroElement = heroRef.current;
      if (heroElement) {
        if (window.scrollY > heroElement.offsetTop) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 3. Atualizar as funções de clique para usar o navigate
  const handleStartNow = () => {
    navigate('/cadastro');
  };

  const handleAlreadyHaveAccount = () => {
    navigate('/login');
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; overflow-x: hidden; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes floatAnimation {
          from { transform: translateY(0); }
          to { transform: translateY(-20px); }
        }
        .floating-robot {
          animation: floatAnimation 3s ease-in-out infinite alternate;
        }
      `}</style>
      
      <StickyActions 
        onStart={handleStartNow} 
        onLogin={handleAlreadyHaveAccount} 
        isVisible={showSticky} 
      />

      <Header />
      <main>
        <div ref={heroRef}>
          <Hero 
            imagemRobo={roboPrincipalImg} 
            onStart={handleStartNow} 
            onLogin={handleAlreadyHaveAccount} 
          />
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-t-2 border-gray-100 my-16"></div>
        </div>
        <Features 
          imagemGrupo={grupoInclusivoImg} 
          imagemConexao={conexaoImg} 
        />
      </main>
      <CallToAction />
      <Footer />
    </div>
  );
}