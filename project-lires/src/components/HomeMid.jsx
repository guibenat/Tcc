import GarotaNotebook from '../assets/GarotaNotebook.png'
import RoboPessoas from '../assets/RoboPessoas.png'
import LoginLogo from '../assets/LoginLogo.png'
import Brasil from '../assets/Brasil.jpg';
import Lires from '../assets/Lires.png';

export default function HomeMid() {
  

    return (
      <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">

<div className="flex flex-row items-center font-bold text-start text-[#9CD6C8]">
            <img className='h-72 w-64' src={LoginLogo} alt="" />
            <div className='flex flex-col gap-5'>
            <h1 className=''>Aprender libras  ficou mais facil e divertido com a gente!</h1>
            <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">Começe Agora</button>
            <button className="text-xl px-9 py-1 bg-white transition-all duration-300 text-[#7B68EE] font-bold rounded-full border border-[#9CD6C8] ">Já tenho uma conta</button>
            </div>
        </div>

      {/* Bloco 1 */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl">
          <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#9CD6C8]">
                  Acessível, Inclusivo e Transformador.
              </h2>
              <p className="mt-4 text-pink-400 font-medium">
                  Aprender Libras com o Lires abre um mundo de comunicação e conexão! 
                  Com aulas claras e interativas, você descobre como construir pontes 
                  e promover a verdadeira inclusão. Comece sua jornada transformadora hoje mesmo!
              </p>
          </div>
          <img 
              src={RoboPessoas} 
              alt="Robô com pessoas" 
              className="rounded-lg w-full md:w-80"
          />
      </div>
      
      {/* Bloco 2 */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mt-16">
          <img 
              src={GarotaNotebook} 
              alt="Garota usando notebook" 
              className="rounded-lg w-full md:w-80"
          />
          <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#9CD6C8]">
                  Mantenha a conexão
              </h2>
              <p className="mt-4 text-pink-400 font-medium">
                  É simples criar o hábito de se comunicar em Libras com recursos visuais claros, 
                  atividades interativas e a inspiração da nossa comunidade de aprendizes no Lires.
              </p>
          </div>
      </div>
      
      {/* Título final */}
      <h3 className="mt-20 text-2xl font-bold text-[#9CD6C8] text-center">
          Aprenda libras <br /> com Lires
      </h3>
      </main>
        
     
    );
  }