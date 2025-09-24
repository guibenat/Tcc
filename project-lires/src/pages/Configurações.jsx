import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';


export default function Configuracoes() {
    const [visibilidade, setVisibilidade] = useState("Público");
    const [desafios, setdesafios] = useState(true);
    const [convites, setconvites] = useState(true);
    const [progresso, setprogresso] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-row ">
            {/* Sidebar fixo à esquerda */}
            <SidebarLeft />

            {/* Conteúdo principal com margem para o sidebar esquerdo e direito */}
            <div className="ml-96 xl:mr-80 p-4 lg:p-8 flex-1">
                {/* Título principal */}
                <h1 className="text-purple-600 font-bold text-2xl md:text-3xl lg:text-5xl mb-8 " >
                    Configurações de privacidade
                </h1>

                {/* Conteúdo principal - configurações ocupando todo espaço */}
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
                                    className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-300 transition-colors duration-300 flex-shrink-0 ${desafios ? "bg-purple-500" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${desafios ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></div>
                                </button>
                                <span className="text-gray-700 text-sm md:text-base">
                                    Permitir que outros me desafiem em competições.
                                </span>
                            </div>

                            {/* Switch 2 - Convites */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => setconvites(!convites)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${convites ? "bg-purple-500" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${convites ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></div>
                                </button>
                                <span className="text-gray-700 text-sm md:text-base">
                                    Receber ou não convites de amizade
                                </span>
                            </div>

                            {/* Switch 3 - Progresso */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => setprogresso(!progresso)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 border-2 border-green-400 transition-colors duration-300 flex-shrink-0 ${progresso ? "bg-purple-500" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progresso ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    ></div>
                                </button>
                                <span className="text-gray-700 text-sm md:text-base">
                                    Mostrar meu progresso
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar direita em mobile - aparece abaixo do conteúdo */}
                <div className="xl:hidden mt-8 space-y-8">
                    {/* Menu Conta */}
                    <div className="bg-white border-2 border-purple-400 rounded-3xl p-6">
                        <h2 className="text-purple-600 text-xl md:text-2xl font-semibold mb-6">
                            Conta
                        </h2>

                        <nav className="space-y-3">
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm md:text-base">
                                Gerenciamento da conta
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm md:text-base">
                                Preferências
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm md:text-base">
                                Segurança
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm md:text-base">
                                Notificações
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium bg-purple-100 p-2 rounded text-sm md:text-base">
                                Configurações de privacidade
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm md:text-base">
                                Encerramento
                            </button>
                        </nav>

                        <button className="w-full mt-6 border-2 border-purple-400 rounded-3xl py-3 text-purple-600 text-lg md:text-xl font-bold hover:bg-purple-50 transition-colors">
                            Sair
                        </button>
                    </div>

                    {/* Card Assinatura */}
                    <div className="bg-gradient-to-br from-purple-700/70 to-blue-200/40 backdrop-blur-md border-2 border-purple-500 rounded-3xl p-6 text-center">
                        <div className="space-y-6">
                            <h3
                                className="text-xs md:text-sm font-black text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #ffde59, #FFFFFF, #ffde59, #7a6200)",
                                    backgroundSize: "300% 300%",
                                    animation: "gradientMove 15s ease infinite",
                                    textShadow: "0 0 20px rgba(123, 104, 238, 0.7)",
                                }}
                            >
                                STATUS DA ASSINATURA
                            </h3>

                            <h2
                                className="text-xl md:text-2xl font-bold text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #8100c6, #ffd2fd, #1E90FF, #c700ff)",
                                    backgroundSize: "300% 300%",
                                    animation: "gradientMove 15s ease infinite",
                                    textShadow: "0 0 20px rgba(123, 104, 238, 0.7)",
                                }}
                            >
                                TRIMESTRAL
                            </h2>

                            <h3
                                className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #8100c6, #ffd2fd, #1E90FF, #c700ff)",
                                    backgroundSize: "300% 300%",
                                    animation: "gradientMove 15s ease infinite",
                                    textShadow: "0 0 20px rgba(123, 104, 238, 0.7)",
                                }}
                            >
                                R$42,90
                            </h3>

                            <button className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-bold rounded-full border-2 border-purple-400 shadow-md py-2 px-6 hover:from-purple-500 hover:to-purple-600 transition-all text-sm md:text-base">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar direita - FIXO À DIREITA (apenas desktop xl+) */}
            <div className="hidden xl:flex xl:fixed xl:right-0 xl:top-0 xl:w-80 xl:h-screen xl:bg-gray-50 xl:p-3 xl:pt-0 ">
                <div className="w-full space-y-2 xl:mt-4">
                    {/* Menu Conta */}
                    <div className="bg-white border-2 border-purple-400 rounded-3xl p-4">
                        <h2 className="text-purple-600 text-xl font-semibold mb-6">
                            Conta
                        </h2>

                        <nav className="space-y-3">
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Gerenciamento da conta
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Preferências
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Segurança
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Notificações
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium bg-purple-100 p-2 rounded text-sm">
                                Configurações de privacidade
                            </button>
                            <button className="block w-full text-left text-purple-600 font-medium hover:bg-purple-50 p-2 rounded transition-colors text-sm">
                                Encerramento
                            </button>
                        </nav>

                        <button className="w-full mt-6 border-2 border-purple-400 rounded-3xl py-3 text-purple-600 text-lg font-bold hover:bg-purple-50 transition-colors">
                            Sair
                        </button>
                    </div>

                    {/* Card Assinatura */}
                    <div className="bg-gradient-to-br from-purple-700/70 to-blue-200/40 backdrop-blur-md border-2 border-purple-500 rounded-3xl p-6 text-center">
                        <div className="space-y-6">
                            <h3
                                className="text-xs font-black text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #ffde59, #FFFFFF, #ffde59, #7a6200)",
                                    backgroundSize: "300% 300%",
                                    animation: "gradientMove 15s ease infinite",
                                    textShadow: "0 0 20px rgba(123, 104, 238, 0.7)",
                                }}
                            >
                                STATUS DA ASSINATURA
                            </h3>

                            <h2
                                className="text-4xl font-bold text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #8100c6, #ae00bd,  #005dfa, #347fff, #bf64ff)",
                                    backgroundSize: "300% 300%",
                                    animation: "gradientMove 15s ease infinite",
                                    textShadow: "0 0 20px rgba(123, 104, 238, 0.7)",
                                }}
                            >
                                TRIMESTRAL
                            </h2>

                            <h3
                                className="text-3xl font-semibold text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #8100c6, #ae00bd,  #005dfa, #347fff, #bf64ff)",
                                    backgroundSize: "300% 300%",
                                    animation: "gradientMove 15s ease infinite",
                                    textShadow: "0 0 20px rgba(123, 104, 238, 0.7)",
                                }}
                            >
                                R$42,90
                            </h3>

                            <button className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-bold rounded-full border-2 border-purple-400 shadow-md py-2 px-6 hover:from-purple-500 hover:to-purple-600 transition-all text-sm">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}