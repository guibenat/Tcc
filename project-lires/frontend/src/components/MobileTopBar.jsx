import React from 'react';
// Ícones
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';
// Puxo o hook 'useSettings' para pegar o tema e os dados do usuário (vidas, lcoins, etc)
// O path `../components` sugere que este arquivo (MobileTopBar) está na pasta `src/`,
// e o Context está em `src/components/`.
import { useSettings } from '../components/SettingsContext';

/**
 * Componente: UserStat
 * É o "mini-display" reutilizável para cada status (fogo, lcoin, coração).
 * Ele é "burro", só recebe os dados e o tema e exibe.
 */
const UserStat = ({ iconSrc, value, theme }) => (
    <div className="flex items-center gap-1.5">
        <img src={iconSrc} alt="Ícone de Status" className="w-7 h-7" />
        {/* O 'theme' é usado aqui pra cor do texto se adaptar ao modo escuro/claro */}
        <span className={`font-bold text-lg ${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`}>{value}</span>
    </div>
);

/**
 * Componente: MobileTopBar
 * Esta é a barra superior que só aparece em telas pequenas (lg:hidden).
 * Ela é 'fixed' (fixa no topo) e mostra os status principais do usuário.
 */
export default function MobileTopBar() {
    // Puxo os dados dinâmicos e o tema do meu contexto global.
    // Assim, os valores de vidas, lcoins e streak são sempre os reais.
    const { theme, lives, lcoins, dailyStreak } = useSettings();

    return (
        // O header é 'fixed' e usa 'backdrop-blur-sm' com 'bg-white/80' (ou bg-gray-900/80)
        // para dar aquele efeito de vidro fosco (blur) quando o usuário rola a página.
        <header className={`
            lg:hidden fixed top-0 left-0 right-0 h-16 backdrop-blur-sm z-40
            ${theme === 'escuro' 
                ? 'bg-gray-900/80 border-b border-gray-700' // Estilo modo escuro
                : 'bg-white/80 border-b border-slate-200'} // Estilo modo claro
        `}>
            {/* 'justify-end' joga os ícones para a direita */}
            <div className="max-w-screen-xl mx-auto px-4 h-full flex justify-end items-center">
                <div className="flex items-center gap-4">
                    
                    {/* Passo os valores DINÂMICOS (dailyStreak, lcoins, lives)
                      e o tema para cada componente UserStat.
                    */}
                    <UserStat iconSrc={fireIconImg} value={dailyStreak} theme={theme} />
                    <UserStat iconSrc={lcoinIconImg} value={lcoins} theme={theme} />
                    <UserStat iconSrc={heartIconImg} value={lives} theme={theme} />
                    
                </div>
            </div>
        </header>
    );
}