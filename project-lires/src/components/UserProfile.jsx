import React from 'react';
// ALTERADO: Caminhos dos imports corrigidos
import Xp from '../src/assets/xp.png';
import Foguinho from '../src/assets/foguinho.png';
import Sequencia from '../src/assets/sequencia.png';
import Lapis from '../src/assets/lapis.png';
import Perfil from '../src/assets/Perfil.png';

const UserProfile = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg mt-8 font-extrabold">
      
      {/* Capa com avatar */}
      <div className="relative bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] rounded-t-xl h-36 flex items-center justify-center font-extrabold">
        <img
          src={Perfil}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-white"
        />
        <span className="absolute bottom-2 right-4 text-yellow-600 text-xl cursor-pointer"><img src={Lapis} alt="" /></span>
      </div>

      {/* Nome e info */}
      <div className="text-center mt-4 font-extrabold">
        <h2 className="text-xl font-extrabold text-purple-800">@cauasilva_2006 <span className="cursor-pointer">✏️</span></h2>
        <p className="text-sm text-gray-600 mt-1 font-extrabold">Por aqui desde junho de 2025</p>
        <div className="flex justify-center mt-2">
          <img src="https://flagcdn.com/w40/br.png" alt="Bandeira do Brasil" className="w-6 h-4" />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-6 px-4 font-extrabold">
        <h3 className="text-lg font-extrabold text-purple-700 mb-3">Estatísticas</h3>
        
        <div className="grid grid-cols-2 gap-4">
          
          {/* Sequência */}
          <div className="bg-pink-100 rounded-xl p-4 text-center shadow font-extrabold">
            <div className="text-2xl"><img src={Foguinho} alt="" /></div>
            <p className="text-sm font-extrabold text-gray-600">Sequência</p>
            <p className="text-2xl font-extrabold text-orange-500">32</p>
          </div>

          {/* Dias acumulados */}
          <div className="bg-purple-100 rounded-xl p-4 text-center shadow font-extrabold">
            <div className="text-2xl"><img src={Sequencia} alt="" /></div>
            <p className="text-sm font-extrabold text-gray-600">Dias Acumulados</p>
            <p className="text-2xl font-extrabold text-purple-600">65</p>
          </div>

          {/* XP */}
          <div className="bg-yellow-100 rounded-xl p-4 text-center shadow items-center font-extrabold">
            <div className="text-2xl "><img src={Xp} alt="" /></div>
            <p className="text-sm font-extrabold text-gray-600">XP</p>
            <p className="text-2xl font-extrabold text-yellow-600">32</p>
          </div>

          {/* Dias acumulados repetido */}
          <div className="bg-purple-100 rounded-xl p-4 text-center shadow ">
            <div className="text-2xl">📅</div>
            <p className="text-sm text-gray-600 font-extrabold">Dias Acumulados</p>
            <p className="text-2xl font-extrabold text-purple-600">65</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;