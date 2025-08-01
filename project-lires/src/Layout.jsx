import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MainContent from './components/MainContent';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarLeft />
      <MainContent />
      <SidebarRight />
    </div>
  );
}