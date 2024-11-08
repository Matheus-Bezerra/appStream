// components/CardGamer.tsx
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface CardGamerProps {
  titulo: string;
  imagem: string;
  limk?: string
}

export const CardGamer: React.FC<CardGamerProps> = ({ titulo, imagem, limk }) => {
  return (
    <Card className="bg-foreground p-0 border-0 rounded-2xl max-w-md cursor-pointer">
      <CardContent className="flex flex-col items-center">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h3 className="text-primary font-bold text-center mb-2">
          {titulo}
        </h3>
        <div className="w-full max-w-60">
          <Button variant="outline" className="w-full">
            Acessar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
