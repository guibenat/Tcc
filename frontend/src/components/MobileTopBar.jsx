import React from 'react';
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';
import { useSettings } from '../components/SettingsContext';

// Componente para exibir cada status (vidas, lcoins, streak)

const UserStat = ({ iconSrc, value, theme }) => (
    <div className="flex items-center gap-1.5">
        <img src={iconSrc} alt="Ícone de Status" className="w-7 h-7" />
        {/* O 'theme' é usado aqui pra cor do texto se adaptar ao modo escuro/claro */}
        <span className={`font-bold text-lg ${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`}>{value}</span>
    </div>
);


export default function MobileTopBar() {
    const { theme, lives, lcoins, dailyStreak } = useSettings();

    return (
        <header className={`
            lg:hidden fixed top-0 left-0 right-0 h-16 backdrop-blur-sm z-40
            ${theme === 'escuro' 
                ? 'bg-gray-900/80 border-b border-gray-700' 
                : 'bg-white/80 border-b border-slate-200'} // Estilo modo claro
        `}>
            <div className="max-w-screen-xl mx-auto px-4 h-full flex justify-end items-center">
                <div className="flex items-center gap-4">
                    
                    <UserStat iconSrc={fireIconImg} value={dailyStreak} theme={theme} />
                    <UserStat iconSrc={lcoinIconImg} value={lcoins} theme={theme} />
                    <UserStat iconSrc={heartIconImg} value={lives} theme={theme} />
                    
                </div>
            </div>
        </header>
    );
}