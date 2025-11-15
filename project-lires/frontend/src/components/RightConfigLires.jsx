import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Puxo o hook do meu contexto de configurações
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: SidebarRightDesktop
 * Esta é a barra lateral *fixa* que aparece à direita
 * nas telas de Configurações (apenas em desktop, 'hidden xl:flex').
 */
const SidebarRightDesktop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Puxo o 'theme' do contexto para estilização
    const { theme } = useSettings();

    // Função de Logout com pop-up de confirmação
    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            text: "Você será redirecionado para a tela inicial.",
            icon: 'info',
            iconColor: '#59b1ff',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar',
            // Classes customizadas para o SweetAlert (para funcionar com modo escuro)
            customClass: {
                popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
                title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
                confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
            },
            buttonsStyling: false,
            background: theme === 'escuro' ? '#1f2937' : '#fff' // Fundo do SweetAlert
        }).then((result) => {
            if (result.isConfirmed) {
                // TODO: Limpar o 'currentUser' do localStorage aqui antes de navegar
                // localStorage.removeItem('currentUser');
                navigate('/');
            }
        });
    };

    /**
     * Função helper para gerar as classes do botão de navegação.
     * Ela verifica o 'path' atual (do useLocation) e o 'theme' (do useSettings)
     * para aplicar a classe de "ativo" (background colorido) ou "inativo".
     */
    const getButtonClass = (path) => {
        const isActive = location.pathname === path;

        // Modo Escuro
        if (theme === 'escuro') {
            return `block w-full text-left font-medium p-2 rounded transition-colors text-sm ${
                isActive
                    ? 'bg-purple-700 text-purple-100' // Ativo Escuro
                    : 'text-slate-300 hover:bg-gray-700 hover:text-purple-400' // Inativo Escuro
            }`;
        }
        
        // Modo Claro
        return `block w-full text-left text-purple-600 font-medium p-2 rounded transition-colors text-sm ${
            isActive
                ? 'bg-purple-100' // Ativo Claro
                : 'hover:bg-purple-50' // Inativo Claro
        }`;
    };

    return (
        <>
            {/* O container principal da sidebar, reage ao tema */}
            <div className={`
              hidden xl:flex xl:fixed xl:right-0 xl:top-0 xl:w-80 xl:h-screen xl:p-3 xl:pt-0
              ${theme === 'escuro' ? 'bg-gray-900' : 'bg-gray-50'}
            `}>
                {/* Wrapper para os blocos de navegação */}
                <div className="w-full space-y-4 xl:mt-4"> 
                    
                    {/* Bloco 1: Menu "Conta" */}
                    <div className={`
                      rounded-3xl p-4
                      ${theme === 'escuro' 
                        ? 'bg-gray-800 border-2 border-purple-800' 
                        : 'bg-white border-2 border-purple-400'}
                    `}>
                        <h2 className={`text-xl font-semibold mb-6 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                            Conta
                        </h2>
                        
                        <nav className="space-y-3">
                            {/* Os botões agora usam a função getButtonClass */}
                            <button 
                                onClick={() => navigate('/configuracoes/gerenciamento-de-conta')} 
                                className={getButtonClass('/configuracoes/gerenciamento-de-conta')}
                            >
                                Gerenciamento da conta
                            </button>
                            <button 
                                onClick={() => navigate('/configuracoes/preferencias')} 
                                className={getButtonClass('/configuracoes/preferencias')}
                            >
                                Preferências
                            </button>
                            <button 
                                onClick={() => navigate('/configuracoes/seguranca')} 
                                className={getButtonClass('/configuracoes/seguranca')}
                            >
                                Segurança
                            </button>
                            <button 
                                onClick={() => navigate('/configuracoes/notificacoes')} 
                                className={getButtonClass('/configuracoes/notificacoes')}
                            >
                                Notificações
                            </button>
                            <button 
                                onClick={() => navigate('/configuracoes/privacidade')} 
                                className={getButtonClass('/configuracoes/privacidade')}
                            >
                                Configurações de privacidade
                            </button>
                            <button 
                                onClick={() => navigate('/configuracoes/encerramento')} 
                                className={getButtonClass('/configuracoes/encerramento')}
                            >
                                Encerramento
                            </button>
                        </nav>
                    </div>

                    {/* Bloco 2: Menu "Assinatura" */}
                    <div className={`
                      rounded-3xl p-4
                      ${theme === 'escuro' 
                        ? 'bg-gray-800 border-2 border-purple-800' 
                        : 'bg-white border-2 border-purple-400'}
                    `}>
                        <h2 className={`text-xl font-semibold mb-6 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                            Assinatura
                        </h2>
                        <nav>
                            <button 
                                onClick={() => navigate('/configuracoes/assinatura')} 
                                className={getButtonClass('/configuracoes/assinatura')}
                            >
                                Seja assinante agora!
                            </button>
                        </nav>
                    </div>

                    {/* Bloco 3: Botão "Sair" (separado) */}
                    <button 
                        onClick={handleLogout} 
                        className={`
                          w-full rounded-3xl py-3 text-lg font-bold transition-colors
                          ${theme === 'escuro' 
                            ? 'border-2 border-purple-700 text-purple-400 hover:bg-gray-700' 
                            : 'border-2 border-purple-400 text-purple-600 hover:bg-purple-50'}
                        `}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </>
    );
};

/**
 * Componente: SidebarRightMobile
 * Esta é a versão da navegação de configurações que aparece
 * *dentro* do conteúdo principal em telas pequenas/médias ('xl:hidden').
 * A lógica é idêntica à do Desktop, mas o layout é um pouco diferente.
 */
export const SidebarRightMobile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useSettings(); // Puxo o tema

    // A função de logout é exatamente a mesma
    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            text: "Você será redirecionado para a tela inicial.",
            icon: 'info',
            iconColor: '#59b1ff',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
                title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
                confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
            },
            buttonsStyling: false,
            background: theme === 'escuro' ? '#1f2937' : '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                // TODO: Limpar o 'currentUser' do localStorage
                navigate('/');
            }
        });
    };

    // A função de classe é a mesma, só aumentei a fonte base
    const getButtonClass = (path) => {
        const isActive = location.pathname === path;
        // Aumento o tamanho do texto base para mobile/tablet
        const baseClass = "block w-full text-left font-medium p-2 rounded transition-colors text-sm md:text-base";
        
        if (theme === 'escuro') {
            return `${baseClass} ${
                isActive
                    ? 'bg-purple-700 text-purple-100' // Ativo Escuro
                    : 'text-slate-300 hover:bg-gray-700 hover:text-purple-400' // Inativo Escuro
            }`;
        }
        
        return `${baseClass} text-purple-600 ${
            isActive
                ? 'bg-purple-100' // Ativo Claro
                : 'hover:bg-purple-50' // Inativo Claro
        }`;
    };

    return (
        // Esta div 'xl:hidden' é o que faz ela aparecer só em telas menores
        // O 'space-y-8' cuida do espaçamento entre os blocos
        <div className="xl:hidden mt-8 space-y-8">
            
            {/* Bloco 1: "Conta" (Mobile) */}
            <div className={`
              rounded-3xl p-6
              ${theme === 'escuro' 
                ? 'bg-gray-800 border-2 border-purple-800' 
                : 'bg-white border-2 border-purple-400'}
            `}>
                <h2 className={`text-xl md:text-2xl font-semibold mb-6 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                    Conta
                </h2>
                <nav className="space-y-3">
                    <button 
                        onClick={() => navigate('/configuracoes/gerenciamento-de-conta')} 
                        className={getButtonClass('/configuracoes/gerenciamento-de-conta')}
                    >
                        Gerenciamento da conta
                    </button>
                    <button 
                        onClick={() => navigate('/configuracoes/preferencias')} 
                        className={getButtonClass('/configuracoes/preferencias')}
                    >
                        Preferências
                    </button>
                    <button 
                        onClick={() => navigate('/configuracoes/seguranca')} 
                        className={getButtonClass('/configuracoes/seguranca')}
                    >
                        Segurança
                    </button>
                    <button 
                        onClick={() => navigate('/configuracoes/notificacoes')} 
                        className={getButtonClass('/configuracoes/notificacoes')}
                    >
                        Notificações
                    </button>
                    <button 
                        onClick={() => navigate('/configuracoes/privacidade')} 
                        className={getButtonClass('/configuracoes/privacidade')}
                    >
                        Configurações de privacidade
                    </button>
                    <button 
                        onClick={() => navigate('/configuracoes/encerramento')} 
                        className={getButtonClass('/configuracoes/encerramento')}
                    >
                        Encerramento
                    </button>
                </nav>
            </div>

            {/* Bloco 2: "Assinatura" (Mobile) */}
            <div className={`
              rounded-3xl p-6
              ${theme === 'escuro' 
                ? 'bg-gray-800 border-2 border-purple-800' 
                : 'bg-white border-2 border-purple-400'}
            `}>
                <h2 className={`text-xl md:text-2xl font-semibold mb-6 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                    Assinatura
                </h2>
                <nav>
                    <button 
                        onClick={() => navigate('/configuracoes/assinatura')} 
                        className={getButtonClass('/configuracoes/assinatura')}
                    >
                        Seja assinante agora!
                    </button>
                </nav>
            </div>

            {/* Bloco 3: "Sair" (Mobile) */}
            <button 
                onClick={handleLogout} 
                className={`
                  w-full rounded-3xl py-3 text-lg md:text-xl font-bold transition-colors
                  ${theme === 'escuro' 
                    ? 'border-2 border-purple-700 text-purple-400 hover:bg-gray-700' 
                    : 'border-2 border-purple-400 text-purple-600 hover:bg-purple-50'}
                `}
            >
                Sair
            </button>
        </div>
    );
};

// O export default é a versão Desktop
export default SidebarRightDesktop;