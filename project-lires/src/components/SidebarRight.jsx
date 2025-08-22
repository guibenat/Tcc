import Nike from '../assets/Nike.png'
import Baumissoes from'../assets/Baumissoes.png'
import Raiomissões from'../assets/Raiomissões.png'
import Logo from'../assets/Logo.png'
import Foguinho from'../assets/Foguinho.png';
import lcoin from'../assets/lcoin.png'
import Coracao from'../assets/Coracao.png'
import { Link } from 'react-router-dom';  

export default function SidebarRight() {
  return (
    <aside className="w-30 bg-white border-1 border-gray-100 flex flex-col p-4 space-y-7">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center"><img src={Foguinho} alt=""/> <span className='text-[#E50000] font-bold'>0</span></div>
        <div className="flex flex-col items-center"><img src={lcoin} alt="" /> <span className='text-[#FED67C] font-bold'>0</span></div>
        <div className="flex flex-col items-center"><img src={Coracao} alt="" /> <span className='text-[#E50000] font-bold'>0</span></div>
      </div>
      {/*Primeiro Bloco*/}
      <div className="border-4 border-[#9CD6C8]  border-300 rounded-lg p-4 ">

        <Link to="/Assinatura"> <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">
  Premium
</button></Link>
<p className='text-[#7B68EE] font-extrabold mt-4 mb-1'>Seja premium agora</p>

        <p className="text-xs text-[#988AEA] font-black">Sem anúncios, <br /> vida ilimitada <br /> e skins grátis!</p>
        
        <div className='ml-32 -mt-20'>
        <img className='h-auto w-32' src={Logo} alt="" />
        </div>
        
      </div>
      {/*Segundo Bloco*/}
      <div className="border-4 border-[#9CD6C8]  border-600 rounded-lg p-3 ">
        
        <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">
  Missões
</button>
        
        <p className="font-bold text-[#988AEA]">Complete as missões <br />  e ganhe recompensas</p>
        <div className='flex items-center gap-16 pt-4'>
        <img className='w-12 h-14' src={Raiomissões} alt="" />
        
        <img className='w-12 h-14' src={Baumissoes} alt="" />
        </div>
        <p className="text-lg font-bold text-blue-500 mt-2">10 Lcoins</p>
      </div>

      <div className="border-4 border-[#9CD6C8]  border-600 rounded-lg p-4">
        <h2 className="font-bold text-[#988AEA] ml-28 mb-4">Anúncio</h2>
        <img src={Nike} alt="Anúncio" className="rounded h-48"/>
      </div>

      <footer className="text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
          <a href="">Sobre</a>|
          <a href="#">Loja</a>|
          <a href="#">Investidores</a>|
          <a href="#">Privacidade</a>|
          <a href="#">Termos de uso</a>
        </div>
      </footer>
    </aside>
  );
}