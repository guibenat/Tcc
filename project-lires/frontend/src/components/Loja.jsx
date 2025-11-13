import React, { useState, useEffect, Fragment } from "react"; // <-- Adicionado Fragment
import { useSettings } from './SettingsContext';
import { useNavigate } from 'react-router-dom'; // <-- Importado useNavigate
import Swal from 'sweetalert2'; // <-- Importado Swal

// --- IMAGENS BANNER ---
import robotPremiumImg from '../assets/robot-premium.png';
import liresMasterLogo from '../assets/lires-master-logo.png';

// --- IMAGENS LCOINS ---
import lcoinIconImg from '../assets/lcoin.png'; // Ícone do título
import coinChestImg from '../assets/coin-chest.png'; // Imagem para 1200
import coinBarrelImg from '../assets/coin-barrel.png'; // Imagem para 3000
import coinCartImg from '../assets/coin-cart.png'; // Imagem para 6500

// --- INÍCIO DA MODIFICAÇÃO (Função de Copiar) ---
const copyToClipboard = (text, onSuccess) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            onSuccess();
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
    }
    document.body.removeChild(textArea);
};
// --- FIM DA MODIFICAÇÃO ---

// --- INÍCIO DA MODIFICAÇÃO (Modal de Pagamento PIX) ---
// (Este modal é para comprar LCOINS com dinheiro real)
const PixPaymentModal = ({ isOpen, onClose, onConfirm, theme, pack }) => {
    if (!isOpen) return null;

    const [copySuccess, setCopySuccess] = useState(false);
    
    // Simula uma chave PIX "Copia e Cola" diferente para cada valor
    const pixCopiaECola = `00020126580014br.gov.bcb.pix0136caua.arthur2006@gmail.com5204000053039865405${pack.price.toFixed(2)}5802BR5910Caua Ramos6009SAO PAULO62070503***6304E5B9`;
    
    // Gera a URL do QR Code (usando a API)
    const qrData = encodeURIComponent(pixCopiaECola);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;


    const handleCopy = () => {
        copyToClipboard(pixCopiaECola, () => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); 
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 font-poppins"
            onClick={onClose}
        >
            <div 
                className={`w-full max-w-md rounded-2xl shadow-xl flex flex-col ${
                    theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
                }`}
                onClick={e => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-purple-500">Comprar Lcoins</h3>
                    <button 
                        onClick={onClose}
                        className={`text-2xl font-bold transition-colors ${
                            theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'
                        }`}
                    >
                        &times;
                    </button>
                </div>
                
                {/* Conteúdo do Modal */}
                <div className="p-6 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-center mb-4"
                        style={{ color: '#FBC02D' }} // Amarelo Lcoin
                    >
                        {pack.amount} Lcoins
                    </h2>
                    <p className={`text-center mb-4 text-xl font-bold ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Valor: R$ {pack.price.toFixed(2)}
                    </p>
                    
                    {/* QR Code Simulado */}
                    <img 
                        src={qrCodeUrl}
                        alt="QR Code PIX Simulado"
                        className="w-48 h-48 rounded-lg bg-white"
                    />
                    
                    <p className={`mt-4 font-semibold ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Chave PIX: <span className='font-bold text-purple-500 text-xs'>caua.arthur2006@gmail.com</span>
                    </p>

                    {/* PIX Copia e Cola */}
                    <div className="w-full mt-4">
                        <textarea
                            readOnly
                            value={pixCopiaECola}
                            className={`w-full p-2 rounded-lg border text-sm resize-none ${
                                theme === 'escuro' 
                                ? 'bg-gray-700 border-gray-600 text-gray-300' 
                                : 'bg-gray-100 border-gray-300 text-gray-700'
                            }`}
                            rows={3}
                        />
                        <button
                            onClick={handleCopy}
                            className={`w-full mt-2 font-semibold py-2 px-4 rounded-lg transition-colors ${
                                copySuccess 
                                ? 'bg-green-500 text-white' 
                                : 'bg-purple-500 text-white hover:bg-purple-600'
                            }`}
                        >
                            {copySuccess ? 'Copiado! ✓' : 'Copiar Chave'}
                        </button>
                    </div>
                </div>
                
                {/* Botões de Ação */}
                <div className="flex justify-end gap-3 p-4 border-t">
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 rounded-full font-semibold ${
                            theme === 'escuro' 
                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onConfirm(pack.amount)} // Passa a quantidade de Lcoins
                        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition-colors"
                    >
                        Pagamento Concluído
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- FIM DA MODIFICAÇÃO ---


export default function LojaContent() {
    // --- INÍCIO DA MODIFICAÇÃO (Hooks) ---
    const { theme, setLcoins } = useSettings(); // Pega SOMENTE setLcoins
    const navigate = useNavigate(); // Hook para navegação
    
    const [animationClass, setAnimationClass] = useState('');
    const [modalData, setModalData] = useState({ isOpen: false, amount: 0, price: 0.0 });
    // --- FIM DA MODIFICAÇÃO ---

    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []); 

    // --- INÍCIO DA MODIFICAÇÃO (Função de Sucesso) ---
    const getSwalCustomClasses = () => ({
        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
        title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
        confirmButton: 'bg-purple-500 hover:bg-purple-600 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
    });
    const getSwalBackground = () => (theme === 'escuro' ? '#1f2937' : '#fff');

    const handlePaymentSuccess = (amount) => {
        // 1. Adiciona as Lcoins (O Contexto salvará)
        setLcoins(prevLcoins => prevLcoins + amount);
        
        // 2. REMOVIDO: Bloco de atualização manual do localStorage
        // O useEffect no SettingsContext cuidará disso automaticamente.
        // O código antigo aqui continha um bug (usava 'lcoins' estagnado).

        // 3. Fecha o modal
        setModalData({ isOpen: false, amount: 0, price: 0.0 });

        // 4. Mostra pop-up de sucesso
        Swal.fire({
            title: 'Compra Efetuada!',
            text: `Você recebeu ${amount} Lcoins!`,
            icon: 'success',
            confirmButtonText: 'Legal!',
            customClass: getSwalCustomClasses(),
            buttonsStyling: false,
            background: getSwalBackground()
        });
    };
    // --- FIM DA MODIFICAÇÃO ---

    const baseCardClass = "flex flex-col items-center p-4 rounded-xl shadow-lg transition-all transform cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20";

    return (
        // --- INÍCIO DA MODIFICAÇÃO (Fragment) ---
        <Fragment>
            <div className={`flex flex-col gap-8 w-full content-box ${animationClass}`}> 
            
                {/* BANNER PREMIUM (Atualizado com onClick) */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 overflow-hidden">
                    <div className="flex-1 text-center md:text-left z-10">
                        <img 
                            src={liresMasterLogo} 
                            alt="Líres Master Logo" 
                            className="w-auto h-8 mb-3 mx-auto md:mx-0 object-contain"
                        />
                        <h2 className="text-3xl font-bold mb-2">
                            Aprenda Libras <span className="text-yellow-300">SEM LIMITES!</span>
                        </h2>
                        <p className="text-blue-100 text-base mb-6 max-w-md mx-auto md:mx-0">
                            Mais conteúdo, mais prática e recursos exclusivos para acelerar seu aprendizado.
                        </p>
                
                        <div className="inline-block bg-gradient-to-r from-lime-300 via-yellow-300 to-lime-400 p-[3px] rounded-full shadow-lg">
                            <button 
                                onClick={() => navigate('/configuracoes/assinatura')} // <-- NAVEGAÇÃO
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-10 rounded-full w-full transition-colors text-lg"
                            >
                                Assinar agora
                            </button>
                        </div>
                    </div>
                
                    <div className="flex-shrink-0">
                        <img 
                            src={robotPremiumImg} 
                            alt="Mascote Lires Master" 
                            className="w-72 h-72 object-contain" 
                        />
                    </div>
                
                </div>

                {/* LCOINS ATUALIZADO */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src={lcoinIconImg} alt="Lcoins" className="w-8 h-8" />
                        <span className={`text-xl font-semibold ${
                            theme === 'escuro' ? 'text-purple-400' : 'text-purple-700'
                        }`}>Lcoins</span>
                    </div>

                    {/* --- INÍCIO DA MODIFICAÇÃO (Cards Clicáveis) --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Pacote 1 (1200) */}
                        <div 
                            onClick={() => setModalData({ isOpen: true, amount: 1200, price: 17.90 })}
                            className={`${baseCardClass} bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-blue-300`}
                        >
                            <img src={coinChestImg} alt="1200 Lcoins" className="w-36 h-36 mb-2 object-contain" />
                            <span className="font-bold text-2xl text-yellow-300">1200</span>
                            <span className="text-base text-white/90 font-medium">R$ 17,90</span>
                        </div>
                
                        {/* Pacote 2 (3000) */}
                        <div 
                            onClick={() => setModalData({ isOpen: true, amount: 3000, price: 34.00 })}
                            className={`${baseCardClass} bg-gradient-to-br from-blue-500 to-indigo-700 border-2 border-blue-400`}
                        >
                            <img src={coinBarrelImg} alt="3000 Lcoins" className="w-36 h-36 mb-2 object-contain" />
                            <span className="font-bold text-2xl text-yellow-300">3000</span>
                            <span className="text-base text-white/90 font-medium">R$ 34,00</span>
                        </div>
                
                        {/* Pacote 3 (6500) */}
                        <div 
                            onClick={() => setModalData({ isOpen: true, amount: 6500, price: 51.20 })}
                            className={`${baseCardClass} bg-gradient-to-br from-blue-700 to-indigo-900 border-2 border-indigo-400`}
                        >
                            <img src={coinCartImg} alt="6500 Lcoins" className="w-36 h-36 mb-2 object-contain" />
                            <span className="font-bold text-2xl text-yellow-300">6500</span>
                            <span className="text-base text-white/90 font-medium">R$ 51,20</span>
                        </div>
                        
                    </div>
                    {/* --- FIM DA MODIFICAÇÃO --- */}
                </div>
            </div>
            
            {/* --- INÍCIO DA MODIFICAÇÃO (Renderiza o Modal) --- */}
            <PixPaymentModal
                isOpen={modalData.isOpen}
                onClose={() => setModalData({ isOpen: false, amount: 0, price: 0.0 })}
                onConfirm={handlePaymentSuccess}
                theme={theme}
                pack={modalData}
            />
            {/* --- FIM DA MODIFICAÇÃO --- */}
        </Fragment>
    );
}