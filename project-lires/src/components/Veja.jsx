import Lirinho from '../assets/Lirinho.png'

export default function MainContent() {
  

  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
      
      <div className="flex items-center justify-between -gap-1 px-5 py-auto bg-[linear-gradient(to_right,#F6B8FF,#7B68EE)] text-white font-bold rounded-full shadow-md hover:scale-105 transition-all">
  <span>Veja Oque aprendeu Hoje</span>
  <button className='-ml-32 mt-36 color-[#7B68EE] h-6 w-10'>Relembre</button>
  <img src={Lirinho} alt="Discord" className="w-64 h-56 ml-10" />
</div>
    </main>
  );
}