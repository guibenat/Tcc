import React from 'react';
import LcoinIcon from '../assets/lcoin.png'; // Importar o ícone Lcoin

// Este é o componente do Modal
export function ObjectivesModal({ isOpen, onClose, title, objectives, theme }) {
    if (!isOpen) return null;

    // --- Ícones para Tarefas ---
    const CheckIcon = () => (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const EmptyCheckIcon = () => (
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" style={{ opacity: 0.3 }} />
        </svg>
    );

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 font-poppins"
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
                    <h3 className="text-xl font-bold text-purple-500">{title}</h3>
                    <button 
                        onClick={onClose}
                        className={`text-2xl font-bold transition-colors ${
                            theme === 'escuro' ? 'text-gray-500 hover:text-gray-200' : 'text-gray-400 hover:text-gray-800'
                        }`}
                    >
                        &times;
                    </button>
                </div>

                {/* Lista de Objetivos */}
                <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                    {objectives.map((obj, index) => (
                        <div 
                            key={index} 
                            className={`flex items-center gap-4 p-3 rounded-lg ${
                                theme === 'escuro' ? 'bg-gray-700' : 'bg-gray-100'
                            } ${obj.completed ? 'opacity-100' : 'opacity-60'}`}
                        >
                            {/* Ícone de Check */}
                            <div className="flex-shrink-0">
                                {obj.completed ? <CheckIcon /> : <EmptyCheckIcon />}
                            </div>

                            {/* Descrição da Tarefa */}
                            <div className="flex-grow">
                                <p className={`font-semibold ${theme === 'escuro' ? 'text-white' : 'text-gray-800'}`}>
                                    {obj.description}
                                </p>
                            </div>

                            {/* Recompensa */}
                            <div className={`flex-shrink-0 flex items-center gap-1 p-1.5 rounded-md ${
                                theme === 'escuro' ? 'bg-gray-800' : 'bg-white'
                            }`}>
                                <img src={LcoinIcon} alt="Lcoins" className="w-5 h-5" />
                                <span className="font-bold text-sm text-yellow-600">+{obj.reward}</span>
                            </div>
                        </div>
                    ))}

                    {objectives.length === 0 && (
                        <p className={`p-6 text-center ${theme === 'escuro' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Nenhum objetivo definido para esta categoria.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}