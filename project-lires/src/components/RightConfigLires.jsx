import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext';

// --- Componente para a barra lateral de configurações de DESKTOP ---
const SidebarRightDesktop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // 2. LER O TEMA DO CONTEXTO
    const { theme } = useSettings();

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
              // 3. ADICIONAR CLASSES DE TEMA ESCURO AO SWAL
              popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
              title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
              confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
              cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
            },
            buttonsStyling: false,
            background: theme === 'escuro' ? '#1f2937' : '#fff' // Fundo do SweetAlert
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    };

    // 4. ATUALIZAR FUNÇÃO DE CLASSE PARA REAGIR AO TEMA
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
        
        // Modo Claro (original)
        return `block w-full text-left text-purple-600 font-medium p-2 rounded transition-colors text-sm ${
            isActive
                ? 'bg-purple-100' // Ativo Claro
                : 'hover:bg-purple-50' // Inativo Claro
        }`;
    };

    return (
        <>
            {/* 5. ATUALIZAR CONTAINER PRINCIPAL PARA REAGIR AO TEMA */}
            <div className={`
              hidden xl:flex xl:fixed xl:right-0 xl:top-0 xl:w-80 xl:h-screen xl:p-3 xl:pt-0
              ${theme === 'escuro' ? 'bg-gray-900' : 'bg-gray-50'}
            `}>
                <div className="w-full space-y-2 xl:mt-4">
                    {/* Menu Conta */}
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
                            {/* Os botões agora usam a função getButtonClass atualizada */}
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

                        {/* 6. ATUALIZAR BOTÃO SAIR PARA REAGIR AO TEMA */}
                        <button 
                          onClick={handleLogout} 
                          className={`
                            w-full mt-6 rounded-3xl py-3 text-lg font-bold transition-colors
                            ${theme === 'escuro' 
                              ? 'border-2 border-purple-700 text-purple-400 hover:bg-gray-700' 
                              : 'border-2 border-purple-400 text-purple-600 hover:bg-purple-50'}
                          `}
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Componente para versão mobile ---
export const SidebarRightMobile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // 1. LER O TEMA DO CONTEXTO (MOBILE)
    const { theme } = useSettings();

    // 2. ATUALIZAR LOGOUT (MOBILE)
    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            /* ... (mesma configuração do SweetAlert do desktop) ... */
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
                navigate('/');
            }
        });
    };

    // 3. ATUALIZAR FUNÇÃO DE CLASSE (MOBILE)
    const getButtonClass = (path) => {
        const isActive = location.pathname === path;
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
        <div className="xl:hidden mt-8 space-y-8">
            {/* 4. ATUALIZAR CARD (MOBILE) */}
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
                    {/* Botões usam a nova função */}
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
        
                {/* 5. ATUALIZAR BOTÃO SAIR (MOBILE) */}
                <button 
                    onClick={handleLogout} 
                    className={`
                      w-full mt-6 rounded-3xl py-3 text-lg md:text-xl font-bold transition-colors
                      ${theme === 'escuro' 
                        ? 'border-2 border-purple-700 text-purple-400 hover:bg-gray-700' 
                        : 'border-2 border-purple-400 text-purple-600 hover:bg-purple-50'}
                    `}
                >
                    Sair
                </button>
            </div>
        </div>
    );
};

export default SidebarRightDesktop;