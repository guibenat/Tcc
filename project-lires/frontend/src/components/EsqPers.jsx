import Homem from '../assets/homem.png'
import Mulher from '../assets/mulher.png'
import Negro from '../assets/Negro.png'
import Branco from '../assets/Branco.png'
import Pardo from  '../assets/Pardo.png'

export default function EsqPers () {
    return (
        <aside className="w-30 bg-white border-1 border-gray-100 flex flex-col p-4 space-y-7">
            <div className="border-4 border-[#9CD6C8]  border-300 rounded-3xl p-4">
                <h1 className='text-lg font-extrabold  items-center ml-24 text-[#9CD6C8]'>Personagens</h1>
                <div className='flex items-center -ml-4'>
                <div className="flex flex-col items-center h-40 w-40"><img src={Negro} alt=""/></div>
                <div className="flex flex-col items-center h-40 w-40"><img src={Pardo} alt=""/></div>
                </div>
                <div className='flex items-center -ml-4'>
                <div className="flex flex-col items-center h-40 w-40"><img src={Pardo} alt=""/></div>
                <div className="flex flex-col items-center h-40 w-40"><img src={Branco} alt=""/></div>
                </div>
                <div className='flex items-center ml-20 mt-7'>
                <div className="flex flex-col items-center h-16 w-16"><img src={Homem} alt=""/></div>
                <div className="flex flex-col items-center h-16 w-16"><img src={Mulher} alt=""/></div>
                </div>

            </div>
        </aside>
    );
}