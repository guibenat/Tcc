import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function EncerramentoLires() {
    const navigate = useNavigate();
    
    // Animação de entrada
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // Função para Sair (Logout)
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
                popup: 'font-poppins rounded-2xl',
                title: 'text-slate-800',
                confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
                cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/'); // Redireciona para a tela inicial
            }
        });
    };

    // Função para Desativar Conta
    const handleDeactivate = () => {
        Swal.fire({
            title: 'Desativar sua conta?',
            text: "Seu perfil ficará oculto. Você pode reativá-lo a qualquer momento.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b', // Laranja
            confirmButtonText: 'Sim, desativar',
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'font-poppins rounded-2xl' }
        }).then((result) => {
            if (result.isConfirmed) {
                // Adicione a lógica de desativação aqui
                console.log("Conta desativada...");
                navigate('/');
            }
        });
    };

    // Função para Excluir Conta
    const handleDelete = () => {
        Swal.fire({
            title: 'Excluir sua conta?',
            text: "Esta ação é irreversível! Todos os seus dados serão perdidos.",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Vermelho
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'font-poppins rounded-2xl' }
        }).then((result) => {
            if (result.isConfirmed) {
                // Adicione a lógica de exclusão aqui
                console.log("Conta excluída permanentemente...");
                navigate('/');
            }
        });
    };

    return (
        // REMOVIDO: O <div flex-col> e todas as classes de posicionamento fixo
        // ADICIONADO: O wrapper 'content-box' para animação
        <div className={`content-box w-full ${animationClass}`}>
            <h1 className="text-purple-600 font-bold text-2xl md:text-3xl lg:text-5xl mb-8">
                Encerramento
            </h1>

            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <h2 className="text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl">
                    Opções de Encerramento
                </h2>
                
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-semibold text-slate-800">Sair da conta</h3>
                        <p className="text-slate-600">Desconecta sua conta deste dispositivo.</p>
                        <button onClick={handleLogout} className="mt-2 text-blue-500 hover:underline font-semibold">Sair</button>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="text-xl font-semibold text-slate-800">Desativar conta</h3>
                        <p className="text-slate-600">Seu perfil ficará oculto e você poderá reativá-lo a qualquer momento.</p>
                        <button onClick={handleDeactivate} className="mt-2 text-orange-500 hover:underline font-semibold">Desativar</button>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-red-700">Excluir conta permanentemente</h3>
                        <p className="text-red-600">Esta ação é irreversível. Todos os seus dados, progresso e Lcoins serão perdidos.</p>
                        <button onClick={handleDelete} className="mt-2 text-red-500 hover:underline font-semibold">Excluir conta</button>
                    </div>
                </div>
            </div>
            {/* REMOVIDO: O menu lateral que estava duplicado aqui */}
        </div>
    );
}
