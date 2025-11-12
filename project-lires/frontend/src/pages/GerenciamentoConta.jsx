import React, { useState, useEffect } from 'react';
import Perfil from '../assets/Perfil.png'; // Importado como fallback
import { useSettings } from '../components/SettingsContext'; 
import { useNavigate } from 'react-router-dom'; 

// --- Função de Avatar e Lista de "Sementes" (Sem alteração) ---
const AVATAR_STYLE = 'bottts-neutral'; 

const avatarSeeds = [
    'caua', 'maria', 'joao', 'ana', 'pedro', 'lucas', 'bia', 'leo', 
    'sofia', 'davi', 'gato', 'sol', 'lua', 'happy', 'smile', 'code', 
    'book', 'game', 'music', 'art'
];

const getAvatarUrl = (seed, style = AVATAR_STYLE) => { 
    if (!seed) {
        return Perfil; 
    }
    const colorPalette = [
        'f0d3f7', 'c0aede', 'd1d4f9', 'fde047', 'a78bfa',
        '7c3aed', '4ade80', '2dd4bf', 'fb7185', 'f97316'
    ].join(',');
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};
// --- FIM ---


// --- Componente: O Modal de Seleção (AvatarPickerModal) (Sem alteração) ---
const AvatarPickerModal = ({ isOpen, onClose, onSelect, currentSeed, theme }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className={`w-full max-w-2xl rounded-2xl shadow-xl flex flex-col ${
                    theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
                }`}
                onClick={e => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-purple-500">Escolha seu Avatar</h3>
                    <button 
                        onClick={onClose}
                        className={`text-2xl font-bold transition-colors ${
                            theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'
                        }`}
                    >
                        &times;
                    </button>
                </div>
                
                {/* Grid de Avatares */}
                <div className="max-h-[70vh] overflow-y-auto p-4">
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                        {avatarSeeds.map(seed => {
                            const isSelected = seed === currentSeed;
                            return (
                                <button
                                    key={seed}
                                    onClick={() => onSelect(seed)}
                                    className={`rounded-full p-1 transition-all duration-200 ${
                                        isSelected 
                                        ? 'ring-4 ring-purple-500' 
                                        : 'ring-0 hover:ring-4 hover:ring-purple-300'
                                    }`}
                                >
                                    <img 
                                        src={getAvatarUrl(seed, AVATAR_STYLE)} 
                                        alt={`Avatar ${seed}`}
                                        className="w-full h-full rounded-full bg-white"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
// --- FIM ---


export default function GerenciamentoConta() { 
    const { theme } = useSettings();
    const navigate = useNavigate(); 

    const [silenciarnotificacoes, setSilenciarNotificacoes] = useState("Nunca");
    
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [saveMessage, setSaveMessage] = useState(''); 
    
    const [avatarSeed, setAvatarSeed] = useState('caua0001'); 
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    
    const [lembretediario, setLembreteDiario] = useState(true);
    const [progressoeconquista, setProgressoeConquista] = useState(true);
    const [rankingcompeticao, setRankingCompeticao] = useState(true);
    const [interacoessociais, setInteracoesSociais] = useState(true);
    const [eventosespeciais, setEventosEspeciais] = useState(false);

    const [animationClass, setAnimationClass] = useState('');

    // useEffect (Sem alteração)
    useEffect(() => {
        setAnimationClass('anim-enter');
        
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            setNome(user.name || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setAvatarSeed(user.avatarSeed || user.username); 
        }
    }, []);
    
    // --- INÍCIO DA CORREÇÃO (Função Salvar) ---
    const handleSave = () => {
        const userString = localStorage.getItem('currentUser');
        // --- ERRO CORRIGIDO AQUI ---
        const dbString = localStorage.getItem('liresUsersDB'); // <-- 'liresUsersDB' (L minúsculo)
        
        if (!userString || !dbString) {
            setSaveMessage("Erro: Não foi possível encontrar os dados do usuário.");
            return;
        }

        const currentUser = JSON.parse(userString);
        // --- ERRO CORRIGIDO AQUI ---
        const liresUsersDB = JSON.parse(dbString); // <-- O parse já estava certo

        // Atualiza os dados do usuário
        const updatedUser = { 
            ...currentUser, 
            name: nome, 
            username: username,
            avatarSeed: avatarSeed, 
            avatarStyle: AVATAR_STYLE 
        };

        // Atualiza o banco de dados
        const updatedDB = liresUsersDB.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        // Salva de volta no localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        // --- ERRO CORRIGIDO AQUI ---
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB)); // <-- 'liresUsersDB' (L minúsculo)

        setSaveMessage('Alterações salvas com sucesso!');
        setTimeout(() => setSaveMessage(''), 3000); 

    };
    // --- FIM DA CORREÇÃO ---

    // --- Classes de Estilo Dinâmicas (Sem alteração) ---
    const inputClasses = theme === 'escuro'
        ? 'bg-gray-700 border-2 border-gray-600 rounded-full px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500' 
        : 'border-2 border-purple-400 rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400'; 
    
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
        ? 'text-sm text-slate-400 mt-2'
        : 'text-sm text-gray-500 mt-2';
            
    const dividerClasses = theme === 'escuro'
        ? 'w-full h-px bg-gray-700 mb-6' 
        : 'w-full h-px bg-purple-200 mb-6'; 

    return (
        <>
            <AvatarPickerModal
                isOpen={showAvatarModal}
                onClose={() => setShowAvatarModal(false)}
                theme={theme}
                currentSeed={avatarSeed}
                onSelect={(seed) => {
                    setAvatarSeed(seed); 
                    setShowAvatarModal(false); 
                }}
            />

            <div className={`content-box w-full ${animationClass}`}>
                <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${
                    theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                    Gerenciamento de Conta
                </h1>

                <div className="space-y-8">
                    {/* --- Card de Informações Pessoais (Sem alteração) --- */}
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>
                            Informações Pessoais
                        </h2>
                        <div className={dividerClasses}></div>
                        
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <h3 className={subtitleClasses}>
                                    Avatar
                                </h3>
                                <button
                                    onClick={() => setShowAvatarModal(true)} 
                                    className="rounded-full relative group"
                                >
                                    <img 
                                        src={getAvatarUrl(avatarSeed, AVATAR_STYLE)} 
                                        alt="Avatar do Usuário" 
                                        className="w-32 h-32 rounded-full mb-4 bg-white" 
                                    />
                                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span role="img" aria-label="Editar" className="text-4xl">✏️</span>
                                    </div>
                                </button>
                                <p className={helperTextClasses}>
                                    Clique no avatar para escolher.
                                </p>
                            </div>

                            <div className="flex-grow w-full">
                                <div>
                                    <h3 className={subtitleClasses}>
                                        Nome (como aparece no perfil)
                                    </h3>
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Digite seu nome"
                                        className={`w-full max-w-md ${inputClasses}`}
                                    />
                                </div>
                                <div className="mt-6">
                                    <h3 className={subtitleClasses}>
                                        @Username (para login)
                                    </h3>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Digite seu @username"
                                        className={`w-full max-w-md ${inputClasses}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <button
                                onClick={handleSave}
                                className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-600 transition-colors"
                            >
                                Salvar Alterações
                            </button>
                            {saveMessage && (
                                <p className={`text-sm ${saveMessage.startsWith('Erro') ? 'text-red-500' : 'text-green-500'}`}>{saveMessage}</p>
                            )}
                        </div>
                    </div>

                    {/* Seção Notificações (Sem alterações) */}
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>
                            Notificações
                        </h2>
                        <div className={dividerClasses}></div>

                        <h3 className={`${subtitleClasses} mt-6 mb-4`}>
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

                        <h3 className={`${subtitleClasses} mt-6 mb-4`}>
                            Silenciar Notificações Por:
                        </h3>
                        <select
                            value={silenciarnotificacoes}
                            onChange={(e) => setSilenciarNotificacoes(e.target.value)}
                            className={`w-full max-w-md ${inputClasses}`}>
                            <option value="1 hora">1 hora</option>
                            <option value="8 horas">8 horas</option>
                            <option value="24 horas">24 horas</option>
                            <option value="Nunca">Nunca</option>
                        </select>
                    </div>


                    {/* Seção Ranking e Interações (Sem alterações) */}
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>
                            Ranking e interações
                        </h2>
                        <div className={dividerClasses}></div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => setLembreteDiario(!lembretediario)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                        lembretediario 
                                        ? "bg-purple-500" 
                                        : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                    } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-purple-300'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${lembretediario ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                                <span className={labelTextClasses}>
                                    Lembrete diário de estudos
                                </span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => setProgressoeConquista(!progressoeconquista)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                        progressoeconquista 
                                        ? "bg-purple-500" 
                                        : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                    } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-purple-400'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${progressoeconquista ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                                <span className={labelTextClasses}>
                                    Progresso e conquistas
                                </span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => setRankingCompeticao(!rankingcompeticao)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                        rankingcompeticao 
                                        ? "bg-purple-500" 
                                        : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                    } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-purple-400'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${rankingcompeticao ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                                <span className={labelTextClasses}>
                                    Mostrar meu progresso
                                </span>
                            </div>
                            <div className='flex items-center gap-3 flex-wrap mt-6'>
                                <button
                                    onClick={() => setInteracoesSociais(!interacoessociais)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                        interacoessociais 
                                        ? "bg-purple-500" 
                                        : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                    } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-purple-400'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${interacoessociais ? "translate-x-6" : "translate-x-0"}`}></div>
                                </button>
                                <span className={labelTextClasses}>
                                    interações sociais
                                </span>
                            </div>
                            <div className='flex items-center gap-3 flex-wrap mt-6'>
                                <button
                                    onClick={() => setEventosEspeciais(!eventosespeciais)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 flex-shrink-0 ${
                                        eventosespeciais 
                                        ? "bg-purple-500" 
                                        : (theme === 'escuro' ? "bg-gray-600" : "bg-gray-300")
                                    } ${theme === 'escuro' ? 'border-2 border-gray-500' : 'border-2 border-purple-400'}`}
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
        </>
    );
}