import Nike from "../assets/Nike.png";
import Baumissoes from "../assets/Baumissoes.png";
import Raiomissões from "../assets/Raiomissões.png";
import Foguinho from "../assets/Foguinho.png";
import lcoin from "../assets/lcoin.png";
import Coracao from "../assets/Coracao.png";
import { Link } from "react-router-dom";
import RoboVoando from "../assets/RoboVoando.png";
import ButtonAssinatura from "../assets/ButtonAssinatura.png";

export default function SidebarRight() {
  return (
    <aside className="min-w-min bg-white border-1 border-gray-100 flex flex-col p-2 space-y-7">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-center">
          <img src={Foguinho} alt="" />{" "}
          <span className="text-[#E50000] font-bold">0</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={lcoin} alt="" />{" "}
          <span className="text-[#FED67C] font-bold">0</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={Coracao} alt="" />{" "}
          <span className="text-[#E50000] font-bold">0</span>
        </div>
      </div>
      {/*Primeiro Bloco*/}
      <div className="border-4 border-[#9CD6C8]  border-300 rounded-3xl p-4 bg-[linear-gradient(to_bottom,#000AC3,#070C72)] flex flex-col  text-white">
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-start">
            <img className=" mb-7" src={ButtonAssinatura} alt="" />
            <span className="text-[#D0FF00] font-extrabold">
              Seja MASTER agora!
            </span>
            <strong>
              Sem anuncios, <br /> vida ilimitada e <br /> skins gratis!
            </strong>
            <Link to="/Assinatura">
              {" "}
              <button className="text-xl mt-8 px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">
                Assine agora
              </button>
            </Link>
          </div>
          <img className="h-44 mt-8 w-auto -ml-36" src={RoboVoando} alt="" />
        </div>
      </div>
      {/*Segundo Bloco*/}
      <div className="border-4 border-[#9CD6C8]  border-600 rounded-lg p-3 flex flex-col items-center bg-[linear-gradient(to_top,#7479D9,#AFB3F3)]">
        <div className="flex flex-row gap-4 items-center mb-4">
          <button className="text-xl px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">
            Missões
          </button>

          <p className="font-bold text-[#FFFFFF]">
            Complete as missões <br /> e ganhe recompensas
          </p>
        </div>

        <div className="flex items-center gap-16 pt-4">
          <img className="w-12 h-14" src={Raiomissões} alt="" />

          <img className="w-12 h-14" src={Baumissoes} alt="" />
        </div>
        <p className="text-lg font-bold text-white mt-2">10 Lcoins</p>
      </div>

      {/*Terceiro Bloco*/}
      <div className="border-4 border-[#9CD6C8]  border-600 rounded-lg  items-center flex flex-col ">
        <h2 className="font-bold text-[#988AEA] mt-4 mb-4">Anúncio</h2>
        <img src={Nike} alt="Anúncio" className="rounded h-48 mb-6" />
      </div>

      <footer className="text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
          <a href="">Sobre</a>|<a href="#">Loja</a>|<a href="#">Investidores</a>
          |<a href="#">Privacidade</a>|<a href="#">Termos de uso</a>
        </div>
      </footer>
    </aside>
  );
}
