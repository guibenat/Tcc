import Vermelho from '../assets/Vermelho.png';
import Azul from '../assets/Azul.png';
import Marron from '../assets/Marron.png';
import Verde from '../assets/Verde.png';

export default function DirPers() {
  return (
    <aside className="w-30 bg-white border-1 border-gray-100 flex flex-col p-4 space-y-7">
        <div className="border-4 border-[#9CD6C8]  border-300 rounded-3xl p-4">
            <p className='text-lg font-extrabold  items-center ml-24 text-[#9CD6C8]'>Vestuario</p>
            <h1 className='text-lg font-extrabold  items-center ml-24 text-[#9CD6C8]'>Personagens</h1>
            <div className='flex items-center -ml-4'>
                <div className="flex flex-col items-center h-40 w-40"><img src={Verde} alt=""/></div>
                <div className="flex flex-col items-center h-40 w-40"><img src={Marron} alt=""/></div>
            </div>
                        <div className='flex items-center -ml-4'>
                        <div className="flex flex-col items-center h-40 w-40"><img src={Vermelho} alt=""/></div>
                        <div className="flex flex-col items-center h-40 w-40"><img src={Azul} alt=""/></div>
                        </div>
                        
                        </div>
                      <div className='flex items-center ml-20 mt-7'>
                        <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)]  text-white font-bold rounded-full ">
                              Continuar
                     </button>
                     </div>
    </aside>

  );
}