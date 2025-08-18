import React from "react";
import Aprendizado from "../assets/Aprendizado.png"; // Ícone aprendizado
import Social from "../assets/Social.png"; // Ícone social
import Consistência from "../assets/Consistencia.png"; // Ícone consistência
import Exploração from "../assets/Exploração.png"; // Ícone exploração
import Perfil from "../assets/Perfil.png";
import Bandeira from "../assets/Brasil.jpg"; // Bandeira do Brasil
import Foguinho from '../assets/Foguinho.png'
import Medalha from "../assets/Xp.png"; // Ícone XP
import Trofeu from "../assets/Trofeu.png"; // Ícone conquista
import IconeDias from "../assets/Sequencia.png"; // Ícone dias acumulados

export default function User() {
  return (
    <main className="flex flex-col items-center p-6 bg-white min-h-screen w-full">
      {/* Banner */}
      <div className="w-full max-w-3xl bg-gradient-to-tr from-[#F6B8FF] to-[#FFFFFF] rounded-3xl p-6 flex justify-center relative">
        <img src={Perfil} alt="Avatar" className="h-40 w-40 object-contain" />
        <button className="absolute right-6 bottom-6 bg-yellow-300 p-2 rounded-full shadow">
          ✏️
        </button>
      </div>

      {/* Nome e info */}
      <div className="w-full max-w-3xl mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-[#7B68EE]">@cauasilva_2006</h1>
          <button className="text-sm">✏️</button>
          <img src={Bandeira} alt="Brasil" className="w-6 h-6 rounded-sm" />
        </div>
        <p className="text-[#7B68EE]">Por aqui desde junho de 2025</p>

        {/* Seguidores */}
        <div className="flex gap-4 border-b border-purple-300 pb-2 mt-2">
          <span className="font-bold text-purple-600">10</span>
          <span className="text-gray-400">Seguidores</span>
          <span className="font-bold text-purple-600">10</span>
          <span className="text-gray-400">Seguindo</span>
        </div>
      </div>

      {/* Conquistas */}
      <div className="w-full max-w-3xl mt-6">
        <h2 className="text-xl font-bold text-[#7B68EE] mb-2">Conquistas</h2>
        <div className="flex items-center gap-3 bg-gradient-to-tr from-[#F7FF00] to-[#E7F6C9] rounded-xl p-4 shadow">
          <img src={Trofeu} alt="Conquista" className="w-10 h-10" />
          <div>
            <p className="font-bold text-[#7B68EE]">
              Aprendeu 100 sinais essa semana
            </p>
            <span className="text-[#7B68EE] cursor-pointer">
              Clique para ver mais
            </span>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="w-full max-w-3xl mt-6">
        <h2 className="text-xl font-bold text-[#7B68EE] mb-4">Estatísticas</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Sequência */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#FFFFFF] to-[#F6B8FF] border rounded-xl shadow p-4">
            <img src={Foguinho} alt="Sequência" className="w-10 h-10" />
            <div>
              <p className="font-bold text-orange-500">Sequência</p>
              <span className="text-orange-500 text-lg font-bold">32</span>
            </div>
          </div>

          {/* Dias acumulados 1 */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#FFFFFF] to-[#F6B8FF] rounded-xl shadow p-4">
            <img src={IconeDias} alt="Dias" className="w-16 h-16" />
            <div>
              <p className="font-bold text-purple-800">Dias Acumulados</p>
              <span className="text-purple-800 text-lg font-bold">65</span>
            </div>
          </div>

          {/* XP */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#FFFFFF] to-[#F6B8FF] border rounded-xl shadow p-4">
            <img src={Medalha} alt="XP" className="w-14 h-14" />
            <div>
              <p className="font-bold text-orange-500">XP</p>
              <span className="text-orange-500 text-lg font-bold">32</span>
            </div>
          </div>

          {/* Dias acumulados 2 */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#FFFFFF] to-[#F6B8FF] rounded-xl shadow p-4">
            <img src={IconeDias} alt="Dias" className="w-16 h-16" />
            <div>
              <p className="font-bold text-purple-800">Dias Acumulados</p>
              <span className="text-purple-800 text-lg font-bold">65</span>
            </div>
          </div>
        </div>

        {/*Meta diaria*/}
        <div className="w-full max-w-3xl mt-6">
          <h2 className="font-bold text-[#7B68EE]">Metas</h2>
          <h4 className="text-[#7B68EE]">Sua meta diaria</h4>
          <div className="w-full max-w-3xl mt-6">
        <h2 className="text-xl font-bold text-[#7B68EE] mb-2">Conquistas</h2>
        <div className="flex items-center gap-3 bg-[linear-gradient(to_right,#A4C5F6,#052794)]  rounded-xl p-4 shadow">
          <img src={Perfil} alt="Conquista" className="w-16 h-16" />
          <div>
            <p className="font-bold text-[#FFFFFF]">
              10 Min por dia
            </p>
          </div>
        </div>
      </div>
        </div>

        {/*Objetivos*/}
        <div className="w-full max-w-3xl mt-6 ">
        <h2 className="text-xl font-bold text-[#7B68EE] mb-2">Objetivos</h2>
        <div className="flex items-center gap-3 bg-gradient-to-tr from-[#A4C5F6] to-[#EFF1FA] rounded-xl p-4 shadow">
          <img src={Aprendizado} alt="Conquista" className="w-20 h-20" />
          <div>
            <p className="font-bold text-[#7B68EE]">
              Aprendeu 100 sinais essa semana
            </p>
            <span className="text-[#7B68EE] cursor-pointer">
              Clique para ver mais
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 bg-gradient-to-tr from-[#A4C5F6] to-[#EFF1FA] rounded-xl p-4 shadow ">
            <img src={Social} alt="Conquista" className="w-20 h-20" />
            <div>
              <p className="font-bold text-[#7B68EE]">
                Aprendeu 100 sinais essa semana
              </p>
              <span className="text-[#7B68EE] cursor-pointer">
                Clique para ver mais
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6"> 
          <div className="flex items-center gap-3 bg-gradient-to-tr from-[#A4C5F6] to-[#EFF1FA] rounded-xl p-4 shadow ">
            <img src={Consistência} alt="Conquista" className="w-20 h-20" />
            <div>
              <p className="font-bold text-[#7B68EE]">
                Aprendeu 100 sinais essa semana
              </p>
              <span className="text-[#7B68EE] cursor-pointer">
                Clique para ver mais
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6"> 
          <div className="flex items-center gap-3 bg-gradient-to-tr from-[#A4C5F6] to-[#EFF1FA] rounded-xl p-4 shadow ">
            <img src={Exploração} alt="Conquista" className="w-20 h-20" />
            <div>
              <p className="font-bold text-[#7B68EE]">
                Aprendeu 100 sinais essa semana
              </p>
              <span className="text-[#7B68EE] cursor-pointer">
                Clique para ver mais
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}