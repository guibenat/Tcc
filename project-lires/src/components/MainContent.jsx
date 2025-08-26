import Metropole from "../assets/Metropole.png";

export default function MainContent() {
  

  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-white to-purple-100 overflow-y-auto">
      <div className=" flex flex-col items-center ronded-2xl p-6 text-white shadow-lg mb-8">
        <img  src={Metropole} alt="" />
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
   

    </main>
  );
}


