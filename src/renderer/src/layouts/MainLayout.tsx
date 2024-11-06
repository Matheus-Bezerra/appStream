// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/sidebar2"; // Import do Sidebar

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-black"> {/* Adicionando o fundo preto aqui */}
      {/* Sidebar fixo à esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1  text-white"> {/* Adicionando texto branco no conteúdo principal */}
        <header className=""></header>
        <Outlet />
      </div>
    </div>
  );
};
