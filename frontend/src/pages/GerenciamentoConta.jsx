import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useSettings } from '../components/SettingsContext'; 

// Assets
import Perfil from '../assets/Perfil.png'; 
import LcoinIcon from '../assets/lcoin.png'; 

// Função de Avatar
const AVATAR_STYLE = 'bottts-neutral'; 
const avatarSeeds = [
    'caua', 'maria', 'joao', 'ana', 'pedro', 'lucas', 'bia', 'leo', 
    'sofia', 'davi', 'gato', 'sol', 'lua', 'happy', 'smile', 'code', 
    'book', 'game', 'music', 'art'
];

const getAvatarUrl = (seed, style = AVATAR_STYLE) => { 
    if (!seed) return Perfil; 
    const colorPalette = ['f0d3f7', 'c0aede', 'd1d4f9', 'fde047', 'a78bfa', '7c3aed', '4ade80', '2dd4bf', 'fb7185', 'f97316'].join(',');
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};

// AvatarPickerModal 
const AvatarPickerModal = ({ isOpen, onClose, onSelect, currentSeed, theme }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className={`w-full max-w-2xl rounded-2xl shadow-xl flex flex-col ${theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-purple-500">Escolha seu Avatar</h3>
                    <button onClick={onClose} className={`text-2xl font-bold transition-colors ${theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'}`}>&times;</button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto p-4">
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                        {avatarSeeds.map(seed => {
                            const isSelected = seed === currentSeed;
                            return (
                                <button key={seed} onClick={() => onSelect(seed)} className={`rounded-full p-1 transition-all duration-200 ${isSelected ? 'ring-4 ring-purple-500' : 'ring-0 hover:ring-4 hover:ring-purple-300'}`}>
                                    <img src={getAvatarUrl(seed, AVATAR_STYLE)} alt={`Avatar ${seed}`} className="w-full h-full rounded-full bg-white"/>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal de Verificação
const VerificationModal = ({ isOpen, onClose, onConfirm, target, theme, code, setCode, error, value }) => {
    if (!isOpen) return null;
    const safeValue = value || '';
    const displayValue = target === 'email' ? safeValue : `...${safeValue.slice(-4)}`; 
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className={`w-full max-w-md rounded-2xl shadow-xl flex flex-col ${theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-purple-500">
                        Verificar {target === 'email' ? 'E-mail' : 'Número'}
                    </h3>
                    <button onClick={onClose} className="text-2xl font-bold">&times;</button>
                </div>
                <div className="p-6 flex flex-col items-center">
                    <p className={`text-center ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Enviamos um código de 6 dígitos para <span className='font-bold'>{displayValue}</span>.
                    </p>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" maxLength={6} className={`w-full max-w-xs text-center text-2xl tracking-[.2em] font-bold p-3 mt-4 rounded-lg border-2 ${error ? 'border-red-500' : (theme === 'escuro' ? 'bg-gray-700 border-gray-600' : 'border-gray-300')}`}/>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <div className="flex justify-end gap-3 p-4 border-t">
                    <button onClick={onClose} className={`px-6 py-2 rounded-full font-semibold ${theme === 'escuro' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>Cancelar</button>
                    <button onClick={onConfirm} className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-600">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default function GerenciamentoConta() { 
    const { theme, lcoins, setLcoins } = useSettings(); // Removido t e language
    const navigate = useNavigate(); 

    // Estados Locais
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState(''); 
    const [dataNascimento, setDataNascimento] = useState(''); 
    const [avatarSeed, setAvatarSeed] = useState('');
    
    const [originalNome, setOriginalNome] = useState('');
    const [originalUsername, setOriginalUsername] = useState('');
    const [originalEmail, setOriginalEmail] = useState(''); 
    const [originalNumero, setOriginalNumero] = useState(''); 
    const [originalDataNascimento, setOriginalDataNascimento] = useState('');
    
    const [lastNomeChangeTimestamp, setLastNomeChangeTimestamp] = useState(null);
    const [usernameChangeCount, setUsernameChangeCount] = useState(0);
    const [isEmailVerified, setIsEmailVerified] = useState(false); 
    const [isNumeroVerified, setIsNumeroVerified] = useState(false); 

    const [saveMessage, setSaveMessage] = useState(''); 
    const [nomeError, setNomeError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [verificationTarget, setVerificationTarget] = useState(''); 
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState('');
    
    // Carregar Estado Inicial
    useEffect(() => {
        setAnimationClass('anim-enter');
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            setNome(user.name || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setNumero(user.numero || ''); 
            setDataNascimento(user.dataNascimento || ''); 
            setAvatarSeed(user.avatarSeed || user.username); 

            setOriginalNome(user.name || '');
            setOriginalUsername(user.username || '');
            setOriginalEmail(user.email || '');
            setOriginalNumero(user.numero || '');
            setOriginalDataNascimento(user.dataNascimento || '');
            
            setIsEmailVerified(user.isEmailVerified || false);
            setIsNumeroVerified(user.isNumeroVerified || false);
            setLastNomeChangeTimestamp(user.lastNomeChange || null);
            setUsernameChangeCount(user.usernameChangeCount || 0);
        }
    }, []);
    
    // Regras de Negócio
    const checkNomeCooldown = () => {
        if (!lastNomeChangeTimestamp) return { canChange: true };
        const daysToWait = 7;
        const now = Date.now();
        const timePassed = now - lastNomeChangeTimestamp;
        const daysPassed = timePassed / (1000 * 60 * 60 * 24);

        if (daysPassed < daysToWait) {
            const daysRemaining = Math.ceil(daysToWait - daysPassed);
            return { 
                canChange: false, 
                message: `Você só pode mudar seu nome a cada 7 dias. Faltam ${daysRemaining} dia(s).`
            };
        }
        return { canChange: true };
    };
    
    const getUsernameChangeCost = () => {
        return usernameChangeCount === 0 ? 0 : 1000;
    };
    
    // Lógica de Verificação
    const handleSendVerification = (target) => {
        setVerificationTarget(target);
        setVerificationError('');
        setVerificationCode('');
        
        if(target === 'email' && !email) {
            setSaveMessage("Por favor, digite um e-mail.");
            setTimeout(() => setSaveMessage(''), 3000);
            return;
        }
        if(target === 'numero' && !numero) {
            setSaveMessage("Por favor, digite um número.");
            setTimeout(() => setSaveMessage(''), 3000);
            return;
        }
        setIsVerificationModalOpen(true);
    };

    const handleConfirmVerification = () => {
        if (verificationCode !== '123456') {
            setVerificationError("Código inválido. Tente novamente.");
            return;
        }

        let bonus = 0;
        let successMessage = '';

        if (verificationTarget === 'email') {
            setIsEmailVerified(true);
            setOriginalEmail(email);
            bonus = 50;
            successMessage = `E-mail verificado! +${bonus} Lcoins!`;
        } else if (verificationTarget === 'numero') {
            setIsNumeroVerified(true);
            setOriginalNumero(numero);
            bonus = 25;
            successMessage = `Número verificado! +${bonus} Lcoins!`;
        }

        setLcoins(l => l + bonus);
        setSaveMessage(successMessage);
        setIsVerificationModalOpen(false);
        setVerificationCode('');
        
        handleSave(true); 
        setTimeout(() => setSaveMessage(''), 4000); 
    };
    
    // Função Salvar
    const handleSave = (triggeredByVerification = false) => {
        if (!triggeredByVerification) {
            setSaveMessage('');
            setNomeError('');
            setUsernameError('');
        }

        const userString = localStorage.getItem('currentUser');
        const dbString = localStorage.getItem('liresUsersDB'); 
        
        if (!userString || !dbString) return;

        const currentUser = JSON.parse(userString);
        const liresUsersDB = JSON.parse(dbString); 
        const updatedUser = { ...currentUser };
        
        let lcoinsToDeduct = 0;
        let bonusLcoins = 0;

        const nomeChanged = nome !== originalNome;
        if (nomeChanged) {
            const nomeCheck = checkNomeCooldown();
            if (!nomeCheck.canChange) {
                if (!triggeredByVerification) setNomeError(nomeCheck.message);
                return; 
            }
            updatedUser.name = nome;
            updatedUser.lastNomeChange = Date.now();
        }

        const usernameChanged = username !== originalUsername;
        if (usernameChanged) {
            const cost = getUsernameChangeCost();
            if (lcoins < cost) {
                if (!triggeredByVerification) setUsernameError(`Você precisa de ${cost} Lcoins. Você tem ${lcoins}.`);
                return; 
            }
            lcoinsToDeduct = cost;
            updatedUser.username = username;
            updatedUser.usernameChangeCount = (usernameChangeCount || 0) + 1;
        }
        
        const justAddedDataNascimento = !originalDataNascimento && dataNascimento;
        if (justAddedDataNascimento) bonusLcoins += 25;
        
        const justAddedNumero = !originalNumero && numero && !isNumeroVerified;
        if (justAddedNumero) bonusLcoins += 25;

        updatedUser.avatarSeed = avatarSeed; 
        updatedUser.avatarStyle = AVATAR_STYLE;
        updatedUser.email = email; 
        updatedUser.numero = numero; 
        updatedUser.dataNascimento = dataNascimento; 
        updatedUser.isEmailVerified = isEmailVerified;
        updatedUser.isNumeroVerified = isNumeroVerified;

        const updatedDB = liresUsersDB.map(user => 
            user.id === currentUser.id ? updatedUser : user
        );

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB)); 

        const newLcoins = lcoins - lcoinsToDeduct + bonusLcoins;
        if (newLcoins !== lcoins) {
            setLcoins(newLcoins);
        }
        
        setOriginalNome(nome);
        setOriginalUsername(username);
        if (justAddedDataNascimento) setOriginalDataNascimento(dataNascimento);
        if (justAddedNumero) setOriginalNumero(numero);
        if (nomeChanged) setLastNomeChangeTimestamp(updatedUser.lastNomeChange);
        if (usernameChanged) setUsernameChangeCount(updatedUser.usernameChangeCount);

        if (!triggeredByVerification) {
            setSaveMessage(`Alterações salvas! ${bonusLcoins > 0 ? `+${bonusLcoins} Lcoins!` : ''}`);
            setTimeout(() => setSaveMessage(''), 3000); 
        }
    };

    // Classes de Estilo 
    const inputClasses = theme === 'escuro'
        ? 'bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500' 
        : 'border-2 border-cyan-400 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400'; 
    const cardClasses = theme === 'escuro' ? 'bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700' : 'bg-white rounded-lg shadow-md p-6';
    const titleClasses = `font-bold text-xl md:text-2xl lg:text-3xl mb-4 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`;
    const subtitleClasses = `font-bold text-lg md:text-xl mb-4 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`;
    const helperTextClasses = `text-sm mt-2 ${theme === 'escuro' ? 'text-slate-400' : 'text-gray-500'}`;
    const dividerClasses = `w-full h-px mb-6 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-blue-400'}`; 

    const nomeCooldown = checkNomeCooldown();
    const usernameCost = getUsernameChangeCost();
    const emailChanged = email !== originalEmail;
    const numeroChanged = numero !== originalNumero;

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
            
            <VerificationModal
                isOpen={isVerificationModalOpen}
                onClose={() => setIsVerificationModalOpen(false)}
                onConfirm={handleConfirmVerification}
                target={verificationTarget}
                theme={theme}
                code={verificationCode}
                setCode={setVerificationCode}
                error={verificationError}
                value={verificationTarget === 'email' ? email : numero} 
            />

            <div className={`content-box w-full ${animationClass}`}>
                <h1 className={`font-bold text-2xl md:text-3xl lg:text-5xl mb-8 ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}`}>
                    Gerenciamento de Conta
                </h1>

                <div>
                    <div className={cardClasses}>
                        <h2 className={titleClasses}>Informações Pessoais</h2>
                        <div className={dividerClasses}></div>
                        
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                            {/* Avatar */}
                            <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto">
                                <h3 className={subtitleClasses}>Avatar</h3>
                                <button onClick={() => setShowAvatarModal(true)} className="relative group w-32 h-32 rounded-full overflow-hidden">
                                    <img src={getAvatarUrl(avatarSeed, AVATAR_STYLE)} alt="Avatar" className="w-full h-full object-cover rounded-full bg-white"/>
                                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span role="img" aria-label="Editar" className="text-4xl">✏️</span>
                                    </div>
                                </button>
                                <p className={helperTextClasses}>Clique no avatar para escolher.</p>
                            </div>

                            {/* Inputs */}
                            <div className="flex-grow w-full space-y-6">
                                {/* Nome */}
                                <div>
                                    <h3 className={subtitleClasses}>Nome</h3>
                                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" disabled={!nomeCooldown.canChange} className={`w-full max-w-md ${inputClasses} ${!nomeCooldown.canChange ? 'opacity-50 cursor-not-allowed' : ''}`}/>
                                    {nomeError ? ( <p className="text-sm text-red-500 mt-2">{nomeError}</p> ) : (
                                        <p className={helperTextClasses}>{nomeCooldown.canChange ? "Você pode alterar." : nomeCooldown.message}</p>
                                    )}
                                </div>
                                
                                {/* Usuário */}
                                <div>
                                    <h3 className={subtitleClasses}>Usuário</h3>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu @username" className={`w-full max-w-md ${inputClasses}`}/>
                                    {usernameError ? ( <p className="text-sm text-red-500 mt-2">{usernameError}</p> ) : (
                                        <div className={`${helperTextClasses} flex items-center gap-1`}>
                                            {usernameCost === 0 ? "Sua primeira mudança de @username é grátis." : ( <> Custo para mudar: <img src={LcoinIcon} alt="L" className="w-4 h-4" /><span className="font-semibold">{usernameCost}</span> </> )}
                                        </div>
                                    )}
                                </div>

                                {/* E-mail */}
                                <div>
                                    <h3 className={subtitleClasses}>E-mail</h3>
                                    <div className="flex items-center gap-2">
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" className={`w-full max-w-md ${inputClasses} ${(isEmailVerified && !emailChanged) ? 'opacity-50' : ''}`} disabled={isEmailVerified && !emailChanged}/>
                                        {(isEmailVerified && !emailChanged) ? ( <span className="text-green-500 font-semibold whitespace-nowrap">✓ Verificado</span> ) : (
                                            <button onClick={() => handleSendVerification('email')} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap">Verificar</button>
                                        )}
                                    </div>
                                    {(!isEmailVerified || emailChanged) && (
                                        <p className={helperTextClasses}>{isEmailVerified ? "Você precisa verificar o novo e-mail." : "Verifique seu e-mail para ganhar +50 Lcoins!"}</p>
                                    )}
                                </div>

                                {/* Número */}
                                <div>
                                    <h3 className={subtitleClasses}>Número</h3>
                                    <div className="flex items-center gap-2">
                                        <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="11 9XXXX-XXXX" className={`w-full max-w-md ${inputClasses} ${isNumeroVerified && !numeroChanged ? 'opacity-50' : ''}`} disabled={isNumeroVerified && !numeroChanged}/>
                                        {(isNumeroVerified && !numeroChanged) ? ( <span className="text-green-500 font-semibold whitespace-nowrap">✓ Verificado</span> ) : (
                                            <button onClick={() => handleSendVerification('numero')} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap">Verificar</button>
                                        )}
                                    </div>
                                    {(!isNumeroVerified || numeroChanged) && (
                                        <p className={helperTextClasses}>{isNumeroVerified ? "Você precisa verificar o novo número." : "Verifique seu número para ganhar +25 Lcoins!"}</p>
                                    )}
                                </div>
                                
                                {/* Data de Nascimento */}
                                <div>
                                    <h3 className={subtitleClasses}>Data de nascimento</h3>
                                    <input type="text" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} placeholder="DD/MM/AAAA" className={`w-full max-w-md ${inputClasses}`}/>
                                    {!originalDataNascimento && ( <p className={helperTextClasses}>Complete para ganhar +25 Lcoins!</p> )}
                                </div>

                                {/* Botão Salvar */}
                                <div className="flex items-center gap-4 pt-4">
                                    <button onClick={() => handleSave(false)} className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-600 transition-colors">
                                        Salvar Alterações
                                    </button>
                                    <p className="text-sm text-center">
                                        <span className={`text-sm ${saveMessage.startsWith('Error') || saveMessage.startsWith('Erro') ? 'text-red-500' : 'text-green-500'}`}>{saveMessage}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}