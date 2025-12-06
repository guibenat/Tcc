import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import MainPraticar from '../components/MainPraticar'; 
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

export default function PraticarPage() { 
    return (
        <div className="bg-gradient-to-b from-[#F9EFFF] to-white font-poppins min-h-screen">
            <SidebarLeft />
            <SidebarRight />
            <MobileTopBar />
            <MobileBottomBar />

            <div className="w-full lg:pl-48 lg:pr-96 min-h-screen">
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8">
                    <MainPraticar />
                </main>
            </div>
        </div>
    );
}