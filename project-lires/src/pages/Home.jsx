import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';

export default function Home() {
    return (
        <div className="bg-[#F9F8FF] font-poppins">
            {/* Coluna 1: Fixa na Esquerda */}
            <SidebarLeft />

            {/* Coluna 3: Fixa na Direita */}
            <SidebarRight />

            {/* Coluna 2: Conteúdo Central que Rola */}
            {/* As margens ml-48 e mr-96 criam o espaço para as sidebars fixas */}
            <main className="ml-48 mr-96">
                <div className="max-w-screen-xl mx-auto px-8 py-8">
                   <MainContent />
                </div>
            </main>
        </div>
    );
}