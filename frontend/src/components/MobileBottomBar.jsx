import React, { useState, useEffect } from "react";
import { useSettings } from "../components/SettingsContext";
import { Link, useLocation } from "react-router-dom";

// Ícones
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

// "Banco de dados" dos itens do menu.
const menuItems = [
  { icon: aprenderIcon, label: "Aprender", id: "aprender", path: "/home" },
  { icon: praticarIcon, label: "Alfabeto", id: "alfabeto", path: "/alfabeto" },
  { icon: videosIcon, label: "Vídeos", id: "videos", path: "/videos" },
  { icon: feedIcon, label: "Feed", id: "feed", path: "/feed" },
  { icon: lojaIcon, label: "Loja", id: "loja", path: "/loja" },
  { icon: perfilIcon, label: "Perfil", id: "perfil", path: "/perfil" },
  {
    icon: ajustesIcon,
    label: "Ajustes",
    id: "ajustes",
    path: "/configuracoes",
  },
];

// Componente da barra inferior para mobile

export default function MobileBottomBar() {
  const location = useLocation();
  const { theme } = useSettings();
  const [avatarUrl, setAvatarUrl] = useState(Perfil);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const user = JSON.parse(userString);
      const newAvatarUrl = getAvatarUrl(
        user?.avatarSeed || user?.username,
        user?.avatarStyle
      );
      setAvatarUrl(newAvatarUrl);
    } else {
      setAvatarUrl(Perfil);
    }
  }, [location.pathname]);

  return (
    <nav
      className={`
            lg:hidden fixed bottom-0 left-0 right-0 h-20 z-40
            ${
              theme === "escuro"
                ? "bg-gray-900 border-t-2 border-gray-700"
                : "bg-white border-t-2 border-slate-200"
            }
        `}
    >
      {/* Div que centraliza e espaça os ícones */}
      <div className="max-w-screen-xl mx-auto h-full flex justify-around items-center px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path || "#"}
              className={`
                                flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200 w-16
                                ${
                                  isActive
                                    ? theme === "escuro"
                                      ? "text-purple-400"
                                      : "text-purple-600"
                                    : theme === "escuro"
                                    ? "text-slate-400 hover:text-purple-400"
                                    : "text-slate-500 hover:text-purple-600"
                                }`}
            >
              {item.id === "perfil" ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className={`
                                        w-8 h-8 rounded-full bg-white
                                        ${isActive ? "scale-110" : ""}
                                    `}
                />
              ) : (
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`
                                        w-8 h-8 transition-transform duration-200 
                                        ${isActive ? "scale-110" : ""}
                                        ${
                                          theme === "escuro" && !isActive
                                            ? "opacity-70"
                                            : ""
                                        }
                                    `}
                />
              )}
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
