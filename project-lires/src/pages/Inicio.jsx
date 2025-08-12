import HomeMid from '../components/HomeMid';
import Lires from '../assets/Lires.png';
import Brasil from '../assets/Brasil.jpg';

export default function Inicio() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-100 flex flex-col">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-8">
                <img src={Lires} alt="Lires logo" className="h-12" />
                <div className="flex items-center gap-4">
                    <img className="rounded-xl h-12" src={Brasil} alt="Brasil flag" />
                    <button className="text-xl px-6 py-2 bg-gradient-to-r from-pink-300 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-300 transition-all duration-300 text-white font-bold rounded-full">
                        Idioma
                    </button>
                </div>
            </nav>

            {/* Conteúdo da página */}
            <main className="flex-1 p-8">
                <HomeMid />
            </main>
        </div>
    );
}

