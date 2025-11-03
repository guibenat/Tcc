import React, { useState, useEffect } from 'react';
import MeninoPerfil from '../assets/MeninoPerfilPostar.png';
// 1. IMPORTAR O HOOK DE CONFIGURAÇÕES
import { useSettings } from '../components/SettingsContext'; 

export default function GerenciamentoConta() { 
    // 2. LER O TEMA DO CONTEXTO
    const { theme } = useSettings();

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

    // --- Classes de Estilo Dinâmicas ---
    // (Classes para inputs e selects)
    const inputClasses = theme === 'escuro'
        ? 'bg-gray-700 border-2 border-gray-600 rounded-full px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500'
        : 'border-2 border-green-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400';
    
    // (Classes para os cards brancos/cinzas)
    const cardClasses = theme === 'escuro'
        ? 'bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700'
        : 'bg-white rounded-lg shadow-md p-6';

    // (Classes para os títulos principais dos cards)
    const titleClasses = theme === 'escuro'
        ? 'text-purple-400 font-bold text-xl md:text-2xl lg:text-3xl mb-4'
        : 'text-purple-600 font-bold text-xl md:text-2xl lg:text-3xl mb-4';

    // (Classes para os subtítulos dos cards)
    const subtitleClasses = theme === 'escuro'
        ? 'text-purple-400 font-bold text-lg md:text-xl mb-4'
        : 'text-purple-600 font-bold text-lg md:text-xl mb-4';
    
    // (Classes para o texto dos toggles/labels)
    const labelTextClasses = theme === 'escuro'
        ? 'text-slate-300 text-sm md:text-base'
        : 'text-gray-700 text-sm md:text-base';

    // (Classes para o texto de ajuda (ex: 'Email Digitado:'))
    const helperTextClasses = theme === 'escuro'
        ? 'text-sm text-slate-400 mt-2'
        : 'text-sm text-gray-500 mt-2';
        
    // (Classes para a linha divisória)
    const dividerClasses = theme === 'escuro'
        ? 'w-full h-1 bg-gray-700 mb-6'
        : 'w-full h-1 bg-green-200 mb-6';

    return (
        // Container da animação
        <div className={`content-box w-full ${animationClass}`}>
            {/* Título principal */}
            <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${
                theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
            }`}>
                Gerenciamento de Conta
            </h1>

            {/* Conteúdo principal - configurações */}
            <div className="space-y-8">
                {/* Seção Visibilidade de Perfil */}
                <div className={cardClasses}>
                    <h2 className={titleClasses}>
                        Informações Pessoais
                    </h2>
                    <div className={dividerClasses}></div>
                    <h3 className={subtitleClasses}>
                        Avatar
                    </h3>
                    <img src={MeninoPerfil} alt="Avatar do Usuário" className="w-18 h-14 rounded-full mb-4 " />

                    <h3 className={subtitleClasses}>
                        Horario preferido para lembretes 
                    </h3>

                    <div className="space-y-3">
                        <div>
                            <h3 className={subtitleClasses}>
                                Nome
                            </h3>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite seu nome"
                                className={`w-full max-w-md ${inputClasses}`}
                            />
                            <p className={helperTextClasses}>
                                Nome digitado: <span className="font-semibold">{nome}</span>
                            </p>
                        </div>
                    </div>

                    <h3 className={`${subtitleClasses} mt-6 mb-4`}>
                        Frequência
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h3 className={subtitleClasses}>
                                Email
                            </h3>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email"
                                className={`w-full max-w-md ${inputClasses}`}
                            />
                            <p className={helperTextClasses}>
                                Email Digitado: <span className="font-semibold">{email}</span>
                            </p>
                        </div>
                    </div>

                    <h3 className={`${subtitleClasses} mt-6 mb-4`}>
                        Silenciar Notificações Por:
                    </h3>
                    <div className="space-y-4">
                        <select
                            value={silenciarnotificacoes}
                            onChange={(e) => setSilenciarNotificacoes(e.target.value)}
                            className={`w-full max-w-md ${inputClasses}`}>
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
                        {/* Switch 3 - Ranking e competição */}
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