import React, { useState, useEffect } from 'react';
import { useSettings } from '../components/SettingsContext';

// --- Imagens ---
import TelaMonitorSegurança from "../assets/TelaMonitorSegurança.png"; // Icone para PC
import CelularLiresSegurança from "../assets/CelularLiresSegurança.png"; // Icone para Celular

// --- Ícones SVG ---
const EyeIcon = ({ theme }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    className={theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = ({ theme }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    className={theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/**
 * Componente: PasswordInput (Input customizado com toggle de visibilidade)
 */
const PasswordInput = ({ placeholder = "Digite sua senha", value = "", onChange = () => {}, className = "", showToggle = true, theme }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 pr-12 border-2 rounded-full focus:outline-none transition-all duration-200 ${
          theme === 'escuro'
          ? 'bg-gray-700 border-teal-600 text-slate-200 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
          : 'bg-white border-teal-400 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-teal-300 focus:border-teal-500'
        } ${className}`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
            theme === 'escuro' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {showPassword ? <EyeOffIcon theme={theme} /> : <EyeIcon theme={theme} />}
        </button>
      )}
    </div>
  );
};

// --- Lógica de Dispositivos Conectados (Mock) ---
const getInitialDevices = () => {
    // Cria um mock de dispositivos com base na data e hora atual
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR'); 
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); 

    return [
        {
            id: 1,
            img: TelaMonitorSegurança,
            nome: "Computador (Este dispositivo)",
            local: "Mauá, SP, Brasil",
            ultimoAcesso: `Ativo agora - ${formattedDate} ${formattedTime}`,
            isCurrent: true 
        },
        {
            id: 2,
            img: CelularLiresSegurança,
            nome: "Celular Lires (Galaxy S20)",
            local: "São Paulo, SP, Brasil",
            ultimoAcesso: "Último acesso: 10/11/2025 09:15",
            isCurrent: false
        }
    ];
};

/**
 * Componente: Seguranca
 * Painel de gerenciamento de senha e dispositivos.
 */
export default function Seguranca() {
    const { theme } = useSettings();
    
    // --- Estados para Alteração de Senha ---
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [senhaSuccess, setSenhaSuccess] = useState('');
    
    // --- Estado para Monitoramento de Dispositivos ---
    const [dispositivos, setDispositivos] = useState(getInitialDevices());

    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // --- Lógica: Mudar Senha ---
    const handleMudarSenha = () => {
        setSenhaError('');
        setSenhaSuccess('');

        // 1. Validar nova senha
        if (novaSenha.length < 6) {
            setSenhaError("A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            setSenhaError("As novas senhas não coincidem.");
            return;
        }

        // 2. Simular verificação da senha atual
        const userString = localStorage.getItem('currentUser');
        if (!userString) {
            setSenhaError("Erro: Usuário não encontrado.");
            return;
        }
        const currentUser = JSON.parse(userString);

        // Verifica a senha atual (hardcoded contra o valor salvo no localStorage)
        if (currentUser.password !== senhaAtual) {
            setSenhaError("A senha atual está incorreta.");
            return;
        }
        
        // 3. Sucesso! Salvar a nova senha
        
        // Atualiza o objeto 'currentUser' logado
        const updatedUser = { ...currentUser, password: novaSenha };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Atualiza o DB de usuários (para manter a consistência)
        const dbString = localStorage.getItem('liresUsersDB');
        if (dbString) {
            const liresUsersDB = JSON.parse(dbString);
            const updatedDB = liresUsersDB.map(user => 
                user.id === currentUser.id ? updatedUser : user
            );
            localStorage.setItem('liresUsersDB', JSON.stringify(updatedDB));
        }

        setSenhaSuccess("Senha alterada com sucesso!");
        // Limpa os campos
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
    };

    // --- Lógica: Desconectar Dispositivo ---
    const handleDesconectar = (id) => {
        // Remove o dispositivo da lista do estado (simulando logout remoto)
        setDispositivos(prevDevices => prevDevices.filter(device => device.id !== id));
        // Em um app real: chamaria API para invalidar a sessão/token do dispositivo
    };

    return (
        <div className={`content-box w-full ${animationClass}`}>
            
            <h1 className={`font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-6 sm:mb-8 pr-4 sm:pr-0 ${
                theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
            }`}>
                Segurança e informações da conta
            </h1>

            <div className="space-y-6 sm:space-y-8 pr-4 sm:pr-0">
                
                {/* --- Card 1: Alterar Senha --- */}
                <div className={`rounded-lg shadow-md p-4 sm:p-6 ${
                    theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                    <h2 className={`font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 ${
                        theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                        Login e segurança
                    </h2>
                    <div className={`w-full h-1 mb-4 sm:mb-6 ${theme === 'escuro' ? 'bg-gray-700' : 'bg-green-200'}`}></div>
                    <h3 className={`font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 ${
                        theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                        Alterar Senha
                    </h3>
                    <div className="max-w-md space-y-4">
                        <PasswordInput
                            placeholder="Digite sua senha ATUAL"
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            theme={theme}
                        />
                        <PasswordInput
                            placeholder="Digite sua NOVA senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            theme={theme}
                        />
                        <PasswordInput
                            placeholder="Confirme sua NOVA senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            theme={theme}
                        />
                        
                        {/* Mensagens de Erro/Sucesso */}
                        {senhaError && <p className="text-sm text-red-500">{senhaError}</p>}
                        {senhaSuccess && <p className="text-sm text-green-500">{senhaSuccess}</p>}

                        <button
                            onClick={handleMudarSenha}
                            className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-600 transition-colors"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>


                {/* --- Card 2: Dispositivos Conectados --- */}
                <div className={`rounded-lg shadow-md p-4 sm:p-6 ${
                    theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                    <h2 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${
                        theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                        Dispositivos conectados:
                    </h2>
                    <div className='space-y-4'>
                        {dispositivos.map((device) => (
                            <div 
                                key={device.id}
                                className={`flex flex-col sm:flex-row items-start sm:items-center rounded-xl p-3 sm:p-4 border-2 ${
                                    theme === 'escuro' 
                                    ? 'bg-gray-700 border-gray-600' 
                                    : 'bg-white border-green-400'
                                }`}
                            >
                                <img src={device.img} alt="Dispositivo" className='w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-0 sm:mr-4' />
                                <div className='flex-1'>
                                    <h2 className={`font-bold text-sm sm:text-base lg:text-lg mb-1 ${
                                        theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'
                                    }`}>{device.nome}</h2>
                                    <p className={`text-xs sm:text-sm mb-1 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>{device.local}</p>
                                    <p className={`text-xs sm:text-sm ${device.isCurrent ? 'text-green-500 font-semibold' : (theme === 'escuro' ? 'text-gray-400' : 'text-gray-600')}`}>
                                        {device.ultimoAcesso}
                                    </p>
                                </div>
                                {/* Botão de Desconectar */}
                                <button
                                    onClick={() => handleDesconectar(device.id)}
                                    disabled={device.isCurrent} // Não pode desconectar o dispositivo atual
                                    className={`mt-3 sm:mt-0 sm:ml-4 py-2 px-4 rounded-full font-semibold text-sm ${
                                        device.isCurrent
                                        ? (theme === 'escuro' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                                        : (theme === 'escuro' ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600')
                                    } transition-colors`}
                                >
                                    {device.isCurrent ? "Este dispositivo" : "Desconectar"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}