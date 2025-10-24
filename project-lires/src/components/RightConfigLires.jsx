import React from 'react';
// 1. Importar o useLocation
import { useNavigate, useLocation } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Componente para a barra lateral de configurações de DESKTOP
const SidebarRightDesktop = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 2. Obter a localização atual

    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            text: "Você será redirecionado para a tela inicial.",
            icon: 'info',
            iconColor: '#59b1ff',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar',
            customClass: { /* ... classes do Swal ... */ },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    };

    // 3. Definir as classes base para os botões para evitar repetição
    const baseButtonClass = "block w-full text-left text-purple-600 font-medium p-2 rounded transition-colors text-sm";

    // 4. Função para verificar se o link está ativo
    const getButtonClass = (path) => {
        return `${baseButtonClass} ${
            location.pathname === path
                ? 'bg-purple-100' // Classe ativa
                : 'hover:bg-purple-50' // Classe inativa (com hover)
        }`;
    };

    return (
        <>
            <div className="hidden xl:flex xl:fixed xl:right-0 xl:top-0 xl:w-80 xl:h-screen xl:bg-gray-50 xl:p-3 xl:pt-0 ">
                <div className="w-full space-y-2 xl:mt-4">
                    {/* Menu Conta */}
                    <div className="bg-white border-2 border-purple-400 rounded-3xl p-4">
                        <h2 className="text-purple-600 text-xl font-semibold mb-6">Conta</h2>
                        <nav className="space-y-3">
                            {/* 5. Aplicar a classe dinâmica em todos os botões */}
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
                                className={getButtonClass('/configuracoes/privacidade')} // Removido o bg-purple-100 fixo
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
                        <button onClick={handleLogout} className="w-full mt-6 border-2 border-purple-400 rounded-3xl py-3 text-purple-600 text-lg font-bold hover:bg-purple-50 transition-colors">
                            Sair
                        </button>
                    </div>
                    {/* Card Assinatura (Cole o seu código aqui) */}
                </div>
            </div>
            {/* ... (código do <style jsx>) ... */}
        </>
    );
};

// Componente para versão mobile
export const SidebarRightMobile = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 1. Obter a localização atual

    // 2. Reutilizar a função de logout (ou copiá-la para cá se preferir)
    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            text: "Você será redirecionado para a tela inicial.",
            icon: 'info',
            iconColor: '#59b1ff',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar',
            customClass: { /* ... classes do Swal ... */ },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    };

    // 3. Classes base para mobile
    const baseButtonClass = "block w-full text-left text-purple-600 font-medium p-2 rounded transition-colors text-sm md:text-base";

    // 4. Função de classe dinâmica para mobile
    const getButtonClass = (path) => {
        return `${baseButtonClass} ${
            location.pathname === path
                ? 'bg-purple-100'
                : 'hover:bg-purple-50'
        }`;
    };

    return (
        <div className="xl:hidden mt-8 space-y-8">
            {/* Menu Conta */}
            <div className="bg-white border-2 border-purple-400 rounded-3xl p-6">
                <h2 className="text-purple-600 text-xl md:text-2xl font-semibold mb-6">Conta</h2>
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
section
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
s                   </button>
                </nav>
  	
               {/* 5. Adicionar o onClick de logout aqui */}
               <button 
                    onClick={handleLogout} 
                    className="w-full mt-6 border-2 border-purple-400 rounded-3xl py-3 text-purple-600 text-lg md:text-xl font-bold hover:bg-purple-50 transition-colors"
                >
                    Sair
                </button>
            </div>
            {/* Card Assinatura (Cole o seu código aqui) */}
        </div>
    );
};

export default SidebarRightDesktop;