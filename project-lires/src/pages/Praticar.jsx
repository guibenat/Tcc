import Robo from '../assets/RoboMascoteRosa.png'
import DedoAP from '../assets/DedoApontando.png'
import SidebarLeft from '../components/SidebarLeft'
import SidebarRight from '../components/SidebarRight'
import MainPraticar from'../components/MainPraticar'

export default function Praticar() {
  return (
    <div className="flex min-h-screen bg-white">
                <SidebarLeft/>
                <MainPraticar />
                <SidebarRight />
            </div>
  );
}