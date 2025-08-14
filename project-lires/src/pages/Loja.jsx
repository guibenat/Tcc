import SuperCaixaGema from '../assets/SuperCaixaGema.png';
import CaixaGema from '../assets/CaixaGema.png';
import CaixaGrandeGema from '../assets/caixaGrandeGema.png';
import Gemas from'../assets/Gemas.png';
import SidebarLeft from "../components/SidebarLeft";

export default function Loja() {
    return (
        <>
            <div>
                <SidebarLeft />
            </div>
            <main className='flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto'>
            <div className="flex flex-col items-start justify-between gap-x-7 px-5 py-auto bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] text-white font-bold rounded-2xl border-8 border-[#9CD6C8] ">
                <div className="ml-3 mt-4 mb-4 gap-6">
  <span className="font-extrabold text-2xl">Seja lires premium!</span>
  <h2>Aprenda se divertindo com mais vontade</h2>
  <button className="bg-white text-[#7B68EE] rounded-xl py-1 px-4">Saiba mais</button>
  </div>
</div>

<div className="flex flex-row items-center">
    <strong>Gemas</strong>
    <img src={Gemas} alt="" />
</div>
<div className='flex flex-row items-center justify-between py-auto text-white font-bold rounded-2xl gap-4 '>
    <div className='bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] rounded-xl flex flex-col items-center w-36 h-52 border-8 border-[#9CD6C8]'>
        <div className='mt-7 items-center'>
        <img src={CaixaGema} alt="" />
        <span>1200</span>
        <h2>0,00R$</h2>
        </div>
        </div>
    <div className='bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] rounded-xl flex flex-col items-center w-36 h-52 border-8 border-[#9CD6C8]'>
        <div className='mt-7 items-center'>
        <img src={CaixaGrandeGema} alt="" />
        <span>3000</span>                                       
        <h2>0,00R$</h2>
        </div>
        </div>
    <div className='bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] rounded-xl flex flex-col items-center w-36 h-52 border-8 border-[#9CD6C8]'>
        <div className='mt-7 items-center'>
        <img src={SuperCaixaGema} alt="" />
        <span>6500</span>
        <h2>0,00R$</h2>
        </div>
        </div>
</div>
            </main>
            <footer className='flex flex-col items-center justify-center'>
                
            </footer>
        </>
    );
}