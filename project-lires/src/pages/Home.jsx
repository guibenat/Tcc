import HomeMid from '../components/HomeMid';
import Lires from '../assets/LIRES.png';
import Brasil from '../assets/Brasil.jpg';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';

export default function Home() {
    return (
        <div className="flex min-h-screen bg-white">
            <SidebarLeft/>
            <MainContent />
            <SidebarRight />
        </div>
    );
}