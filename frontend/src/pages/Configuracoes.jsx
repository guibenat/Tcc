import React, { useState, useEffect } from 'react';
import { useSettings } from '../components/SettingsContext'; 

// Função para calcular a idade 

const calculateAge = (dateString) => {
    if (!dateString || dateString.length < 10) return null;
    
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    
    const today = new Date();
    const birthDate = new Date(year, month, day);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
// Fim

export default function ConfiguracoesPrivacidade() {
    const { theme } = useSettings();

    // Estados do localstorage
    const [visibilidade, setVisibilidade] = useState("Público"); // Público ou Privado
    const [desafios, setDesafios] = useState(true); // Permitir desafios de outros usuários
    const [convites, setConvites] = useState(true); // Receber convites de amizade
    const [progresso, setProgresso] = useState(true); // Mostrar progresso no ranking
    
    // Estados de UI/Controle
    const [isMinor, setIsMinor] = useState(false); // se o usuário é menor de 16...
    const [animationClass, setAnimationClass] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Controla o ciclo inicial de load/save
    const [saveMessage, setSaveMessage] = useState(''); // Feedback de "Salvo!"

    // Carregar Configurações Iniciais
    useEffect(() => {
        setAnimationClass('anim-enter');
        
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            const settings = user.privacySettings;
            
            // Carrega as configurações de privacidade salvas
            if (settings) {
                setVisibilidade(settings.visibilidade || "Público");
                setDesafios(settings.desafios ?? true);
                setConvites(settings.convites ?? true);
                setProgresso(settings.progresso ?? true);
            }

            // Lógica de verificação de idade 
            if (user.dataNascimento) {
                const age = calculateAge(user.dataNascimento);
                if (age !== null && age < 16) {
                    setIsMinor(true);
                } else {
                    setIsMinor(false);
                }
            } else {
                setIsMinor(false); // Se não tem data, assumo que não é menor de 16
            }
        }
        setIsLoading(false); 
    }, []);
    // Fim

    // Salvar Configurações Automaticamente
    useEffect(() => {
        // Ignora o primeiro ciclo de execução para não salvar o estado inicial
        if (isLoading) return; 

        // Eu uso um timer para salvar, assim evito bater no localStorage a cada clique
        const saveTimer = setTimeout(() => {
            console.log("Salvando configurações de privacidade automaticamente...");

            const userString = localStorage.getItem('currentUser');
            const dbString = localStorage.getItem('liresUsersDB');
            if (!userString || !dbString) return; 

            const currentUser = JSON.parse(userString);
            const liresUsersDB = JSON.parse(dbString);

            // Crio o objeto das configurações atuais
            const privacySettings = {
                visibilidade: visibilidade,
                desafios: desafios,
                convites: convites,
                progresso: progresso,
            };

            // Atualizo o usuário logado e o DB
            const updatedUser = { 
                ...currentUser, 
                privacySettings: privacySettings 
            };
            
            const updatedDB = liresUsersDB.map(user => 
                user.id === currentUser.id ? updatedUser : user
            );

            // Persisto no localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));

            // Feedback de sucesso
            setSaveMessage("Salvo!");
            setTimeout(() => setSaveMessage(''), 2000); 
            
        }, 500); 

        
        return () => clearTimeout(saveTimer); 

    }, [ 
        visibilidade, desafios, convites, progresso, isLoading
    ]);
    // Fim

    // Classes de Estilo Dinâmicas 
    const selectClasses = theme === 'escuro'
        ? 'w-full max-w-md bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500'
        : 'w-full max-w-md border-2 border-cyan-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400';
    
    const cardClasses = theme === 'escuro'
        ? 'bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700'
        : 'bg-white rounded-lg shadow-md p-6';

    const titleClasses = theme === 'escuro'
        ? 'text-purple-400 font-bold text-xl md:text-2xl lg:text-3xl mb-4'
        : 'text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4';

    const subtitleClasses = theme === 'escuro'
        ? 'text-purple-400 font-bold text-lg md:text-xl mb-4'
        : 'text-purple-600 font-bold text-lg md:text-xl mb-4';
    
    const labelTextClasses = theme === 'escuro'
        ? 'text-slate-300 text-sm md:text-base'
        : 'text-gray-700 text-sm md:text-base';

    const helperTextClasses = theme === 'escuro'
        ? 'text-sm text-slate-400'
        : 'text-sm text-gray-500';
        
    const dividerClasses = theme === 'escuro'
        ? 'w-full h-px bg-gray-700 mb-6'
        : 'w-full h-px bg-blue-400 mb-6';

    // Renderização 
    return (
        <div className={`content-box w-full ${animationClass}`}>
            
            <div className="flex justify-between items-center mb-8">
                <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl ${
                    theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                    Configurações de privacidade
                </h1>
                {/* Mensagem de Salvo */}
                {saveMessage && (
                    <span className="text-green-500 font-semibold px-3 py-1 bg-green-100/30 rounded-full">
                        {saveMessage}
                    </span>
                )}
            </div>

            <div className="space-y-8">
                {/* Visibilidade de Perfil */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Visibilidade de Perfil
                    </h2>
                    <div className={dividerClasses}></div>

                    <h3 className={subtitleClasses}>
                        Quem pode ver meu perfil
                    </h3>

                    <div className="space-y-4">
                        <select
                            value={visibilidade}
                            onChange={(e) => setVisibilidade(e.target.value)}
                            className={selectClasses}
                        >
                            <option value="Público">Público</option>
                            <option value="Privado">Privado</option>
                        </select>

                        <p className={helperTextClasses}>
                            Visibilidade atual: <span className="font-semibold">{visibilidade}</span>
                        </p>
                    </div>
                </div>

                {/* Controle Parental*/}
                {isMinor && (
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>
                            Controle Parental
                        </h2>
                        <div className={dividerClasses}></div>
                        <div className={`space-y-4 text-base md:text-lg lg:text-xl font-medium ${
                            theme === 'escuro' ? 'text-purple-400' : 'text-purple-500'
                        }`}>
                            <p>Restrições de interação social.</p>
                            <p>Relatórios de progresso enviados aos responsáveis.</p>
                        </div>
                    </div>
                )}
                {/* Fim do Controle Parental*/}

                {/* Ranking e Interações */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Ranking e interações
                    </h2>
                    <div className={dividerClasses}></div>
                    <div className="space-y-6">
                        
                        {/* Desafios */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setDesafios(!desafios)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    desafios 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${desafios ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Permitir que outros me desafiem em competições.
                            </span>
                        </div>

                        {/* Convites */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setConvites(!convites)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    convites 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${convites ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Receber ou não convites de amizade
                            </span>
                        </div>

                        {/* Progresso */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setProgresso(!progresso)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    progresso 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progresso ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Mostrar meu progresso
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}