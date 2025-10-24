import React from 'react';

// FIX: Importar os ícones corretamente
import fireIconImg from '../assets/foguinho.png';
import lcoinIconImg from '../assets/lcoin.png';
import heartIconImg from '../assets/coracaoo.png';

const UserStat = ({ iconSrc, value }) => (
    <div className="flex items-center gap-1.5">
        <img src={iconSrc} alt="Ícone de Status" className="w-7 h-7" />
        <span className="font-bold text-slate-700 text-lg">{value}</span>
    </div>
);

export default function MobileTopBar() {
    return (
        // Este componente só aparece em telas menores que 'lg' (lg:hidden)
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 z-40">
            <div className="max-w-screen-xl mx-auto px-4 h-full flex justify-end items-center">
                <div className="flex items-center gap-4">
                    {/* Agora usa as variáveis importadas */}
                    <UserStat iconSrc={fireIconImg} value="1" />
                    <UserStat iconSrc={lcoinIconImg} value="50" />
                    <UserStat iconSrc={heartIconImg} value="5" />
                </div>
            </div>
        </header>
    );
}