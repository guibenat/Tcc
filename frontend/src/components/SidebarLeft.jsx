import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useSettings } from "../components/SettingsContext";
import logoLiresClaraImg from "../assets/logo-lires.png";
import logoLiresEscuraImg from "../assets/logo-lires-branca.png";
import Perfil from "../assets/Perfil.png";
import aprenderIcon from "../assets/aprender.png";
import praticarIcon from "../assets/praticar.png";
import videosIcon from "../assets/videos.png";
import feedIcon from "../assets/feed.png";
import lojaIcon from "../assets/loja.png";
import perfilIcon from "../assets/perfil.png";
import ajustesIcon from "../assets/ajustes.png";
const colorPalette = [
  "f0d3f7",
  "c0aede",
  "d1d4f9",
  "fde047",
  "a78bfa",
  "7c3aed",
  "4ade80",
  "2dd4bf",
  "fb7185",
  "f97316",
].join(",");

const getAvatarUrl = (seed, style) => {
  const finalStyle = style || "bottts-neutral";
  if (!seed) {
    return Perfil;
  }
  return `https://api.dicebear.com/7.x/${finalStyle}/svg?seed=${seed}&radius=50&backgroundColor=${colorPalette}`;
};

const menuItems = [
  { icon: aprenderIcon, label: "Aprender", id: "aprender", path: "/home" },
  { icon: praticarIcon, label: "Alfabeto", id: "alfabeto", path: "/alfabeto" },
  { icon: videosIcon, label: "Vídeos", id: "videos", path: "/videos" },
  { icon: feedIcon, label: "Feed", id: "feed", path: "/feed" },
  { icon: lojaIcon, label: "Loja", id: "loja", path: "/loja" },
  { icon: perfilIcon, label: "Perfil", id: "perfil", path: "/perfil" },
  { icon: ajustesIcon, label: "Ajustes", id: "ajustes", path: "#" },
];

// Componente: Pop-up de Configurações
const SettingsPopup = ({ onClose, onLogout, theme }) => (
  <div
    className={`
    absolute left-full top-0 z-20 w-52 rounded-2xl shadow-lg border px-4 py-3 flex items-start gap-3
    ${
      theme === "escuro"
        ? "bg-gray-800 border-gray-700 shadow-purple-900/30"
        : "bg-white border-purple-200 shadow-purple-200/30"
    }
  `}
  >
    {/* Botão de Fechar (X) */}
    <button
      onClick={onClose}
      className={`pt-1 ${
        theme === "escuro"
          ? "text-slate-500 hover:text-slate-300"
          : "text-slate-400 hover:text-slate-600"
      }`}
      aria-label="Fechar"
    >
      ✕
    </button>

    {/* Links de navegação */}
    <nav className="flex flex-col">
      <Link
        to="/configuracoes"
        onClick={onClose}
        className={`block font-bold ${
          theme === "escuro"
            ? "text-slate-200 hover:text-purple-400"
            : "text-slate-800 hover:text-purple-600"
        }`}
      >
        Configurações
      </Link>
      <a
        href="#"
        className={`block font-bold ${
          theme === "escuro"
            ? "text-slate-200 hover:text-purple-400"
            : "text-slate-800 hover:text-purple-600"
        }`}
      >
        Ajuda
      </a>
      <button
        onClick={onLogout}
        className={`block font-bold text-left ${
          theme === "escuro"
            ? "text-slate-200 hover:text-purple-400"
            : "text-slate-800 hover:text-purple-600"
        }`}
      >
        Sair
      </button>
    </nav>
  </div>
);

// Componente: SidebarLeft
export default function SidebarLeft() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useSettings();

  // Estado para o avatar dinâmico

  const [avatarUrl, setAvatarUrl] = useState(Perfil);
  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const user = JSON.parse(userString);
      setAvatarUrl(
        getAvatarUrl(user?.avatarSeed || user?.username, user?.avatarStyle)
      );
    } else {
      setAvatarUrl(Perfil);
    }
  }, [location]);

  const handleItemClick = (e, item) => {
    if (item.id === "ajustes") {
      e.preventDefault();
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setIsSettingsOpen(false);
    }
  };

  // Lida com logout

  const handleLogout = () => {
    setIsSettingsOpen(false);
    Swal.fire({
      title: "Deseja realmente sair?",
      text: "Você será redirecionado para a tela inicial.",
      icon: "info",
      iconColor: "#59b1ff",
      showCancelButton: true,
      confirmButtonText: "Sim, sair!",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: `font-poppins rounded-2xl ${
          theme === "escuro" ? "bg-gray-800 text-slate-200" : "bg-white"
        }`,
        title: `${theme === "escuro" ? "text-slate-200" : "text-slate-800"}`,
        confirmButton:
          "btn-gradient-glow font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105",
        cancelButton:
          "bg-gray-400 hover:bg-gray-500 font-semibold py-2 px-8 rounded-full text-white border-none cursor-pointer transition transform duration-200 hover:scale-105 ml-4",
      },
      buttonsStyling: false,
      background: theme === "escuro" ? "#1f2937" : "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Saindo e limpando sessão...");
        localStorage.removeItem("currentUser");
        window.location.href = "/";
      }
    });
  };

  return (
    // Container da Sidebar
    <aside
      className={`
      w-48 flex-col p-4 fixed left-0 top-0 h-full hidden lg:flex z-10
      ${
        theme === "escuro"
          ? "bg-gray-900 border-r border-gray-700"
          : "bg-white border-r border-slate-200"
      }
    `}
    >
      {/* CSS para o botão gradiente */}
      <style>{`
          .btn-gradient-glow {
            background-image: linear-gradient(90deg, #b081ff, #59b1ff);
            box-shadow: 0 4px 15px rgba(90, 177, 255, 0.4);
          }
      `}</style>

      {/* Logo */}
      <div className="px-2 mb-12 mt-4">
        <img
          src={theme === "escuro" ? logoLiresEscuraImg : logoLiresClaraImg}
          alt="Logo Lires"
          className="w-24"
        />
      </div>

      {/* Navegação principal */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path && item.id !== "ajustes";

          return (
            <div key={item.id} className="relative">
              <Link
                to={item.path || "#"}
                onClick={(e) => handleItemClick(e, item)}
                className={`
                  flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 w-full
                  ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : theme === "escuro"
                      ? "text-slate-400 hover:bg-gray-700 hover:text-purple-400"
                      : "text-slate-500 hover:bg-slate-100 hover:text-purple-600"
                  }
                  ${
                    theme === "escuro" && isActive
                      ? "!bg-purple-800 !text-purple-300"
                      : ""
                  } // Sobrescreve o Ativo (Escuro)
                `}
              >
                {/* Lógica do Avatar Dinâmico */}
                {item.id === "perfil" ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className={`w-7 h-7 rounded-full bg-white ${
                      isActive ? "" : "opacity-90"
                    }`}
                  />
                ) : (
                  <img
                    src={item.icon}
                    alt={`Ícone de ${item.label}`}
                    className={`w-7 h-7 ${isActive ? "" : "opacity-70"}`}
                  />
                )}
                {/* Fim da Lógica do Avatar */}

                <span>{item.label}</span>
              </Link>

              {/* Renderiza o pop-up de Ajustes */}
              {item.id === "ajustes" && isSettingsOpen && (
                <SettingsPopup
                  onClose={() => setIsSettingsOpen(false)}
                  onLogout={handleLogout}
                  theme={theme}
                />
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
