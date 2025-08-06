
import Check from '../assets/Check.png'
import discord from'../assets/discord.png'
import Linha from '../assets/Linha.png'
import Espera from '../assets/Espera.png'
import Progresso from'../assets/Progresso.png'
import Final from'../assets/Final.png'

export default function MainContent() {
  

  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
      
      <button className="flex items-center justify-between -gap-1 px-5 py-auto bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] text-white font-bold rounded-full shadow-md hover:scale-105 transition-all">
  <span>Faça parte da nossa<br />comunidade do discord!</span>
  <img src={discord} alt="Discord" className="w-32 h-32 ml-10" />
</button>
<div className="mt-12 w-full py-4 text-center text-white font-bold text-xl rounded-none">
  <img className='w-full h-full py-4 text-center text-white font-bold text-xl rounded-none' src={Linha} alt="" />
</div>
<div className='justify-between  items-center flex flex-row gap-24 mt-36'>
<img  src={Check} alt="" />
<img  src={Progresso} alt="" />
<img  src={Final} alt="" />
</div>
<div className="mt-12 w-full py-4 text-center text-white font-bold text-xl rounded-none">
  <img className='w-full h-full py-4 text-center text-white font-bold text-xl rounded-none' src={Linha} alt="" />
</div>
<div className='justify-between  items-center flex flex-row gap-24 mt-36'>
<img  src={Espera} alt="" />
<img  src={Espera} alt="" />
<img  src={Espera} alt="" />
</div>
<div className="mt-12 w-full py-4 text-center text-white font-bold text-xl rounded-none">
  <img className='w-full h-full py-4 text-center text-white font-bold text-xl rounded-none' src={Linha} alt="" />
</div>
<div className='justify-between  items-center flex flex-row gap-24 mt-36'>
<img  src={Espera} alt="" />
<img  src={Espera} alt="" />
<img  src={Espera} alt="" />
</div>
   

    </main>
  );
}


