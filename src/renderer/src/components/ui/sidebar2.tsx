// src/components/ui/sidebar.tsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">Inicio</li>
          <li className="p-4 hover:bg-gray-700">Meus Jogos</li>
          <li className="p-4 hover:bg-gray-700">Live</li>
          <li className="p-4 hover:bg-gray-700">Overlays</li>
          <li className="p-4 hover:bg-gray-700">Configurações</li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
