import React, { useState, useEffect } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: StaticCard
 * (Reutilizado para manter o estilo)
 */
const StaticCard = ({ title, children, theme }) => (
    <div className={`
        content-box anim-enter w-full max-w-4xl mx-auto rounded-lg shadow-md p-6 md:p-10 
        ${theme === 'escuro' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}
    `}>
        <h1 className={`
            font-bold text-2xl md:text-3xl lg:text-5xl mb-8 
            ${theme === 'escuro' ? 'text-white' : 'text-gray-900'}
        `}>
            {title}
        </h1>
        {/* O container do children agora define o espaçamento e a cor base */}
        <div className={`
            space-y-6 text-lg
            ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}
        `}>
            {children}
        </div>
    </div>
);

/**
 * Página: Termos de Privacidade
 * Rota: /termos-de-privacidade
 */
export default function TermosPrivacidadePage() {
    const { theme } = useSettings();
    const [animationClass, setAnimationClass] = useState('');
    
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);
    
    // Classes de estilo para os elementos de texto
    const pClasses = `leading-relaxed ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`;
    const listClasses = `list-decimal list-outside space-y-6 pl-6`;
    const strongClasses = `block text-xl font-semibold mb-2 ${theme === 'escuro' ? 'text-white' : 'text-gray-900'}`;
    const subListClasses = `list-disc space-y-2 pl-6 mt-4 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`;
    const subStrongClasses = `${theme === 'escuro' ? 'text-gray-100' : 'text-gray-900'}`;

    return (
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    
                    <StaticCard title="Política de Privacidade" theme={theme}>
                        <p className={pClasses}>
                            Sua privacidade é importante para nós. Esta política explica como 
                            coletamos, usamos e protegemos suas informações pessoais.
                        </p>
                        
                        {/* CORREÇÃO: Usando <ol> e <li> com classes manuais */}
                        <ol className={listClasses}>
                            <li>
                                <strong className={strongClasses}>
                                    Coleta de Dados (Simulação)
                                </strong>
                                <p className={pClasses}>
                                    Este aplicativo é um protótipo de TCC e utiliza o <strong>LocalStorage</strong> do seu 
                                    navegador para simular um banco de dados.
                                </p>
                                <ul className={subListClasses}>
                                    <li><strong className={subStrongClasses}>Dados Salvos:</strong> Seu progresso de lições, Lcoins, streak, preferências (tema, fonte) e dados de perfil (nome, e-mail criptografado, avatar) 
                                        são salvos localmente no seu dispositivo.</li>
                                    <li><strong className={subStrongClasses}>Sem Coleta Externa:</strong> Nenhum dado é enviado para um servidor 
                                        externo. Se você limpar o cache do seu navegador, todos os 
                                        dados do seu progresso serão perdidos.</li>
                                </ul>
                            </li>
                            <li>
                                <strong className={strongClasses}>
                                    Uso de Informações
                                </strong>
                                <p className={pClasses}>
                                    Os dados coletados são usados exclusivamente para o funcionamento 
                                    das mecânicas do aplicativo, como:
                                </p>
                                <ul className={subListClasses}>
                                    <li>Verificar seu progresso para desbloquear novas lições.</li>
                                    <li>Calcular seu saldo de Lcoins para compras na Loja.</li>
                                    <li>Manter sua sequência (streak) diária.</li>
                                    <li>Personalizar sua experiência (tema e avatar).</li>
                                </ul>
                            </li>
                            <li>
                                <strong className={strongClasses}>
                                    Segurança
                                </strong>
                                <p className={pClasses}>
                                    Embora os dados estejam no LocalStorage, senhas de cadastro são 
                                    armazenadas em texto (o que não ocorreria em um ambiente de produção). 
                                    Em um projeto real, as senhas seriam criptografadas (hashed) 
                                    em um backend seguro.
                                </p>
                            </li>
                        </ol>
                    </StaticCard>
                    
                </main>
            </div>
        </div>
    );
}