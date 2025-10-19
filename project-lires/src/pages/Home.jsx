import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainContent from '../components/MainContent';
// NOVO: Importe os componentes mobile
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';


export default function Home() {
    return (
        <div className="bg-[#F9F8FF] font-poppins">
            {/* Componentes do Desktop (já configurados para aparecer só em 'lg') */}
            <SidebarLeft />
            <SidebarRight />

            {/* NOVO: Componentes do Mobile (configurados para aparecer só até 'lg') */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* O conteúdo principal agora se ajusta para não ficar embaixo das barras mobile */}
            <div className="w-full lg:pl-48 lg:pr-96">
                {/* ALTERADO: Adicionado padding no topo (pt) e embaixo (pb) para telas pequenas,
                    e resetado para zero (lg:pt-0, lg:pb-0) em telas grandes */}
                <main className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-20 pb-24 lg:pt-8 lg:pb-8">
                    <MainContent />
                </main>
            </div>
        </div>
    );
}