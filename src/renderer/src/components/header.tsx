import React from "react";
import { Input } from "./ui/input"; 

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white  shadow-md">
      <div className="flex items-center space-x-4">
      </div>
      <div className="flex items-center space-x-4">
        
        <img
          src="link_para_avatar" // Substitua pelo link ou path da imagem do avatar
          alt="Perfil"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};
