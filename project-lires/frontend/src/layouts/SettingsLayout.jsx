import React from 'react';
// Outlet é o componente do React Router que renderiza a rota filha
import { Outlet } from 'react-router-dom';

// --- Componentes de Layout ---
// A navegação principal da esquerda (fixa no desktop)
import SidebarLeft from '../components/SidebarLeft';
// A navegação da direita (fixa no desktop) E sua versão móvel
import RightConfigLires, { SidebarRightMobile } from '../components/RightConfigLires';
// As barras de status (topo) e navegação (bottom) do mobile
import MobileTopBar from '../components/MobileTopBar';
import MobileBottomBar from '../components/MobileBottomBar';

// --- Contexto ---
// Preciso do 'useSettings' para aplicar o tema (claro/escuro) no fundo da página
import { useSettings } from '../components/SettingsContext'; 

/**
 * Componente: SettingsLayout
 * Este é o "molde" (layout wrapper) para todas as páginas de Configurações.
 * * Ele é responsável por:
 * 1. Renderizar as barras de navegação (desktop e mobile).
 * 2. Aplicar o tema (claro/escuro) ao fundo da página.
 * 3. Renderizar o <Outlet />, que é o espaço onde o React Router
 * vai "encaixar" a página de configuração específica (ex: Preferencias.jsx, Seguranca.jsx).
 */
export default function SettingsLayout() {
  // Puxo o 'theme' para que o fundo da página reaja
  const { theme } = useSettings(); 

    return (
        // Container principal da tela
        // Aplico o fundo (bg-gray-900 ou gradiente) baseado no tema
        <div className={`
          font-poppins relative min-h-screen flex flex-col
          ${theme === 'escuro' 
            ? 'bg-gray-900 text-slate-200' // Estilo Modo Escuro
            : 'bg-gradient-to-b from-[#F9EFFF] to-white text-slate-800'} // Estilo Modo Claro
        `}>
            {/* --- Componentes Fixos (Visíveis ou não) --- */}
            
            {/* Navegação da Esquerda (fixa, só desktop) */}
            <SidebarLeft />
            {/* Navegação da Direita (fixa, só desktop 'xl') */}
            <RightConfigLires /> 
            
            {/* Barras móveis (fixas, só mobile 'lg:hidden') */}
            <MobileTopBar />
            <MobileBottomBar />

            {/* --- Container do Conteúdo Central --- */}
            {/* Esta div é o "miolo" que fica entre as sidebars.
              lg:pl-48  -> Deixa espaço para a SidebarLeft (largura w-48) no desktop.
              xl:pr-80  -> Deixa espaço para a RightConfigLires (largura w-80) no desktop 'xl'.
            */}
            <div className="w-full lg:pl-48 xl:pr-80 flex-grow flex flex-col">
                
                {/* 'pt-20 pb-24' -> Padding para não ficar atrás das barras móveis (top/bottom)
                  'lg:py-8'     -> Padding vertical normal no desktop (que não tem barras móveis)
                */}
                <main className="px-4 lg:px-8 pt-20 pb-24 lg:py-8 w-full flex-grow">
                    {/* O <Outlet /> é o placeholder do React Router.
                      Ele renderiza o componente da rota filha.
                      (Ex: Preferencias.jsx, GerenciamentoConta.jsx, etc.)
                    */}
                    <Outlet />
                </main>
                
                {/* A Sidebar de Configurações da versão MOBILE.
                  Ela é renderizada AQUI (no final do fluxo, 'xl:hidden')
                  para que apareça *abaixo* do conteúdo principal em telas pequenas.
                */}
                <div className="px-4 lg:px-8 pb-24">
                    <SidebarRightMobile />
                </div>
            </div>
        </div>
    );
}