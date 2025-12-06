import React, { useState, useEffect } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext';

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
        <div className={`
            space-y-6 text-lg
            ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}
        `}>
            {children}
        </div>
    </div>
);

//Página de termos de uso
export default function TermosUsoPage() {
    const { theme } = useSettings();
    const [animationClass, setAnimationClass] = useState('');
    
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // Classes de estilo para os elementos de texto
    const pClasses = `leading-relaxed ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`;
    const listClasses = `list-decimal list-outside space-y-6 pl-6`;
    const strongClasses = `block text-xl font-semibold mb-2 ${theme === 'escuro' ? 'text-white' : 'text-gray-900'}`;
    const pListClasses = `mt-2 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`;

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
                    
                    <StaticCard title="Termos de Uso" theme={theme}>
                        <p className={pClasses}>
                            Ao utilizar o aplicativo Lires (doravante "Aplicativo"), você concorda 
                            com os seguintes termos e condições:
                        </p>
                        <ol className={listClasses}>
                            <li>
                                <strong className={strongClasses}>Propósito Acadêmico</strong>
                                <p className={pListClasses}>
                                    Este Aplicativo é um protótipo de software desenvolvido para fins 
                                    estritamente acadêmicos, como parte de um Trabalho de Conclusão de Curso (TCC). 
                                    Ele não se destina ao uso comercial.
                                </p>
                            </li>
                            <li>
                                <strong className={strongClasses}>Simulação de Pagamento</strong>
                                <p className={pListClasses}>
                                    Todas as funcionalidades de "Loja", "Lcoins" e "Assinatura Master" 
                                    são simulações. Nenhuma transação financeira real é processada. 
                                    O fluxo de pagamento (PIX) é demonstrativo e não transfere valores monetários.
                                </p>
                            </li>
                            <li>
                                <strong className={strongClasses}>Armazenamento de Dados</strong>
                                <p className={pListClasses}>
                                    O Aplicativo utiliza o LocalStorage do navegador para simular a persistência 
                                    de dados. O progresso, conquistas e perfil do usuário são salvos localmente 
                                    e podem ser perdidos se o cache do navegador for limpo.
                                </p>
                            </li>
                        </ol>
                    </StaticCard>
                    
                </main>
            </div>
        </div>
    );
}