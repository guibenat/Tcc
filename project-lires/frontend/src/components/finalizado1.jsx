// src/components/finalizado1.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from './SettingsContext'; // Para o tema

export default function Finalizado1() {
    const location = useLocation();
    const { theme } = useSettings();
    // Pega os dados enviados pelo ActivityPlayer
    const { errorCount, totalExercises } = location.state || { errorCount: 0, totalExercises: '?' };

    const handleContinue = () => {
        // --- ESTA É A PARTE MAIS IMPORTANTE ---
        // Força um recarregamento da página para a home.
        // Isso garante que o SettingsContext leia o progresso
        // que acabamos de salvar.
        window.location.href = '/home';
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${theme === 'escuro' ? 'bg-gray-900 text-slate-200' : 'bg-white text-gray-800'}`}>
            <div className={`p-8 rounded-2xl shadow-lg text-center ${theme === 'escuro' ? 'bg-gray-800' : 'bg-slate-50'}`}>
                <h1 className="text-4xl font-bold text-purple-500 mb-4">
                	 Lição Concluída!
                </h1>
                <p className="text-xl mb-2">
                	 Você completou a lição.
                </p>
                <p className="text-lg mb-6">
                	 Acertos: {totalExercises - errorCount} / {totalExercises}
                </p>
            	 
            	 {/* Botão que força o recarregamento */}
            	 <button 
            	 	 onClick={handleContinue} 
          	 	 	 className="text-lg font-semibold py-3 px-12 border-none rounded-2xl cursor-pointer text-white transition transform duration-200 hover:scale-105"
          	 	 	 style={{ backgroundImage: 'linear-gradient(90deg, #b081ff, #59b1ff)', boxShadow: '0 4px 15px rgba(90, 177, 255, 0.4)' }}
          	 	 >
          	 		 	 Continuar
          	 	 </button>
        	 	 </div>
        </div>
    );
}