import  { Link } from 'react-router-dom';
import ButtonAssinatura from "../assets/ButtonAssinatura.png";
import { GoCheckCircleFill } from "react-icons/go";
import Robovoando from "../assets/RoboVoando.png";
import FundoAssinatura from "../assets/FundoAssinatura.png";

export default function Assinatura() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat h-screen w-screen"
        style={{
          backgroundImage: `url(${FundoAssinatura})`,
        }}
      >
        {/* Conteúdo da página */}
        <main className="flex flex-col items-center justify-center h-full text-white text-3xl">
          <div alt="Topo" className="flex flex-col items-center mb-16">
            <img src={ButtonAssinatura} alt="" />
            <span>
              Aprenda Libras{" "}
              <strong className="text-[#E1FF00]">SEM LIMITES</strong>
            </span>
          </div>
          <div alt="meio" className="flex flex-row items-center">
            <img src={Robovoando} alt="" />
            <div
              alt="Bloco-Lateral"
              className="flex flex-col gap-3 text-left text-xl mt-4 border-2 border-[#003BFF] p-6 rounded-3xl bg-[#001679]/10"
            >
              <h3 className="flex flex-row items-center">
                {" "}
                <GoCheckCircleFill color="#E1FF00"/>
                Sem anúncios
              </h3>
              <h3 className="flex flex-row items-center">
                {" "}
                <GoCheckCircleFill color="#E1FF00" />
                Avatares e recompensas exclusivas
              </h3>
              <h3 className="flex flex-row items-center">
                {" "}
                <GoCheckCircleFill color="#E1FF00"/>
                Acesso a todos modulos sem bloqueio
              </h3>
              <h3 className="flex flex-row items-center">
                {" "}
                <GoCheckCircleFill color="#E1FF00"/>
                Baixar lições e vídeos para estudar sem limite
              </h3>
              <h3 className="flex flex-row items-center">
                {" "}
                <GoCheckCircleFill color="#E1FF00"/>
                Conquistas exclusivas para assinantes
              </h3>
              <h3 className="flex flex-row items-center">
                {" "}
                <GoCheckCircleFill color="#E1FF00"/>E muito mais
              </h3>
              <Link to="/Planos"> <button className="text-xl border-4 border-[#E1FF00] px-9 py-1 bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] hover:bg-[linear-gradient(to_right,#7B68EE,#F6B8FF)] transition-all duration-300 text-white font-bold rounded-full ">
              Conheça os planos
            </button>
            </Link>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
}
