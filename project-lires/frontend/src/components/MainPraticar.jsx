import Robo from '../assets/RoboMascoteRosa.png'
import DedoAP from '../assets/DedoApontando.png'
export default function MainPraticar() {
  

  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto min-h-full">
        <div className="flex flex-col items-center w-screen bg-white-400 px-5 py-11">
                
              {/* Bloco do robô */}
              <header className="flex justify-center ">
                <div className="flex flex-row-reverse items-center justify-between bg-gradient-to-b from-pink-300 to-purple-400 rounded-2xl p-6 w-[800px] h-[300px] shadow-lg">
                  <img src={Robo} alt='' className="justify-between " />
        
                  <div className="flex flex-col items-start">
                    <h2 className="text-white font-bold text-5xl">
                      Veja o que você <br /> Aprendeu hoje
                    </h2>
                    <button className="mt-20 px-20 py-2 bg-purple-300 text-white font-semibold rounded-full shadow hover:bg-purple-400 transition">
                      Relembre
                    </button>
                  </div>
                </div>
              </header>
              
              <button className='mt-20 px-32 py-2  bg-purple-300 text-white font-semibold rounded-full shadow hover:bg-purple-400 transition flex flex-row-reverse items-start justify-bet'>
               <img src={DedoAP} alt='' className='w-20 px-30  '></img>
        
                <h2 className='text-white font-bold text-5xl mt-3'>Alfabeto</h2>
                
              </button>
        
               <button className='mt-20 px-32 py-2  bg-purple-300 text-white font-semibold rounded-full shadow hover:bg-purple-400 transition flex flex-row-reverse items-center justify-between'>
               <img src={DedoAP} alt='' className='w-20 px-30 '></img>
        
                <h2 className='text-white font-bold text-5xl'>Vlibras</h2>
                
              </button>
              
              
            </div>
      

    </main>
  );
}