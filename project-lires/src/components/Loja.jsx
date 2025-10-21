import React from "react";
import { FaCoins } from "react-icons/fa"; 
import SuperCaixaGema from '../assets/SuperCaixaGema.png';
import CaixaGema from '../assets/CaixaGema.png';
import CaixaGrandeGema from '../assets/caixaGrandeGema.png';
import Presente from '../assets/Presente.png';

// Renomeado para LojaContent para clareza
export default function LojaContent() {
    return (
        // Este container agora representa apenas a coluna do meio
        <div className="flex flex-col gap-8 w-full"> 
    
            {/* Banner Premium */}
            <div className="bg-gradient-to-r from-purple-400 to-purple-200 rounded-2xl p-6 text-white shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Seja Lires premium</h2>
                    <p>Aprenda se divertindo e com mais vantagens</p>
                </div>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition whitespace-nowrap">
                    Saiba Mais
                </button>
            </div>

            {/* Lcoins */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <FaCoins className="text-purple-500 text-2xl" />
                    <span className="text-xl font-semibold text-purple-700">Lcoins</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Pacote 1 */}
                    <div className="flex flex-col items-center bg-white/70 p-4 rounded-xl border-2 border-slate-200 shadow-sm hover:scale-105 hover:border-teal-300 transition cursor-pointer">
                        <img src={CaixaGema} alt="1200 Lcoins" className="w-20 h-20 mb-2" />
                        <span className="font-bold text-lg text-slate-700">1200</span>
                        <span className="text-sm text-slate-500">R$ 27,90</span>
                    </div>
                    {/* Pacote 2 */}
                    <div className="flex flex-col items-center bg-white/70 p-4 rounded-xl border-2 border-slate-200 shadow-sm hover:scale-105 hover:border-teal-300 transition cursor-pointer">
                        <img src={CaixaGrandeGema} alt="3000 Lcoins" className="w-20 h-20 mb-2" />
                        <span className="font-bold text-lg text-slate-700">3000</span>
                        <span className="text-sm text-slate-500">R$ 54,90</span>
                    </div>
                    {/* Pacote 3 */}
                    <div className="flex flex-col items-center bg-white/70 p-4 rounded-xl border-2 border-slate-200 shadow-sm hover:scale-105 hover:border-teal-300 transition cursor-pointer">
                        <img src={SuperCaixaGema} alt="6500 Lcoins" className="w-20 h-20 mb-2" />
                        <span className="font-bold text-lg text-slate-700">6500</span>
                        <span className="text-sm text-slate-500">R$ 109,90</span>
                    </div>
                </div>
            </div>

            {/* Bônus diário */}
            <div className="bg-gradient-to-r from-purple-300 to-violet-300 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                <div className="text-white">
                    <h3 className="font-bold text-4xl">Ganhe um bônus</h3>
                    <p className="text-2xl">aleatório a cada dia</p>
                </div>
                <img src={Presente} alt="Caixa de Presente" className="w-28 h-28" />
            </div>
        </div>
    );
}