import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MainContent from './components/MainContent';
import EsqPers from './components/EsqPers';
import MidPers from './components/MidPers';
import DirPers from './components/DirPers';


function App() {
  return (
    <div className="flex min-h-screen bg-white">
    <EsqPers />
    <MidPers />
    <DirPers />
  </div>

  );
}

export default App;

