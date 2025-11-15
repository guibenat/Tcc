import React, { useState, useEffect, Fragment } from "react"; // Fragment é necessário porque agora eu retorno o Modal fora da div principal
import { useSettings } from './SettingsContext';
import { useNavigate } from 'react-router-dom'; // Para o botão 'Assinar'
import Swal from 'sweetalert2'; // Para os pop-ups de sucesso

// --- IMAGENS BANNER ---
import robotPremiumImg from '../assets/robot-premium.png';
import liresMasterLogo from '../assets/lires-master-logo.png';

// --- IMAGENS LCOINS ---
import lcoinIconImg from '../assets/lcoin.png'; // Ícone do título
import coinChestImg from '../assets/coin-chest.png'; // Imagem para 1200
import coinBarrelImg from '../assets/coin-barrel.png'; // Imagem para 3000
import coinCartImg from '../assets/coin-cart.png'; // Imagem para 6500

/**
 * Função utilitária (helper) para copiar texto para a área de transferência.
 * Cria um textarea, joga o texto lá, seleciona, copia e remove o elemento.
 * Recebe um callback 'onSuccess' para eu poder mudar o estado do botão (ex: "Copiado!").
 */
const copyToClipboard = (text, onSuccess) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Tira da tela
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            onSuccess(); // Chama o callback se a cópia der certo
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
    }
    document.body.removeChild(textArea);
};

/**
 * Componente: PixPaymentModal
 * Este é o modal que abre ao clicar em um pacote de Lcoins.
 * Ele é "burro", apenas exibe os dados (pack) e chama as funções (onClose, onConfirm).
 */
const PixPaymentModal = ({ isOpen, onClose, onConfirm, theme, pack }) => {
    // Não renderiza nada se não estiver aberto
    if (!isOpen) return null;

    // Estado para o feedback do botão 'copiar'
    const [copySuccess, setCopySuccess] = useState(false);
    
    // Gero uma chave PIX "Copia e Cola" SIMULADA.
    // O valor (pack.price) é injetado na string.
    const pixCopiaECola = `00020126580014br.gov.bcb.pix0136caua.arthur2006@gmail.com5204000053039865405${pack.price.toFixed(2)}5802BR5910Caua Ramos6009SAO PAULO62070503***6304E5B9`;
    
    // Gero a URL do QR Code (usando a API gratuita qrserver.com)
    const qrData = encodeURIComponent(pixCopiaECola);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;


    // Função chamada pelo botão 'Copiar Chave'
    const handleCopy = () => {
        copyToClipboard(pixCopiaECola, () => {
            setCopySuccess(true); // Ativa o feedback
            setTimeout(() => setCopySuccess(false), 2000); // Reseta depois de 2s
        });
    };

    return (
        // O overlay (fundo escuro)
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 font-poppins"
            onClick={onClose} // Fecha ao clicar fora
        >
            {/* O card do modal */}
            <div 
                className={`w-full max-w-md rounded-2xl shadow-xl flex flex-col ${
                    theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
                }`}
                onClick={e => e.stopPropagation()} // Impede de fechar ao clicar DENTRO
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
                
                {/* Conteúdo do Modal (QR Code, Valor, Copia e Cola) */}
                <div className="p-6 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-center mb-4"
                        style={{ color: '#FBC02D' }} // Amarelo Lcoin
                    >
                        {pack.amount} Lcoins
                    </h2>
                    <p className={`text-center mb-4 text-xl font-bold ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Valor: R$ {pack.price.toFixed(2)}
                    </p>
                    
                    {/* QR Code Simulado (a API gera a imagem) */}
                    <img 
                        src={qrCodeUrl}
                        alt="QR Code PIX Simulado"
                        className="w-48 h-48 rounded-lg bg-white" // bg-white pra garantir
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
                                ? 'bg-green-500 text-white' // Feedback de sucesso
                                : 'bg-purple-500 text-white hover:bg-purple-600'
                            }`}
                        >
                            {copySuccess ? 'Copiado! ✓' : 'Copiar Chave'}
                        </button>
                    </div>
                </div>
                
                {/* Rodapé com botões de ação */}
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
                    {/* Botão de "Pagamento Concluído" (Simulação) */}
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


/**
 * Componente Principal: LojaContent
 * Esta é a página da loja.
 */
export default function LojaContent() {
    // Puxo o 'setLcoins' do meu contexto. Não preciso do 'lcoins' aqui.
    const { theme, setLcoins } = useSettings(); 
    const navigate = useNavigate(); // Hook para navegar para a pag de assinatura
    
    const [animationClass, setAnimationClass] = useState('');
    
    // Estado que controla o modal de PIX
    // 'pack' vai guardar os dados (amount, price) do pacote clicado
    const [modalData, setModalData] = useState({ isOpen: false, amount: 0, price: 0.0 });

    // Animação de entrada
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []); 

    // Helpers para estilizar o pop-up do Swal
    const getSwalCustomClasses = () => ({
        popup: `font-poppins rounded-2xl ${theme === 'escuro' ? 'bg-gray-800 text-slate-200' : 'bg-white'}`,
        title: `${theme === 'escuro' ? 'text-slate-200' : 'text-slate-800'}`,
        confirmButton: 'bg-purple-500 hover:bg-purple-600 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105',
    });
    const getSwalBackground = () => (theme === 'escuro' ? '#1f2937' : '#fff');

    /**
     * Chamado quando o usuário clica em "Pagamento Concluído" no modal.
     * @param {number} amount - A quantidade de Lcoins compradas (ex: 1200)
     */
    const handlePaymentSuccess = (amount) => {
        // 1. Adiciona as Lcoins ao estado global.
        // O SettingsContext vai automaticamente salvar isso no localStorage
        // por causa do useEffect que coloquei lá. Isso é bem mais limpo.
        setLcoins(prevLcoins => prevLcoins + amount);
        
        // 2. Fecha o modal
        setModalData({ isOpen: false, amount: 0, price: 0.0 });

        // 3. Mostra pop-up de sucesso
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

    // Classe base dos cards de Lcoin
    const baseCardClass = "flex flex-col items-center p-4 rounded-xl shadow-lg transition-all transform cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20";

    return (
        // Uso o Fragment porque o Modal é um "irmão" da div principal
        <Fragment>
            {/* Conteúdo principal da página */}
            <div className={`flex flex-col gap-8 w-full content-box ${animationClass}`}> 
            
                {/* BANNER PREMIUM (Master) */}
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
                    
                        {/* Truque do botão com borda gradiente */}
                        <div className="inline-block bg-gradient-to-r from-lime-300 via-yellow-300 to-lime-400 p-[3px] rounded-full shadow-lg">
                            <button 
                                // Navega para a página de Assinatura nas Configurações
                                onClick={() => navigate('/configuracoes/assinatura')} 
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

                {/* Seção de LCOINS */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src={lcoinIconImg} alt="Lcoins" className="w-8 h-8" />
                        <span className={`text-xl font-semibold ${
                            theme === 'escuro' ? 'text-purple-400' : 'text-purple-700'
                        }`}>Lcoins</span>
                    </div>

                    {/* Grid dos pacotes de Lcoin (clicáveis) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Pacote 1 (1200) */}
                        <div 
                            // Ao clicar, defino os dados do modal e mando abrir
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
                </div>
            </div>
            
            {/* Aqui eu renderizo o Modal. Ele só vai ser visível se 'modalData.isOpen' for true */}
            <PixPaymentModal
                isOpen={modalData.isOpen}
                onClose={() => setModalData({ isOpen: false, amount: 0, price: 0.0 })} // Reseta e fecha
                onConfirm={handlePaymentSuccess}
                theme={theme}
                pack={modalData} // Passo o 'pack' (amount e price) para o modal
            />
        </Fragment>
    );
}