import React from 'react';
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';
// <<< ALTERAÇÃO 1: Importar useSettings >>>
import { useSettings } from '../components/SettingsContext';

// <<< ALTERAÇÃO 2: Passar 'theme' como prop >>>
const UserStat = ({ iconSrc, value, theme }) => (
    <div className="flex items-center gap-1.5">
        <img src={iconSrc} alt="Ícone de Status" className="w-7 h-7" />
        {/* <<< ALTERAÇÃO 3: Ajustar cor do texto >>> */}
        <span className={`font-bold text-lg ${theme === 'escuro' ? 'text-slate-300' : 'text-slate-700'}`}>{value}</span>
    </div>
);

export default function MobileTopBar() {
    // <<< ALTERAÇÃO 4: Obter o tema >>>
    const { theme } = useSettings();

    return (
        // <<< ALTERAÇÃO 5: Ajustar fundo e borda >>>
        <header className={`
            lg:hidden fixed top-0 left-0 right-0 h-16 backdrop-blur-sm z-40
            ${theme === 'escuro' 
              ? 'bg-gray-900/80 border-b border-gray-700' 
              : 'bg-white/80 border-b border-slate-200'}
        `}>
            <div className="max-w-screen-xl mx-auto px-4 h-full flex justify-end items-center">
                <div className="flex items-center gap-4">
                    {/* <<< ALTERAÇÃO 6: Passar 'theme' para UserStat >>> */}
                    <UserStat iconSrc={fireIconImg} value="1" theme={theme} />
                    <UserStat iconSrc={lcoinIconImg} value="50" theme={theme} />
                    <UserStat iconSrc={heartIconImg} value="5" theme={theme} />
                </div>
            </div>
        </header>
    );
}