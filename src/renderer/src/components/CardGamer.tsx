// components/CardGamer.tsx
import React from "react";

interface CardGamerProps {
  title: string;
  image: string;
}

export const CardGamer: React.FC<CardGamerProps> = ({ title, image }) => {
  return (
    <div className="bg-[#0b0c0f] p-4 border-0 rounded-2xl">
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h3 className="text-primary font-bold text-center mb-2">
          {title}
        </h3>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-primary/90 h-9 px-4 w-40 border-2 border-yellow-500 text-yellow-500 rounded-full hover:text-gray-300 font-bold py-2 bg-transparent">
          Acessar
        </button>
      </div>
    </div>
  );
};
