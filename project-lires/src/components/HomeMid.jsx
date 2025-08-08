import LoginLogo from '../assets/LoginLogo.png'
import Brasil from '../assets/Brasil.jpg';
import Lires from '../assets/Lires.png';

export default function HomeMid() {
  

    return (
        
        
      <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
        <div className="flex flex-row items-center font-bold text-start text-[#9CD6C8]">
            <img className='h-64 w-64' src={LoginLogo} alt="" />
            <div className='flex flex-col gap-5'>
            <h1 className=''>Aprender libras  ficou mais facil e divertido com a gente!</h1>
            <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">Começe Agora</button>
            <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">Começe Agora</button>
            </div>
        </div>
      </main>
    );
  }