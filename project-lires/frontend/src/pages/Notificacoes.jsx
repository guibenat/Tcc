import React, { useState, useEffect } from 'react';
// Puxo o hook de configurações para acessar o tema e o usuário logado
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: Notificacoes
 * Lida com as preferências de notificação do usuário (frequência, horário e tipos).
 */
export default function Notificacoes() { 
    const { theme } = useSettings();

    // --- Estados para Seletores ---
    const [silenciarNotificacoes, setSilenciarNotificacoes] = useState("Nunca");
    const [frequencia, setFrequencia] = useState("Diária");
    const [horario, setHorario] = useState("Manhã");

    // --- Estados para Switches (Tipos de Notificação) ---
    const [lembreteDiario, setLembreteDiario] = useState(true);
    const [progressoEConquista, setProgressoeConquista] = useState(true);
    const [rankingCompeticao, setRankingCompeticao] = useState(true);
    const [interacoesSociais, setInteracoesSociais] = useState(true);
    const [eventosEspeciais, setEventosEspeciais] = useState(false);

    // --- Estados de UI/Fluxo ---
    const [animationClass, setAnimationClass] = useState('');
    const [saveMessage, setSaveMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Flag para evitar salvar no carregamento inicial

    // --- 1. useEffect: Carregar Configurações Salvas ---
    useEffect(() => {
        setAnimationClass('anim-enter');
        
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            const settings = user.notificationSettings; // Pega o objeto de configurações
            
            if (settings) {
                // Carrega todos os estados salvos
                setSilenciarNotificacoes(settings.silenciar || "Nunca");
                setFrequencia(settings.frequencia || "Diária");
                setHorario(settings.horario || "Manhã");
                setLembreteDiario(settings.lembreteDiario ?? true);
                setProgressoeConquista(settings.progressoeconquista ?? true);
                setRankingCompeticao(settings.rankingcompeticao ?? true);
                setInteracoesSociais(settings.interacoessociais ?? true);
                setEventosEspeciais(settings.eventosespeciais ?? false);
            }
        }
        setIsLoading(false); // Libera o auto-save
    }, []);

    // --- 2. useEffect: Auto-Salvamento no localStorage ---
    useEffect(() => {
        // Não salva na primeira vez que a página carrega
        if (isLoading) return; 

        console.log("Salvando configurações de notificação automaticamente...");

        const userString = localStorage.getItem('currentUser');
        const dbString = localStorage.getItem('liresUsersDB');
        if (!userString || !dbString) return; 

        const currentUser = JSON.parse(userString);
        const liresUsersDB = JSON.parse(dbString);

        // 1. Cria o objeto de configurações atual
        const notificationSettings = {
            silenciar: silenciarNotificacoes,
            frequencia: frequencia,
            horario: horario,
            lembreteDiario: lembreteDiario,
            progressoeconquista: progressoEConquista,
            rankingcompeticao: rankingCompeticao,
            interacoessociais: interacoesSociais,
            eventosespeciais: eventosEspeciais,
        };

        // 2. Atualiza o usuário no DB
        const updatedUser = { 
            ...currentUser, 
            notificationSettings: notificationSettings 
        };
        
        const updatedDB = liresUsersDB.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        // 3. Persiste no localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));

        // 4. Mostra feedback e limpa
        setSaveMessage("Salvo!");
        const timer = setTimeout(() => setSaveMessage(''), 2000); 
        return () => clearTimeout(timer); 

    }, [ // Este array de dependências garante que qualquer mudança dispare o save
        silenciarNotificacoes, frequencia, horario, 
        lembreteDiario, progressoEConquista, rankingCompeticao, 
        interacoesSociais, eventosEspeciais, isLoading
    ]);

    // --- Classes de Estilo Dinâmicas ---
    const selectClasses = theme === 'escuro'
        ? 'w-full max-w-md bg-gray-700 border-2 border-gray-600 rounded-full px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500'
        : 'w-full max-w-md border-2 border-cyan-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400';
    
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
    
    const freqSubtitleClasses = theme === 'escuro'
        ? 'text-purple-400 font-semibold text-lg md:text-xl mt-6 mb-4'
        : 'text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4';

    // --- Renderização ---
    return (
        <div className={`content-box w-full ${animationClass}`}>
            {/* TÍTULO PRINCIPAL E FEEDBACK DE SALVAR */}
            <div className="flex justify-between items-center mb-8">
                <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl ${
                    theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                    Informação de Notificação
                </h1>
                {/* Mensagem de Salvo */}
                {saveMessage && (
                    <span className="text-green-500 font-semibold px-3 py-1 bg-green-100/30 rounded-full">
                        {saveMessage}
                    </span>
                )}
            </div>

            <div className="space-y-8">
                {/* Seção 1: Configurações de Envio (Horário, Frequência, Silenciar) */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Configurações de Envio
                    </h2>
                    <div className={dividerClasses}></div>

                    {/* Horário preferido */}
                    <h3 className={subtitleClasses}>
                        Horario preferido para lembretes
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            className={selectClasses}
                        >
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                        <p className={helperTextClasses}>
                            Horário atual: <span className='font-semibold'>{horario}</span>
                        </p>
                    </div>

                    {/* Frequência */}
                    <h3 className={freqSubtitleClasses}>
                        Frequência
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={frequencia}
                            onChange={(e) => setFrequencia(e.target.value)}
                            className={selectClasses}
                        >
                            <option value="Diária">Diária</option>
                            <option value="Semanal">Semanal</option>
                        </select>
                        <p className={helperTextClasses}>
                            Visibilidade atual: <span className="font-semibold">{frequencia}</span>
                        </p>
                    </div>

                    {/* Silenciar por... */}
                    <h3 className={freqSubtitleClasses}>
                        Silenciar Notificações Por:
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={silenciarNotificacoes}
                            onChange={(e) => setSilenciarNotificacoes(e.target.value)}
                            className={selectClasses}
                        >
                            <option value="1 hora">1 hora</option>
                            <option value="8 horas">8 horas</option>
                            <option value="24 horas">24 horas</option>
                            <option value="Nunca">Nunca</option>
                        </select>
                        <p className={helperTextClasses}>
                            Configuração atual: <span className='font-semibold'>{silenciarNotificacoes}</span>
                        </p>
                    </div>
                </div>

                {/* Seção 2: Tipos de Notificação (Switches) */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Tipos de Notificação
                    </h2>
                    <div className={dividerClasses}></div>
                    <div className="space-y-6">
                        
                        {/* Switch 1 - Lembrete diário */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setLembreteDiario(!lembreteDiario)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    lembreteDiario 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${lembreteDiario ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Lembrete diário de estudos
                            </span>
                        </div>

                        {/* Switch 2 - Progresso e conquistas */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setProgressoeConquista(!progressoEConquista)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    progressoEConquista 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progressoEConquista ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Progresso e conquistas
                            </span>
                        </div>

                        {/* Switch 3 - Ranking e Competição */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setRankingCompeticao(!rankingCompeticao)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    rankingCompeticao 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${rankingCompeticao ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Notificações de Ranking e Competição
                            </span>
                        </div>

                        {/* Switch 4 - Interações Sociais */}
                        <div className='flex items-center gap-3 flex-wrap mt-6'>
                            <button
                                onClick={() => setInteracoesSociais(!interacoesSociais)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    interacoesSociais 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${interacoesSociais ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Interações sociais (curtidas, comentários)
                            </span>
                        </div>

                        {/* Switch 5 - Eventos Especiais */}
                        <div className='flex items-center gap-3 flex-wrap mt-6'>
                            <button
                                onClick={() => setEventosEspeciais(!eventosEspeciais)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    eventosEspeciais 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-cyan-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${eventosEspeciais ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Eventos especiais
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}