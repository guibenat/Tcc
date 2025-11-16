// src/components/InfoModal.jsx

import React from 'react';
import { useSettings } from './SettingsContext';
import logoLiresClaraImg from '../assets/logo-lires.png';
import logoLiresEscuraImg from '../assets/logo-lires-branca.png'; 

// --- Conteúdos Estáticos (Extraídos do ABNT LIRES.docx) ---

// Conteúdo para "Sobre"
const SobreContent = ({ theme }) => {
    const h2Classes = `text-2xl font-semibold ${theme === 'escuro' ? 'text-purple-300' : 'text-purple-600'}`;
    const pClasses = `leading-relaxed ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`;
    const listClasses = `list-disc space-y-2 pl-6 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`;
    const strongClasses = `${theme === 'escuro' ? 'text-gray-100' : 'text-gray-900'}`;
    return (
        <div className="space-y-6">
            <h2 className={h2Classes}>O que é o Lires?</h2>
            <p className={pClasses}>
                O presente Trabalho de Conclusão de Curso tem como objetivo o desenvolvimento de um site para 
                auxiliar pessoas com deficiência auditiva e ajudá-las a se desenvolver no meio educacional 
                tendo essa condição.
            </p>
            <p className={pClasses}>
                O projeto pretende também oferecer um espaço de interação para os usuários, pais e educadores, 
                visando fortalecer aprendizagem, união e experiências. 
            </p>
            
            <h2 className={h2Classes}>Objetivo Geral</h2>
            <p className={pClasses}>
                Desenvolver uma plataforma educativa que promova o aprendizado da Língua Brasileira de Sinais (Libras) 
                por meio de jogos interativos e recursos educativos acessíveis, oferecendo suporte para crianças 
                com deficiência auditiva e seus pais. 
            </p>

            <h2 className={h2Classes}>Tecnologias Utilizadas (Conforme TCC)</h2>
            <ul className={listClasses}>
                <li><strong className={strongClasses}>Frontend:</strong> Ferramentas de programação TailwindCss e React.</li>
                <li><strong className={strongClasses}>Backend:</strong> Gerenciamento da parte lógica de negócio, desenvolvida no Node.js e Express como framework.</li>
                <li><strong className={strongClasses}>Banco de Dados:</strong> Utilizamos para armazenar informações de usuários, histórico de acesso e os conteúdos disponíveis. A ferramenta chave foi o Mysql workbench.</li>
            </ul>
        </div>
    );
};

// Conteúdo para "Privacidade"
const TermosPrivacidadeContent = ({ theme }) => {
    const pClasses = `leading-relaxed ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`;
    const listClasses = `list-decimal list-outside space-y-6 pl-6`;
    const strongClasses = `block text-xl font-semibold mb-2 ${theme === 'escuro' ? 'text-white' : 'text-gray-900'}`;
    const pListClasses = `mt-2 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`;
    
    return (
        <div className="space-y-6">
            <p className={pClasses}>
                Esta política detalha como os dados dos usuários são coletados, utilizados e 
                protegidos dentro da plataforma Lires, conforme a metodologia do TCC.
            </p>
            <ol className={listClasses}>
                <li>
                    <strong className={strongClasses}>Coleta de Dados</strong>
                    <p className={pListClasses}>
                        A coleta de dados adotada para avaliar o site foi realizada através de entrevistas 
                        com pessoas que possuem essa deficiência e muitos testes.
                    </p>
                    <p className={pListClasses}>
                        Os testes permitiram observar como o público-alvo se adaptaria com o site e se 
                        fosse preciso fazer mudanças mais acessíveis, fornecendo dados qualitativos e 
                        quantitativos. 
                    </p>
                </li>
                <li>
                    <strong className={strongClasses}>Armazenamento de Dados (Conforme TCC)</strong>
                    <p className={pListClasses}>
                        Utilizamos o [MySQL Workbench] para armazenar informações de usuários, 
                        histórico de acesso e os conteúdos disponíveis.
                    </p>
                    {/* Nota: O código atual usa LocalStorage, mas o TCC menciona MySQL. */}
                </li>
                <li>
                    <strong className={strongClasses}>Acessibilidade e Design</strong>
                    <p className={pListClasses}>
                        O design desenvolvido seguiu critérios de acessibilidade para garantir a 
                        compreensão do conteúdo e para fácil usabilidade de crianças com diferentes 
                        de níveis dessa deficiência, um exemplo é a escolha de cores com contraste 
                        adequado, a tipografia clara e legível e a presença de tradutores de 
                        vídeos legendados em Libras. 
                    </p>
                </li>
            </ol>
        </div>
    );
};

// Conteúdo para "Termos de Uso"
const TermosUsoContent = ({ theme }) => {
    const pClasses = `leading-relaxed ${theme === 'escuro' ? 'text-gray-300' : 'text-gray-700'}`;
    const listClasses = `list-decimal list-outside space-y-6 pl-6`;
    const strongClasses = `block text-xl font-semibold mb-2 ${theme === 'escuro' ? 'text-white' : 'text-gray-900'}`;
    const pListClasses = `mt-2 ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-600'}`;
    return (
        <div className="space-y-6">
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
                    <strong className={strongClasses}>Simulação de Pagamento e Gamificação</strong>
                    <p className={pListClasses}>
                        Para a gamificação e engajamento, implementamos estratégias como quizzes, 
                        pontuações com prêmios e planos pagos com conteúdos exclusivos.
                    </p>
                    <p className={pListClasses}>
                        Todas as funcionalidades de "Loja", "Lcoins" e "Assinatura Master" 
                        são simulações. Nenhuma transação financeira real é processada. 
                        O fluxo de pagamento (PIX) é demonstrativo e não transfere valores monetários.
                    </p>
                </li>
                <li>
                    <strong className={strongClasses}>Uso de Conteúdo de Terceiros</strong>
                    <p className={pListClasses}>
                        Para garantir uma rápida entrada no mercado, o site utiliza conteúdo de 
                        terceiros (vídeos e assets). A visão futura é investir em nossos 
                        próprios criadores de conteúdo e professores qualificados.
                    </p>
                </li>
            </ol>
        </div>
    );
};

// --- Componente Modal ---
export function InfoModal({ isOpen, onClose, type }) {
    const { theme } = useSettings();
    if (!isOpen) return null;

    let title = '';
    let content = null;

    // Define o título e o conteúdo com base no 'type'
    if (type === 'sobre') {
        title = 'Sobre o Projeto Lires';
        content = <SobreContent theme={theme} />;
    } else if (type === 'privacidade') {
        title = 'Política de Privacidade';
        content = <TermosPrivacidadeContent theme={theme} />;
    } else if (type === 'termos') {
        title = 'Termos de Uso';
        content = <TermosUsoContent theme={theme} />;
    }

    return (
        // Overlay
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 font-poppins"
            onClick={onClose} 
        >
            {/* Card do Modal */}
            <div 
                className={`w-full max-w-3xl h-[90vh] rounded-2xl shadow-xl flex flex-col ${
                    theme === 'escuro' ? 'bg-gray-800 text-slate-100' : 'bg-white text-gray-900'
                }`}
                onClick={e => e.stopPropagation()} 
            >
                {/* Cabeçalho com Logo Centralizado */}
                <div className="flex justify-center items-center p-4 border-b relative">
                    <img 
                        src={theme === 'escuro' ? logoLiresEscuraImg : logoLiresClaraImg} 
                        alt="Lires Logo" 
                        className="h-16" 
                    />
                    <button 
                        onClick={onClose}
                        className={`absolute top-4 right-4 text-2xl font-bold transition-colors ${
                            theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'
                        }`}
                    >
                        &times;
                    </button>
                </div>

                {/* Conteúdo Rolável */}
                <div className="flex-grow p-6 md:p-10 overflow-y-auto space-y-6">
                    <h1 className={`
                        font-bold text-2xl md:text-3xl lg:text-4xl mb-8 
                        ${theme === 'escuro' ? 'text-purple-400' : 'text-purple-600'}
                    `}>
                        {title}
                    </h1>
                    {content}
                </div>
            </div>
        </div>
    );
}