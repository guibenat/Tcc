import Lires from'../assets/Lires.png'
import Videos from'../assets/Videos.png'
import Livros from'../assets/Livro.png'
import Ele from'../assets/ele.png'
import Feed from'../assets/Feed.png'
import Loja from'../assets/Loja.png'
import Perfil from '../assets/Perfil.png'
import  { Link } from 'react-router-dom';



export default function SidebarLeft() {
  return (
    <aside className="w-48 bg-white border-r border-gray-200 flex flex-col items-center py-8 -mt-16">
      <Link to="/"><img src={Lires} alt="" /></Link>
      <nav className="flex flex-col gap-6 text-[#7B68EE] font-extrabold">
        <a href="#" className="flex items-center gap-2 font-bold">
          <img src={Videos} alt="" /> <p>Videos</p>
        </a>
        <a href="#" className="flex items-center gap-2 font-bold">
          <img src={Livros} alt="" /> <p>Aprender</p>
        </a>
        <a href="#" className="flex items-center gap-2 font-bold">
          <img src={Ele} alt="" /> <p>Praticar</p>
        </a>
        <a href="#" className="flex items-center gap-2 font-bold">
          <img src={Feed} alt="" /> <p>Feed</p>
        </a>
        <Link to="/Loja" className="flex items-center gap-2 -ml-3 font-bold">
          <img src={Loja} alt="" /> <p>Loja</p>
        </Link>
        <Link to="/User" className="flex items-center gap-2 font-extrabold">
          <img src={Perfil} alt="" /> <p>Perfil</p>
        </Link>
      </nav>
    </aside>
  );
}