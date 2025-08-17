import React from "react";
import Presente from '../assets/Presente.png'
import { FaGift } from "react-icons/fa"; 
import { FaCoins } from "react-icons/fa"; 
import SuperCaixaGema from '../assets/SuperCaixaGema.png';
import CaixaGema from '../assets/CaixaGema.png';
import CaixaGrandeGema from '../assets/caixaGrandeGema.png';
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

export default function Loja() {
    return (
        <div className="flex flex-row w-full bg-[#f8f5ff]"> 
            {/* Fundo lilás claro na tela inteira */}
            
            <SidebarLeft/>

            {/* Conteúdo do meio */}
            <div className="flex flex-col gap-6 w-full p-6">
       
                {/* Banner Premium */}
                <div className="bg-gradient-to-r from-purple-400 to-purple-200 rounded-2xl p-6 text-white shadow-lg">
                    <h2 className="text-xl font-bold">Seja Lires premium</h2>
                    <p className="text-sm">Aprenda se divertindo e com mais vantagens</p>
                    <button className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition">
                        Saiba Mais
                    </button>
                </div>

                {/* Lcoins */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <FaCoins className="text-purple-500 text-2xl" />
                        <span className="text-lg font-semibold text-purple-700">Lcoins</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {/* Pacote 1 */}
                        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl border-2 border-[#9CD6C8] shadow hover:scale-105 transition">
                            <img src={CaixaGema} alt="1200 Lcoins" className="w-16 h-16 mb-2" />
                            <span className="font-bold">1200</span>
                            <span className="text-sm">R$ 27,90</span>
                        </div>
                        {/* Pacote 2 */}
                        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl border-2 border-[#9CD6C8] shadow hover:scale-105 transition">
                            <img src={CaixaGrandeGema} alt="3000 Lcoins" className="w-16 h-16 mb-2" />
                            <span className="font-bold">3000</span>
                            <span className="text-sm">R$ 54,90</span>
                        </div>
                        {/* Pacote 3 */}
                        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl border-2 border-[#9CD6C8] shadow hover:scale-105 transition">
                            <img src={SuperCaixaGema} alt="6500 Lcoins" className="w-16 h-16 mb-2" />
                            <span className="font-bold">6500</span>
                            <span className="text-sm">R$ 109,90</span>
                        </div>
                    </div>
                </div>

                {/* Bônus diário */}
                <div className="bg-gradient-to-r from-purple-400 to-purple-200 rounded-2xl p-4 flex items-center gap-4 shadow-lg">
                    <img src={Presente} alt="" className="w- h-28" />
                    <span className="text-white font-bold text-5xl">
                        Ganhe um bônus aleatório a cada dia
                    </span>
                </div>
                
            </div>

            {/* Lado direito */}
            <SidebarRight/>
        </div>
    );
}