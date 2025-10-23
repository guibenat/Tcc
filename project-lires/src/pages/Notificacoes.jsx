import React, { useState, useEffect } from 'react';
// REMOVIDO: import SidebarLeft

// O nome do componente deve ser Notificacoes (sem acento)
export default function Notificacoes() { 
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

    return (
        // REMOVIDO: O <div min-h-screen...> e a SidebarLeft
        // ADICIONADO: O wrapper 'content-box' para animação
        <div className={`content-box w-full ${animationClass}`}>
            <h1 className="text-purple-600 font-bold text-2xl md:text-3xl lg:text-5xl mb-8">
                Informação de Notificação
            </h1>

            <div className="space-y-8">
                {/* Seção Configurações de Envio */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4">
                        Configurações de Envio
                    </h2>
                    <div className="w-full h-1 bg-green-200 mb-6"></div>

                    <h3 className="text-purple-600 font-bold text-lg md:text-xl mb-4">
                        Horario preferido para lembretes 
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            className='w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400'
                        >
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                        <p className='text-sm text-gray-500'>
                            Horário atual: <span className='font-semibold'>{horario}</span>
                        </p>
                    </div>

                    <h3 className="text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4">
                        Frequência
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={frequencia}
                            onChange={(e) => setFrequencia(e.target.value)}
                            className="w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="Diária">Diária</option>
                            <option value="Semanal">Semanal</option>
                        </select>
                        <p className="text-sm text-gray-500">
                            Visibilidade atual: <span className="font-semibold">{frequencia}</span>
                        </p>
                    </div>

                    <h3 className="text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4">
                        Silenciar Notificações Por:
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={silenciarnotificacoes}
                            onChange={(e) => setSilenciarNotificacoes(e.target.value)}
                            className='w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400'>
                            <option value="1 hora">1 hora</option>
                            <option value="8 horas">8 horas</option>
                            <option value="24 horas">24 horas</option>
                            <option value="Nunca">Nunca</option>
                        </select>
                        <p className='text-sm text-gray-500'>
                            Configuração atual: <span className='font-semibold'>{silenciarnotificacoes}</span>
                        </p>
                    </div>
                </div>

                {/* Seção Ranking e Interações */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-purple-600 text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                        Ranking e interações
                    </h2>
                    <div className="w-full h-1 bg-green-200 mb-6"></div>
                    <div className="space-y-6">
                        {/* Switch 1 - Lembrete diário */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setLembreteDiario(!lembretediario)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-300 transition-colors duration-300 flex-shrink-0 ${lembretediario ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${lembretediario ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className="text-gray-700 text-sm md:text-base">
                                Lembrete diário de estudos
                            </span>
                        </div>
                        {/* Switch 2 - Progresso e conquistas */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setProgressoeConquista(!progressoeconquista)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${progressoeconquista ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progressoeconquista ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className="text-gray-700 text-sm md:text-base">
                                Progresso e conquistas
                            </span>
                        </div>
                        {/* Switch 3 - Progresso */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setRankingCompeticao(!rankingcompeticao)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${rankingcompeticao ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${rankingcompeticao ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className="text-gray-700 text-sm md:text-base">
                                Mostrar meu progresso
                            </span>
                        </div>
                         {/* Switch 4 - Interações Sociais */}
                        <div className='flex items-center gap-3 flex-wrap mt-6'>
                            <button
                                onClick={() => setInteracoesSociais(!interacoessociais)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${interacoessociais ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${interacoessociais ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className='text-gray-700 text-sm md:text-base'>
                                interações sociais
                            </span>
                        </div>
                        {/* Switch 5 - Eventos Especiais */}
                        <div className='flex items-center gap-3 flex-wrap mt-6'>
                            <button
                                onClick={() => setEventosEspeciais(!eventosespeciais)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${eventosespeciais ? "bg-purple-500" : "bg-gray-300"}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${eventosespeciais ? "translate-x-6" : "translate-x-0"}`}></div>
                            </button>
                            <span className='text-gray-700 text-sm md:text-base'>
                                Eventos especiais
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}