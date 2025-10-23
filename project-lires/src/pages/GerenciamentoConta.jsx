import React, { useState, useEffect } from 'react';
import MeninoPerfil from '../assets/MeninoPerfilPostar.png';
// REMOVIDO: import SidebarLeft from '../components/SidebarLeft';

export default function GerenciamentoConta() { // Nome corrigido
    const [silenciarnotificacoes, setSilenciarNotificacoes] = useState("Nunca");
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
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
        // Container da animação
        <div className={`content-box w-full ${animationClass}`}>
            {/* Título principal */}
            <h1 className="text-purple-600 font-bold text-2xl md:text-3xl lg:text-5xl mb-8">
                Gerenciamento de Conta
            </h1>

            {/* Conteúdo principal - configurações */}
            <div className="space-y-8">
                {/* Seção Visibilidade de Perfil */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4">
                        Informações Pessoais
                    </h2>
                    <div className="w-full h-1 bg-green-200 mb-6"></div>
                    <h3 className="text-purple-600 font-bold text-lg md:text-xl mb-4 -mt-4">
                        Avatar
                    </h3>
                    <img src={MeninoPerfil} alt="Avatar do Usuário" className="w-18 h-14 rounded-full mb-4 " />

                    <h3 className="text-purple-600 font-bold text-lg md:text-xl mb-4">
                        Horario preferido para lembretes 
                    </h3>

                    <div className="space-y-3">
                        <div>
                            <h3 className="text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4">
                                Nome
                            </h3>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite seu nome"
                                className="w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Nome digitado: <span className="font-semibold">{nome}</span>
                            </p>
                        </div>
                    </div>

                    <h3 className="text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4">
                        Frequência
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-purple-600 font-semibold text-lg md:text-xl mt-6 mb-4">
                                Email
                            </h3>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu nome"
                                className="w-full max-w-md border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Email Digitado: <span className="font-semibold">{email}</span>
                            </p>
                        </div>
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
                        {/* Switch 3 - Ranking e competição */}
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