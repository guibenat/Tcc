import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Componente para a barra lateral de configurações de DESKTOP
const SidebarRightDesktop = () => {
    const navigate = useNavigate();

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

    return (
        <>
            <div className="hidden xl:flex xl:fixed xl:right-0 xl:top-0 xl:w-80 xl:h-screen xl:bg-gray-50 xl:p-3 xl:pt-0 ">
                <div className="w-full space-y-2 xl:mt-4">
                    {/* Menu Conta */}
                    <div className="bg-white border-2 border-purple-400 rounded-3xl p-4">
                        <h2 className="text-purple-600 text-xl font-semibold mb-6">Conta</h2>
                        <nav className="space-y-3">
                            {/* Botões atualizados para usar navigate */}
                            <button onClick={() => navigate('/configuracoes/gerenciamento-de-conta')} className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Gerenciamento da conta
                            </button>
                            <button onClick={() => navigate('/configuracoes/preferencias')} className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Preferências
                            </button>
                            <button onClick={() => navigate('/configuracoes/seguranca')} className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Segurança
                            </button>
                            <button onClick={() => navigate('/configuracoes/notificacoes')} className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Notificações
                            </button>
                            <button onClick={() => navigate('/configuracoes/privacidade')} className="block w-full text-left text-purple-600 font-medium bg-purple-100 p-2 rounded text-sm">
                                Configurações de privacidade
                            </button>
                            <button onClick={() => navigate('/configuracoes/encerramento')} className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
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
    // Adicione a lógica de navegação aos botões mobile também
    return (
        <div className="xl:hidden mt-8 space-y-8">
            {/* Menu Conta */}
            <div className="bg-white border-2 border-purple-400 rounded-3xl p-6">
                <h2 className="text-purple-600 text-xl md:text-2xl font-semibold mb-6">Conta</h2>
                <nav className="space-y-3">
                    <button onClick={() => navigate('/configuracoes/gerenciamento-de-conta')} className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm md:text-base">
                        Gerenciamento da conta
                    </button>
                    {/* ... adicione onClick={...} para os outros botões ... */}
                </nav>
                <button className="w-full mt-6 border-2 border-purple-400 rounded-3xl py-3 text-purple-600 text-lg md:text-xl font-bold hover:bg-purple-50 transition-colors">
                    Sair
                </button>
            </div>
            {/* Card Assinatura (Cole o seu código aqui) */}
        </div>
    );
};

export default SidebarRightDesktop;