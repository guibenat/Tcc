import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext';

export default function EncerramentoLires() {
    const navigate = useNavigate();
    // 2. LER O TEMA DO CONTEXTO
    const { theme } = useSettings();
    
    // Animação de entrada
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // Função para Sair (Logout) - ATUALIZADA
    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            text: "Você será redirecionado para a tela inicial.",
            icon: 'info',
            iconColor: '#59b1ff',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar',
            // ATUALIZADO: customClass reage ao tema
            customClass: {
                popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
                title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
                confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
            },
            buttonsStyling: false,
            // ATUALIZADO: background reage ao tema
            background: theme === 'escuro' ? '#1f2937' : '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/'); 
            }
        });
    };

    // Função para Desativar Conta - ATUALIZADA
    const handleDeactivate = () => {
        Swal.fire({
            title: 'Desativar sua conta?',
            text: "Seu perfil ficará oculto. Você pode reativá-lo a qualquer momento.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b', 
            confirmButtonText: 'Sim, desativar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
                title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
            },
            background: theme === 'escuro' ? '#1f2937' : '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Conta desativada...");
                navigate('/');
            }
        });
    };

    // Função para Excluir Conta - ATUALIZADA
    const handleDelete = () => {
        Swal.fire({
            title: 'Excluir sua conta?',
            text: "Esta ação é irreversível! Todos os seus dados serão perdidos.",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
                title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
            },
            background: theme === 'escuro' ? '#1f2937' : '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Conta excluída permanentemente...");
                navigate('/');
            }
        });
    };

    return (
        <div className={`content-box w-full ${animationClass}`}>
            {/* TÍTULO PRINCIPAL ATUALIZADO */}
            <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${
                theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
            }`}>
                Encerramento
            </h1>

            {/* CARD PRINCIPAL ATUALIZADO */}
            <div className={`space-y-6 rounded-lg shadow-md p-6 ${
                theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
                <h2 className={`font-bold text-xl md:text-2xl lg:text-3xl ${
                    theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                    Opções de Encerramento
                </h2>
                
                <div className="space-y-4">
                    {/* OPÇÃO 1 ATUALIZADA */}
                    <div className={`pb-4 border-b ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`}>Sair da conta</h3>
                        <p className={theme === 'escuro' ? 'text-slate-400' : 'text-slate-600'}>Desconecta sua conta deste dispositivo.</p>
                        <button onClick={handleLogout} className="mt-2 text-blue-500 hover:underline font-semibold">Sair</button>
                    </div>

                    {/* OPÇÃO 2 ATUALIZADA */}
                    <div className={`pb-4 border-b ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`}>Desativar conta</h3>
                        <p className={theme === 'escuro' ? 'text-slate-400' : 'text-slate-600'}>Seu perfil ficará oculto e você poderá reativá-lo a qualquer momento.</p>
                        <button onClick={handleDeactivate} className="mt-2 text-orange-500 hover:underline font-semibold">Desativar</button>
                    </div>

                    {/* OPÇÃO 3 ATUALIZADA */}
                    <div>
                        <h3 className={`text-xl font-semibold ${theme === 'escuro' ? 'text-red-500' : 'text-red-700'}`}>Excluir conta permanentemente</h3>
                        <p className={theme === 'escuro' ? 'text-red-500' : 'text-red-600'}>Esta ação é irreversível. Todos os seus dados, progresso e Lcoins serão perdidos.</p>
                        <button onClick={handleDelete} className="mt-2 text-red-500 hover:underline font-semibold">Excluir conta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}