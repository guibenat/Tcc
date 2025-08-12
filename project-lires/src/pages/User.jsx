import React from "react";
import Perfil from "../assets/Perfil.png";
import Bandeira from "../assets/Brasil.jpg"; // Bandeira do Brasil
import Fogo from "../assets/Foguinho.png"; // Ícone de sequência
import Medalha from "../assets/Xp.png"; // Ícone XP
import Trofeu from "../assets/Trofeu.png"; // Ícone conquista
import IconeDias from "../assets/Sequencia.png"; // Ícone dias acumulados

export default function User() {
  return (
    <main className="flex flex-col items-center p-6 bg-white min-h-screen w-full">
      {/* Banner */}
      <div className="w-full max-w-3xl bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl p-6 flex justify-center relative">
        <img src={Perfil} alt="Avatar" className="h-40 w-40 object-contain" />
        <button className="absolute right-6 bottom-6 bg-yellow-300 p-2 rounded-full shadow">
          ✏️
        </button>
      </div>

      {/* Nome e info */}
      <div className="w-full max-w-3xl mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">@cauasilva_2006</h1>
          <button className="text-sm">✏️</button>
          <img src={Bandeira} alt="Brasil" className="w-6 h-6 rounded-sm" />
        </div>
        <p className="text-gray-500">Por aqui desde junho de 2025</p>

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
        <h2 className="text-xl font-bold text-purple-700 mb-2">Conquistas</h2>
        <div className="flex items-center gap-3 bg-yellow-300 rounded-xl p-4 shadow">
          <img src={Trofeu} alt="Conquista" className="w-10 h-10" />
          <div>
            <p className="font-bold text-purple-800">
              Aprendeu 100 sinais essa semana
            </p>
            <span className="text-green-800 cursor-pointer">
              Clique para ver mais
            </span>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="w-full max-w-3xl mt-6">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Estatísticas</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Sequência */}
          <div className="flex items-center gap-3 bg-white border rounded-xl shadow p-4">
            <img src={Fogo} alt="Sequência" className="w-10 h-10" />
            <div>
              <p className="font-bold text-orange-500">Sequência</p>
              <span className="text-orange-500 text-lg font-bold">32</span>
            </div>
          </div>

          {/* Dias acumulados 1 */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl shadow p-4">
            <img src={IconeDias} alt="Dias" className="w-10 h-10" />
            <div>
              <p className="font-bold text-purple-800">Dias Acumulados</p>
              <span className="text-purple-800 text-lg font-bold">65</span>
            </div>
          </div>

          {/* XP */}
          <div className="flex items-center gap-3 bg-white border rounded-xl shadow p-4">
            <img src={Medalha} alt="XP" className="w-10 h-10" />
            <div>
              <p className="font-bold text-orange-500">XP</p>
              <span className="text-orange-500 text-lg font-bold">32</span>
            </div>
          </div>

          {/* Dias acumulados 2 */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl shadow p-4">
            <img src={IconeDias} alt="Dias" className="w-10 h-10" />
            <div>
              <p className="font-bold text-purple-800">Dias Acumulados</p>
              <span className="text-purple-800 text-lg font-bold">65</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}