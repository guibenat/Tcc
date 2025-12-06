import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useSettings } from '../components/SettingsContext'; 

// Assets 
import roboTristeImg from '../assets/robo_triste.png'; // Imagem para o modal de exclusão
// Fim dos Assets 

export default function EncerramentoLires() {
    const navigate = useNavigate();
    const { theme } = useSettings();
    
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // Pega as classes de CSS para os pop-ups (adaptado ao tema)
    const getSwalCustomClasses = () => ({
        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
        title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
        htmlContainer: `${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`,
        confirmButton: 'btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
        cancelButton: 'bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4',
        input: `rounded-lg ${theme === 'escuro' ? 'bg-gray-700 text-slate-200 border-gray-600 focus:ring-cyan-500' : 'border-gray-300 focus:ring-cyan-400'}`,
    });

    const getSwalBackground = () => (theme === 'escuro' ? '#1f2937' : '#fff');

    // Sair da conta 
    const handleLogout = () => {
        Swal.fire({
            title: 'Deseja realmente sair?',
            text: "Você será redirecionado para a tela inicial.",
            icon: 'info',
            iconColor: '#59b1ff',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar',
            customClass: getSwalCustomClasses(),
            buttonsStyling: false,
            background: getSwalBackground()
        }).then((result) => {
            if (result.isConfirmed) {
                // Lógica de Logout
                localStorage.removeItem('currentUser');
                window.location.href = '/'; 
            }
        });
    };

    // Desativar Conta
    const handleDeactivate = () => {
        Swal.fire({
            title: 'Desativar sua conta?',
            text: "Seu perfil ficará oculto. Você pode reativá-lo a qualquer momento fazendo login.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b', 
            confirmButtonText: 'Sim, desativar',
            cancelButtonText: 'Cancelar',
            customClass: {
                ...getSwalCustomClasses(),
                confirmButton: 'bg-orange-500 hover:bg-orange-600 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
            },
            buttonsStyling: false,
            background: getSwalBackground()
        }).then((result) => {
            if (result.isConfirmed) {
                // Lógica de Desativar: marca o usuário como inativo no DB
                const userString = localStorage.getItem('currentUser');
                if (userString) {
                    const currentUser = JSON.parse(userString);
                    const dbString = localStorage.getItem('liresUsersDB');
                    const db = dbString ? JSON.parse(dbString) : [];
                    
                    // Encontra o usuário no DB e marca como inativo
                    const updatedDB = db.map(user => 
                        user.id === currentUser.id ? { ...user, isActive: false } : user
                    );
                    
                    localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));
                    localStorage.removeItem('currentUser'); // Desloga
                }
                
                Swal.fire({
                    title: 'Conta desativada!',
                    icon: 'success',
                    customClass: getSwalCustomClasses(),
                    background: getSwalBackground()
                }).then(() => {
                    window.location.href = '/'; // Redireciona
                });
            }
        });
    };

    // Excluir Conta Permanentemente
    const handleDelete = async () => {
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            Swal.fire('Erro', 'Usuário não encontrado.', 'error');
            return;
        }
        const currentUser = JSON.parse(userString);
        const userPassword = currentUser.password; // Pega a senha salva

        // Aviso de Perda de Dados
        const firstStep = await Swal.fire({
            title: `<div class="flex items-center justify-center space-x-2">
                        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 12a9 9 0 0118 0z"></path>
                        </svg>
                        <span class="${theme === 'escuro' ? 'text-red-400' : 'text-red-600'} text-xl md:text-2xl lg:text-3xl font-bold">Atenção!</span>
                    </div>`,
            html: `
                <p class="${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'} text-base leading-relaxed mb-4">
                    Ao excluir sua conta, você perderá todo o progresso, sequência, XP, conquistas e conexões sociais. Esta ação não pode ser desfeita.
                </p>
                <ul class="text-left text-sm space-y-2 mb-6 ${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'}">
                    <li class="flex items-center"><svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>Progresso e Lcoins</li>
                    <li class="flex items-center"><svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>Conquistas</li>
                    <li class="flex items-center"><svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>Amigos e interações</li>
                </ul>
            `,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            customClass: getSwalCustomClasses(),
            buttonsStyling: false,
            background: getSwalBackground()
        });

        // Se o usuário clicou "Cancelar" no Aviso de Perda de Dados, para tudo.
        if (!firstStep.isConfirmed) {
            return;
        }

        // Confirmação de Senha
        const { value: passwordInput } = await Swal.fire({
            title: 'Digite sua senha para confirmar:',
            input: 'password',
            inputPlaceholder: 'Sua senha',
            showCancelButton: true,
            confirmButtonText: 'Excluir conta definitivamente',
            cancelButtonText: 'Cancelar',
            customClass: {
                ...getSwalCustomClasses(),
                confirmButton: 'bg-red-500 hover:bg-red-600 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
            },
            buttonsStyling: false,
            background: getSwalBackground(),
            inputValidator: (value) => {
                if (!value) {
                    return 'Você precisa digitar sua senha!';
                }
                if (value !== userPassword) {
                    return 'Senha incorreta!';
                }
            }
        });

        // Se o usuário digitou a senha correta e confirmou...
        if (passwordInput) {
            
            // Lógica de Exclusão REAL
            const dbString = localStorage.getItem('liresUsersDB');
            const db = dbString ? JSON.parse(dbString) : [];
            // Remove o usuário do DB
            const updatedDB = db.filter(user => user.id !== currentUser.id);
            
            localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));
            localStorage.removeItem('currentUser'); // Desloga

            // Confirmação Final com Robô Triste
            Swal.fire({
                title: 'Sua conta foi excluída com sucesso.',
                html: `
                    <div class="flex flex-col items-center">
                        <img src="${roboTristeImg}" alt="Robô triste" class="w-24 h-24 mb-4" />
                        <p class="${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'} text-base">
                            Sentimos sua falta!
                        </p>
                        <p class="${theme === 'escuro' ? 'text-slate-300' : 'text-gray-700'} text-base">
                            Esperamos te ver novamente no futuro
                        </p>
                    </div>
                `,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Fechar',
                customClass: getSwalCustomClasses(),
                buttonsStyling: false,
                background: getSwalBackground()
            }).then(() => {
                window.location.href = '/'; // Redireciona para a tela inicial
            });
        }
    };

    return (
        <div className={`content-box w-full ${animationClass}`}>
            <style>{`
              .btn-gradient-glow {
                background-image: linear-gradient(90deg, #b081ff, #59b1ff);
                box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
              }
            `}</style>
            
            <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${
                theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
            }`}>
                Encerramento
            </h1>

            <div className={`space-y-6 rounded-lg shadow-md p-6 ${
                theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
                <h2 className={`font-bold text-xl md:text-2xl lg:text-3xl ${
                    theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                    Opções de Encerramento
                </h2>
                
                <div className="space-y-4">
                    {/* Sair da conta */}
                    <div className={`pb-4 border-b ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`}>Sair da conta</h3>
                        <p className={theme === 'escuro' ? 'text-slate-400' : 'text-slate-600'}>Desconecta sua conta deste dispositivo.</p>
                        <button onClick={handleLogout} className="mt-2 text-blue-500 hover:underline font-semibold">Sair</button>
                    </div>

                    {/* Desativar conta */}
                    <div className={`pb-4 border-b ${theme === 'escuro' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold ${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`}>Desativar conta</h3>
                        <p className={theme === 'escuro' ? 'text-slate-400' : 'text-slate-600'}>Seu perfil ficará oculto e você poderá reativá-lo a qualquer momento.</p>
                        <button onClick={handleDeactivate} className="mt-2 text-orange-500 hover:underline font-semibold">Desativar</button>
                    </div>

                    {/* Excluir conta permanentemente */}
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