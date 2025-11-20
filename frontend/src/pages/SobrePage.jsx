import React, { useState, useEffect } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: StaticCard
 * Um card reutilizável para exibir o conteúdo estático (Sobre, Termos, etc.)
 * REMOVIDO o plugin 'prose' para permitir estilização manual.
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
 * Página: Sobre o Projeto
 * Rota: /sobre
 */
export default function SobrePage() {
    const { theme } = useSettings();
    const [animationClass, setAnimationClass] = useState('');
    
    useEffect(() => {
        setAnimationClass('anim-enter');
    }, []);

    // Define classes de estilo para os elementos de texto
    const h2Classes = `text-2xl font-semibold ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`;
    const pClasses = `leading-relaxed ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`;
    const listClasses = `list-disc space-y-2 pl-6 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`;
    const strongClasses = `${theme === 'escuro' ? 'text-gray-100' : 'text-gray-900'}`;

    return (
        // Layout Padrão (Sidebars + Fundo Dinâmico)
        <div className={`font-poppins relative min-h-screen ${
            theme === 'escuro' ? 'bg-gray-900' : 'bg-gradient-to-b from-[#F9EFFF] to-white'
        }`}>
            
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    
                    <StaticCard title="Sobre o Projeto Lires" theme={theme}>
                        
                        {/* CORREÇÃO: Usando <h2> e <ul> para estrutura correta */}
                        <h2 className={h2Classes}>O que é o Lires?</h2>
                        <p className={pClasses}>
                            O Lires (Libras para Todos) é um Trabalho de Conclusão de Curso (TCC) 
                            desenvolvido [Seu Nome/Nome da Equipe] para [Nome da Instituição]. 
                            Nosso objetivo é criar uma plataforma de aprendizado da Língua Brasileira 
                            de Sinais (Libras) que seja acessível, gamificada e interativa.
                        </p>
                        
                        <h2 className={h2Classes}>Motivação</h2>
                        <p className={pClasses}>
                            A motivação para este projeto surgiu da necessidade de [Sua Motivação]. 
                            Percebemos que [Seu Problema]. Com o Lires, buscamos [Sua Solução].
                        </p>
                        
                        <h2 className={h2Classes}>Tecnologias Utilizadas</h2>
                        <ul className={listClasses}>
                            <li><strong className={strongClasses}>Frontend:</strong> React.js com Vite e TailwindCSS.</li>
                            <li><strong className={strongClasses}>Estado:</strong> React Context API (useContext) para gerenciamento global.</li>
                            <li><strong className={strongClasses}>Persistência:</strong> Simulação de banco de dados via LocalStorage.</li>
                            <li><strong className={strongClasses}>Roteamento:</strong> React Router v6.</li>
                        </ul>
                    </StaticCard>
                    
                </main>
            </div>
        </div>
    );
}