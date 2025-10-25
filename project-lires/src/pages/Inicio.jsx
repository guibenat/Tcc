import React, { useState, useEffect, useRef } from 'react'; // Adicionado useState, useEffect, useRef
import { useNavigate } from 'react-router-dom';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext';

// --- Imagens ---
// 2. IMPORTAR AMBAS AS LOGOS (CLARA E ESCURA)
import logoLiresClaraImg from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png'; // <- Verifique o nome/caminho
import roboPrincipalImg from '../assets/LoginLogo.png';
import grupoInclusivoImg from '../assets/RoboPessoas.png';
import conexaoImg from '../assets/GarotaNotebook.png';
import bandeiraBrasilImg from '../assets/Brasil.jpg';


// --- Componentes de Seção (ATUALIZADOS) ---

// ATUALIZADO: Aceita 'theme'
const Header = ({ theme }) => (
  <header className="py-8">
    <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      {/* ATUALIZADO: Usa a logo correta */}
      <img 
        src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
        alt="Logo Lires" 
        className="h-16 sm:h-20 w-auto" 
      />
      {/* ATUALIZADO: Botão de idioma */}
      <button className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm transition-colors ${
        theme === 'escuro' 
        ? 'border-gray-600 text-slate-300 hover:bg-gray-700' 
        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}>
        <img src={bandeiraBrasilImg} alt="Bandeira do Brasil" className="w-6 h-auto" />
        <span>Idioma</span>
      </button>
    </div>
  </header>
);

// ATUALIZADO: Aceita 'theme'
const StickyActions = ({ onStart, onLogin, isVisible, theme }) => (
  <div
    className={`fixed top-0 left-0 right-0 backdrop-blur-sm shadow-md z-50 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    } ${
      theme === 'escuro' ? 'bg-gray-800/90' : 'bg-white/90' // Fundo atualizado
    }`}
  >
    <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
      <div>
        {/* ATUALIZADO: Usa a logo correta */}
        <img 
          src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
          alt="Logo Lires" 
          className="h-12 sm:h-14 w-auto" 
        />
      </div>
      <div className="flex gap-2 sm:gap-4">
        {/* Botão Comece Agora (gradiente, sem mudança visual) */}
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
        {/* ATUALIZADO: Botão Login */}
        <button
          onClick={onLogin}
          className={`text-sm sm:text-base font-semibold py-2 px-4 sm:px-8 rounded-full border-2 transition-colors duration-300 ${
            theme === 'escuro' 
            ? 'bg-gray-700 border-purple-600 text-purple-400 hover:bg-gray-600' 
            : 'bg-white border-[#b081ff] text-[#b081ff] hover:bg-violet-50'
          }`}
        >
          Login
        </button>
      </div>
    </div>
  </div>
);

// ATUALIZADO: Aceita 'theme'
const Hero = ({ imagemRobo, onStart, onLogin, theme }) => (
  <section className="text-center md:text-left py-16 md:py-24">
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
      <div className="md:w-1/2 flex justify-center fade-in-up" style={{ animationDelay: '0.2s' }}>
        <img src={imagemRobo} alt="Robô Lires amigável" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg floating-robot" />
      </div>
      <div className="md:w-1/2 flex flex-col items-center md:items-start fade-in-up" style={{ animationDelay: '0.4s' }}>
        {/* ATUALIZADO: Texto */}
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          theme === 'escuro' ? 'text-slate-100' : 'text-gray-800'
        }`}>
          Aprender libras ficou mais fácil e
          <span className={`${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`}> divertido com a gente!</span>
        </h2>
        <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
          {/* Botão Comece agora (gradiente, sem mudança) */}
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
          {/* ATUALIZADO: Botão Já tenho conta */}
          <button
            onClick={onLogin}
            className={`text-lg font-semibold py-3 px-12 rounded-full border-2 transition-colors duration-300 ${
              theme === 'escuro' 
              ? 'bg-gray-700 border-purple-600 text-purple-400 hover:bg-gray-600' 
              : 'bg-white border-[#b081ff] text-[#b081ff] hover:bg-violet-50'
            }`}
          >
            Já tenho uma conta
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ATUALIZADO: Aceita 'theme'
const Features = ({ imagemGrupo, imagemConexao, theme }) => (
  <>
    {/* Seção de Features 1 */}
    <section className="py-16 text-center md:text-left">
      <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 fade-in-up flex flex-col justify-center">
          {/* ATUALIZADO: Textos */}
          <h3 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === 'escuro' ? 'text-teal-400' : 'text-teal-500'}`}>
            Acessível, Inclusivo e Transformador.
          </h3>
          <p className={`text-lg leading-relaxed ${theme === 'escuro' ? 'text-fuchsia-400' : 'text-fuchsia-500'}`}>
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
          {/* ATUALIZADO: Textos */}
          <h3 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === 'escuro' ? 'text-teal-400' : 'text-teal-500'}`}>
            Mantenha a conexão
          </h3>
          <p className={`text-lg leading-relaxed ${theme === 'escuro' ? 'text-fuchsia-400' : 'text-fuchsia-500'}`}>
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

// ATUALIZADO: Aceita 'theme'
const CallToAction = ({ theme }) => (
    <section className="text-center py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* ATUALIZADO: Texto */}
        <h4 className={`text-3xl sm:text-4xl font-bold ${
          theme === 'escuro' ? 'text-slate-100' : 'text-gray-800'
        }`}>
          Aprenda libras com <span className={`${theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'}`}>Lires</span>
        </h4>
      </div>
    </section>
);
 
// ATUALIZADO: Aceita 'theme'
const Footer = ({ theme }) => (
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
          {/* ATUALIZADO: Cor da onda */}
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={theme === 'escuro' ? 'fill-gray-900' : 'fill-white'} // <- Muda a cor da onda de fundo
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
  // 3. LER O TEMA
  const { theme } = useSettings();
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef(null); // Corrigido para useRef
  const navigate = useNavigate();

  useEffect(() => { // Corrigido para useEffect
    const handleScroll = () => {
      const heroElement = heroRef.current;
      if (heroElement) {
        // Mostra a barra fixa quando o scroll passar do topo da seção Hero
        if (window.scrollY > heroElement.offsetTop + heroElement.offsetHeight / 2) { 
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
  }, []); // Array vazio garante que rode apenas na montagem/desmontagem

  const handleStartNow = () => {
    navigate('/cadastro');
  };

  const handleAlreadyHaveAccount = () => {
    navigate('/login');
  };

  return (
    // 4. APLICAR TEMA AO FUNDO PRINCIPAL
    <div className={` ${
      theme === 'escuro' ? 'bg-gray-900 text-slate-300' : 'bg-white text-gray-800'
    }`}>       
      {/* 5. PASSAR O TEMA PARA OS SUBCOMPONENTES */}
      <StickyActions 
        onStart={handleStartNow} 
        onLogin={handleAlreadyHaveAccount} 
        isVisible={showSticky} 
        theme={theme}
      />

      <Header theme={theme} />
      <main>
        {/* Usamos ref para saber quando mostrar a barra fixa */}
        <div ref={heroRef}> 
          <Hero 
            imagemRobo={roboPrincipalImg} 
            onStart={handleStartNow} 
            onLogin={handleAlreadyHaveAccount} 
            theme={theme}
          />
        </div>
        {/* Divisor */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className={`border-t-2 my-16 ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-100'}`}></div>
        </div>
        <Features 
          imagemGrupo={grupoInclusivoImg} 
          imagemConexao={conexaoImg} 
          theme={theme}
        />
      </main>
      <CallToAction theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}