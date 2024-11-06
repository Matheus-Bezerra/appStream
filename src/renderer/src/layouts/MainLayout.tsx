// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/sidebar2"; // Import do Sidebar

export const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixo à esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 p-6">
        <header className="mb-4">Main Layout</header>
        <Outlet />
      </div>
    </div>
  );
};
