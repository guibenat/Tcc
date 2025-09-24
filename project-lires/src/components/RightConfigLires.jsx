import React from 'react';

const SidebarRight = () => {
    return (
        <>
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

            {/* CSS para a animação do gradiente */}
            <style jsx>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </>
    );
};

// Componente para versão mobile que aparece abaixo do conteúdo
export const SidebarRightMobile = () => {
    return (
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

            {/* CSS para a animação do gradiente */}
            <style jsx>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default SidebarRight;