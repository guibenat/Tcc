import Menino65AZ from '../assets/sequencia65Lires.png'
import MeninoClockL from '../assets/MeninoClockLires.png'
import PerfilPostar from '../assets/MeninoPerfilPostar.png'

export default function FeedLires() {
  return (<div className="flex flex-col items-center justify-center min-w-full bg-[#f8f5ff] p-6 ">


    <div className="flex justify-center gap-6 max-w-7x1 mx-auto">

      <button className=" flex items-center justify-center w-[200px] h-[40px] bg-[#F6B8FF] rounded-full text-white font-semibold shadow-md">GRUPO</button>

      <br />

      <button className="flex items-center justify-center w-[200px] h-[40px] bg-[#F6B8FF] rounded-full text-white font-semibold shadow-md ">Amigos</button>

    </div>

    <div className="flex items-center gap-10 mt-12">
      <img src={PerfilPostar} alt='' className='w-14  rounded-full' ></img>

      <h2 className="text-purple-500 font-medium text-2xl">O que você aprendeu hoje?</h2>

    </div>

    <div className='flex items-center gap-5 mt-12'>

      <button className='flex items-center justify-center w-[200px] h-[40px] bg-gradient-to-tr from-purple-500 to-pink-300 rounded-full text-white font-semibold shadow-md px-6 py-2 active:scale-95 transition duration-150 '>Evolução</button>

      <button className='flex items-center justify-center w-[200px] h-[40px] bg-gradient-to-tr from-purple-500 to-pink-300 rounded-full text-white font-semibold shadow-md px-6 py-2 active:scale-95 transition duration-150'>Evolução</button>

      <button className='flex items-center justify-center w-[200px] h-[40px] bg-gradient-to-tr from-purple-500 to-pink-300 rounded-full text-white font-semibold shadow-md px-6 py-2 active:scale-95 transition duration-150 '>Evolução</button>

    </div>

    <div className="flex items-center gap-10 md:mt-12 mt-12">

      <img src={PerfilPostar} alt='' className='w-14 md:w-14  rounded-full mr-[650px] ' ></img>

    </div>
    <div className='flex items-center'>
      <h2 className="text-purple-500 font-medium text-2xl md:text-3xl mr-96 -mt-10">@cauasilva_2006</h2>

    </div>

    <div className='flex items-center gap-10 mr-80 mt-12'>
      <h2 className='text-purple-500 font-semibold text-xl'>Hoje eu consegui bater a meta de 65 dias < br />acumulados</h2>
    </div>

    <div className=" mt-10">
      <div className="border-2 border-purple-400 rounded-3xl overflow-hidden shadow-md">
        <img
          src={Menino65AZ} // coloque o caminho da sua imagem aqui
          alt="Meta alcançada"
          className="w-[700px] h-auto"
        />
      </div>
    </div>

    {/*Gustavo Rocha */}

    <div className="flex items-center gap-10 mt-12">

      <img src={PerfilPostar} alt='' className='w-14  rounded-full mr-[650px] ' ></img>

    </div>
    <div className='flex items-center'>
      <h2 className="text-purple-500 font-medium text-2xl mr-80 -mt-10">@gustavorocha_2006</h2>

    </div>

    <div className='flex items-center gap-10 mr-80 mt-12'>
      <h2 className='text-purple-500 font-semibold text-xl'>Minha meta diária de 10  minutos por dia < br />está sendo um sucesso acumulados</h2>
    </div>

    <div className=" mt-10">
      <div className="border-2 border-purple-400 rounded-3xl overflow-hidden shadow-md">
        <img
          src={MeninoClockL} // coloque o caminho da sua imagem aqui
          alt="Meta alcançada"
          className="w-[700px] h-96 "
        />
      </div>
    </div>


  </div>

  )
}