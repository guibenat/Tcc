import React, { useState, useEffect } from 'react';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext';

// O nome do componente deve ser Notificacoes (sem acento)
export default function Notificacoes() { 
    // 2. LER O TEMA DO CONTEXTO
    const { theme } = useSettings();

    const [silenciarnotificacoes, setSilenciarNotificacoes] = useState("Nunca");
    const [frequencia, setFrequencia] = useState("Diária");
    const [horario, setHorario] = useState("Manhã");

    const [lembretediario, setLembreteDiario] = useState(true);
    const [progressoeconquista, setProgressoeConquista] = useState(true);
    const [rankingcompeticao, setRankingCompeticao] = useState(true);
    const [interacoessociais, setInteracoesSociais] = useState(true);
    const [eventosespeciais, setEventosEspeciais] = useState(false);

    // Animação de entrada
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // --- Classes de Estilo Dinâmicas ---
    const selectClasses = theme === 'escuro'
        ? 'w-full max-w-md bg-gray-700 border-2 border-gray-600 rounded-full px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500'
        : 'w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400';
    
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
        ? 'w-full h-1 bg-gray-700 mb-6'
        : 'w-full h-1 bg-green-200 mb-6';
    
    // Classe específica para o subtítulo 'Frequência'
    const freqSubtitleClasses = theme === 'escuro'
        ? 'text-purple-400 font-semibold text-lg md:text-xl mt-6 mb-4'
        : 'text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4';

    return (
        <div className={`content-box w-full ${animationClass}`}>
            {/* TÍTULO PRINCIPAL ATUALIZADO */}
            <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${
                theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
            }`}>
                Informação de Notificação
            </h1>

            <div className="space-y-8">
                {/* Seção Configurações de Envio */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Configurações de Envio
                    </h2>
                    <div className={dividerClasses}></div>

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

                    <h3 className={freqSubtitleClasses}>
                        Silenciar Notificações Por:
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={silenciarnotificacoes}
                            onChange={(e) => setSilenciarNotificacoes(e.target.value)}
                            className={selectClasses}
                        >
                            <option value="1 hora">1 hora</option>
                            <option value="8 horas">8 horas</option>
                            <option value="24 horas">24 horas</option>
                            <option value="Nunca">Nunca</option>
                        </select>
                        <p className={helperTextClasses}>
                            Configuração atual: <span className='font-semibold'>{silenciarnotificacoes}</span>
                        </p>
                    </div>
                </div>

                {/* Seção Ranking e Interações */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Ranking e interações
                    </h2>
                    <div className={dividerClasses}></div>
                    <div className="space-y-6">
                        {/* Switch 1 - Lembrete diário */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setLembreteDiario(!lembretediario)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    lembretediario 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${lembretediario ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Lembrete diário de estudos
                            </span>
                        </div>
                        {/* Switch 2 - Progresso e conquistas */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setProgressoeConquista(!progressoeconquista)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    progressoeconquista 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progressoeconquista ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Progresso e conquistas
                            </span>
                        </div>
                        {/* Switch 3 - Progresso */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setRankingCompeticao(!rankingcompeticao)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    rankingcompeticao 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${rankingcompeticao ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                Mostrar meu progresso
                            </span>
                        </div>
                         {/* Switch 4 - Interações Sociais */}
                        <div className='flex items-center gap-3 flex-wrap mt-6'>
                            <button
                                onClick={() => setInteracoesSociais(!interacoessociais)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    interacoessociais 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${interacoessociais ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className={labelTextClasses}>
                                interações sociais
                            </span>
                        </div>
                        {/* Switch 5 - Eventos Especiais */}
                        <div className='flex items-center gap-3 flex-wrap mt-6'>
                            <button
                                onClick={() => setEventosEspeciais(!eventosespeciais)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    eventosespeciais 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-400'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${eventosespeciais ? "translate-x-6" : "translate-x-0"}`}></div>
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