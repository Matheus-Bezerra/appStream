// src/components/ui/Sidebar.tsx
import React from "react";
import {
  House,
  RadioTower,
  Play,
  Airplay,
  Bolt,
} from "lucide-react";

import logoImage from "../../imagens/image.png";
import { SidebarItem } from "./components/SidebarItem";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {

  return (
    <div
      className={`fixed h-screen bg-foreground text-white transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
    >

      {/* Sidebar */}
      <aside
        id="separator-sidebar"
        className={`transition-transform transform text-white overflow-hidden h-full ${isOpen ? "w-64" : "w-0"}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-1 overflow-y-hidden overflow-x-hidden">
          {/* Imagem da logo no topo */}
          <div className="mb-4 flex justify-center">
            <img
              src={logoImage}
              alt="Logo"
              className="w-42 h-auto"
            />
          </div>

          {/* Menu de navegação */}
          <div className="h-screen w-64 bg-gray-800 text-white">
            <div className="h-full px-3 py-3 overflow-y-hidden bg-foreground">
              <ul className="space-y-2 font-medium">
                <SidebarItem to="/" icon={<House size={24} />} label="Início" />
                <SidebarItem to="/jogos" icon={<Play size={24} />} label="Jogos" />
                <SidebarItem to="/live" icon={<RadioTower size={24} />} label="Live" />
                <SidebarItem to="/overlays" icon={<Airplay size={24} />} label="Overlays" />
                <SidebarItem to="/configuracoes" icon={<Bolt size={24} />} label="Configurações" />
              </ul>
            </div>

          </div>
        </div>
      </aside>
    </div>
  );
};
