import React from 'react';
import Metropole from '../assets/Metropole.png';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';


export default function Home() {
    return (
        <div className="flex flex-row w-full bg-[#f8f5ff]">
            <SidebarLeft />
            <div className="flex flex-col gap-6 w-full p-6">
                <div
                    className="bg-cover bg-center bg-no-repeat max-w-full rounded-3xl h-56 items-center flex justify-center text-white text-2xl"
                    style={{
                        backgroundImage: `url(${Metropole})`,
                    }}
                >
                    <strong><span>Bem vindo a experiencia Lires <br />
                        Se divirta a aprendendo!</span></strong>
                </div>
                {/*Primeiros Passos */}
                <div className='h-16 max-w-full bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] mt-7 items-center flex justify-center text-white'>
                    <div className='h-28 max-w-full bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] ] items-center flex justify-center text-white p-12 rounded-3xl'>
                        <strong><span>Primeiros Passos</span></strong>
                    </div>
                </div>
                {/*Cards de Cursos */}
                <div className="flex flex-row w-full bg-[#f8f5ff]">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl border-2 border-[#9CD6C8] shadow hover:scale-105 transition">
                            <span className="font-bold">1200</span>
                            <span className="text-sm">R$ 27,90</span>
                        </div>
                        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl border-2 border-[#9CD6C8] shadow hover:scale-105 transition">
                            <span className="font-bold">1200</span>
                            <span className="text-sm">R$ 27,90</span>
                        </div>
                        <div className="flex flex-col items-center bg-purple-100 p-4 rounded-xl border-2 border-[#9CD6C8] shadow hover:scale-105 transition">
                            <span className="font-bold">1200</span>
                            <span className="text-sm">R$ 27,90</span>
                        </div>
                    </div>
                </div>
            </div>
            <SidebarRight />
        </div>
    );
}