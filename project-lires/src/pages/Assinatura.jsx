import ButtonAssinatura from '../assets/ButtonAssinatura.png';  

import FundoAssinatura from '../assets/FundoAssinatura.png';   

export default function Assinatura() {
    return (
        <>
        <div className="min-w-full max-h-2">
            <img src={FundoAssinatura} alt="" />
            <div><img src={ButtonAssinatura} alt="" /></div>
        </div>
        <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
            <div >

            </div>
        </main>
        </>
    );
}