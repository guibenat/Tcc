import DirPers from '../components/DirPers';
import EsqPers from '../components/EsqPers';
import MidPers from '../components/MidPers';

export default function Personagem (){
    return(
        <div className="flex min-h-screen bg-white">
            <DirPers/>
            <MidPers />
            <EsqPers />
        </div>
        

    );
}