import MainContent from "../components/MainContent";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import UserProfile from "../components/UserProfile";

export default function Home() {
    return (
        <div className="flex min-h-screen bg-white">
            <SidebarLeft/>
            <UserProfile />
            
        </div>
    );
}