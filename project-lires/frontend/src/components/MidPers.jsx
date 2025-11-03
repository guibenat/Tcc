import Lires from'../assets/Lires.png'
import Grande from '../assets/Grande.png'

export default function MidPers() {
  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
        <div className='-mt-14'><img src={Lires} alt="" /></div>
        <div className='mt-20'><img src={Grande} alt="" /></div>
        
    </main>
  );
}