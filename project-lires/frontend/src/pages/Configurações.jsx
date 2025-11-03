import React, { useState, useEffect } from 'react';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext'; 

export default function ConfiguracoesPrivacidade() {
    // 2. LER O TEMA DO CONTEXTO
    const { theme } = useSettings();

    const [visibilidade, setVisibilidade] = useState("Público");
    const [desafios, setdesafios] = useState(true);
    const [convites, setconvites] = useState(true);
    const [progresso, setprogresso] = useState(true);

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

    return (
        <div className={`content-box w-full ${animationClass}`}>
            {/* Título principal ATUALIZADO */}
            <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${
                theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
            }`}>
                Configurações de privacidade
            </h1>

            <div className="space-y-8">
                {/* Seção Visibilidade de Perfil ATUALIZADA */}
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

                {/* Seção Controle Parental ATUALIZADA */}
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

                {/* Seção Ranking e Interações ATUALIZADA */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Ranking e interações
                    </h2>
                    <div className={dividerClasses}></div>
                    <div className="space-y-6">
                        {/* Switch 1 - Desafios */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setdesafios(!desafios)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    desafios 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-300'}`}
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
                                onClick={() => setconvites(!convites)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    convites 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-400'}`}
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
                                onClick={() => setprogresso(!progresso)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                    progresso 
                                    ? "bg-purple-500" 
                                    : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-green-400'}`}
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