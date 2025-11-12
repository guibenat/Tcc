import React, { useState, useEffect } from 'react';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext'; 

// --- INÍCIO DA MODIFICAÇÃO (Helper para Idade) ---
// Função para calcular a idade a partir da string DD/MM/AAAA
const calculateAge = (dateString) => {
    if (!dateString || dateString.length < 10) return null; // Retorna nulo se a data for inválida
    
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês no JS começa em 0
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
// --- FIM DA MODIFICAÇÃO ---

export default function ConfiguracoesPrivacidade() {
    const { theme } = useSettings();

    // --- INÍCIO DA MODIFICAÇÃO (Estados) ---
    const [visibilidade, setVisibilidade] = useState("Público");
    const [desafios, setDesafios] = useState(true); // Nome corrigido
    const [convites, setConvites] = useState(true); // Nome corrigido
    const [progresso, setProgresso] = useState(true); // Nome corrigido

    const [isMinor, setIsMinor] = useState(false); // Novo estado para idade
    const [animationClass, setAnimationClass] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [saveMessage, setSaveMessage] = useState('');
    // --- FIM DA MODIFICAÇÃO ---

    // --- INÍCIO DA MODIFICAÇÃO (useEffect para Carregar) ---
    useEffect(() => {
        setAnimationClass('anim-enter');
        
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            const settings = user.privacySettings;
            
            if (settings) {
                setVisibilidade(settings.visibilidade || "Público");
                setDesafios(settings.desafios ?? true);
                setConvites(settings.convites ?? true);
                setProgresso(settings.progresso ?? true);
            }

            // Verifica a idade
            if (user.dataNascimento) {
                const age = calculateAge(user.dataNascimento);
                if (age !== null && age < 16) {
                    setIsMinor(true);
                } else {
                    setIsMinor(false);
                }
            } else {
                setIsMinor(false); // Se não tem data, não é menor
            }
        }
        setIsLoading(false); 
    }, []);
    // --- FIM DA MODIFICAÇÃO ---

    // --- INÍCIO DA MODIFICAÇÃO (useEffect para Salvar) ---
    useEffect(() => {
        if (isLoading) return; 

        console.log("Salvando configurações de privacidade...");

        const userString = localStorage.getItem('currentUser');
        const dbString = localStorage.getItem('liresUsersDB');
        if (!userString || !dbString) return; 

        const currentUser = JSON.parse(userString);
        const liresUsersDB = JSON.parse(dbString);

        const privacySettings = {
            visibilidade: visibilidade,
            desafios: desafios,
            convites: convites,
            progresso: progresso,
        };

        const updatedUser = { 
            ...currentUser, 
            privacySettings: privacySettings 
        };
        
        const updatedDB = liresUsersDB.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));

        setSaveMessage("Salvo!");
        const timer = setTimeout(() => setSaveMessage(''), 2000); 
        return () => clearTimeout(timer); 

    }, [ 
        visibilidade, desafios, convites, progresso, isLoading
    ]);
    // --- FIM DA MODIFICAÇÃO ---

    // --- Classes de Estilo Dinâmicas (Corrigidas para 'cyan') ---
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
                {/* Seção Visibilidade de Perfil */}
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

                {/* --- INÍCIO DA MODIFICAÇÃO (Controle Parental Condicional) --- */}
                {/* Este card só aparece se 'isMinor' for verdadeiro */}
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
                {/* --- FIM DA MODIFICAÇÃO --- */}

                {/* Seção Ranking e Interações */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Ranking e interações
                    </h2>
                    <div className={dividerClasses}></div>
                    <div className="space-y-6">
                        {/* Switch 1 - Desafios */}
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
                        {/* Switch 2 - Convites */}
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
                        {/* Switch 3 - Progresso */}
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