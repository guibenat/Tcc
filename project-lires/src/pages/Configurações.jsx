import React, { useState, useEffect } from 'react';
// REMOVIDO: import SidebarLeft

export default function ConfiguracoesPrivacidade() {
    const [visibilidade, setVisibilidade] = useState("Público");
    const [desafios, setdesafios] = useState(true);
    const [convites, setconvites] = useState(true);
    const [progresso, setprogresso] = useState(true);

    // Animação de entrada
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    return (
        // REMOVIDO: O <div min-h-screen...> e a SidebarLeft
        // ADICIONADO: O wrapper 'content-box' para animação
        <div className={`content-box w-full ${animationClass}`}>
            {/* Título principal */}
            <h1 className="text-purple-600 font-bold text-2xl md:text-3xl lg:text-5xl mb-8">
                Configurações de privacidade
            </h1>

            {/* Conteúdo principal - configurações */}
            <div className="space-y-8">
                {/* Seção Visibilidade de Perfil */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4">
                        Visibilidade de Perfil
                    </h2>
                    <div className="w-full h-1 bg-green-200 mb-6"></div>

                    <h3 className="text-purple-600 font-bold text-lg md:text-xl mb-4">
                        Quem pode ver meu perfil
                    </h3>

                    <div className="space-y-4">
                        <select
                            value={visibilidade}
                            onChange={(e) => setVisibilidade(e.target.value)}
                            className="w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="Público">Público</option>
                            <option value="Privado">Privado</option>
                        </select>

                        <p className="text-sm text-gray-500">
                            Visibilidade atual: <span className="font-semibold">{visibilidade}</span>
                        </p>
                    </div>
                </div>

                {/* Seção Controle Parental */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-purple-600 text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                        Controle Parental
                    </h2>
                    <div className="w-full h-1 bg-green-200 mb-6"></div>
                    <div className="space-y-4 text-purple-500 text-base md:text-lg lg:text-xl font-medium">
                        <p>Restrições de interação social.</p>
                        <p>Relatórios de progresso enviados aos responsáveis.</p>
                    </div>
                </div>

                {/* Seção Ranking e Interações */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-purple-600 text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                        Ranking e interações
                    </h2>
                    <div className="w-full h-1 bg-green-200 mb-6"></div>
                    <div className="space-y-6">
                        {/* Switch 1 - Desafios */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setdesafios(!desafios)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-300 transition-colors duration-300 flex-shrink-0 ${desafios ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${desafios ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className="text-gray-700 text-sm md:text-base">
                                Permitir que outros me desafiem em competições.
                            </span>
                        </div>
                        {/* Switch 2 - Convites */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setconvites(!convites)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${convites ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${convites ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className="text-gray-700 text-sm md:text-base">
                                Receber ou não convites de amizade
                            </span>
                        </div>
                        {/* Switch 3 - Progresso */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setprogresso(!progresso)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${progresso ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progresso ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className="text-gray-700 text-sm md:text-base">
                                Mostrar meu progresso
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}