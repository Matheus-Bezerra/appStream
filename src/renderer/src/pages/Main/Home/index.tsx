import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { useState } from "react";
import minecraftImage from "../../../imagens/mineCraft.jpg";
import gtaImage from "../../../imagens/thumbnail.webp";
import batalhaImage from "../../../imagens/batalha.jpg";

export const Home = () => {
  const [showCard, setShowCard] = useState(false); // Controle de visibilidade do Card

  return (
    <div className="flex text-white">
      <main className="flex-1 p-8">
        <div className="relative bg-[#363B4A] rounded-3xl overflow-hidden mb-8">
          <img
            src={minecraftImage}
            alt="Minecraft"
            className="w-full h-48 object-cover opacity-70"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-6 space-y-2">
            <span className="bg-primary text-black px-2 py-1 rounded text-sm font-bold">Último jogo</span>
            <h2 className="text-2xl font-bold">MINECRAFT</h2>
            <Button className="bg-primary text-black rounded-full px-6 py-2 font-bold mt-2">Acessar</Button>
          </div>
        </div>

        {/* Meus Jogos */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Meus jogos</h1>
        </div>

        {/* Jogos principais */}
        <div className="grid grid-cols-3 gap-4">
          {[{ title: "Grand Theft Auto V", image: gtaImage }, { title: "MineCraft", image: minecraftImage }, { title: "Batalha", image: batalhaImage }].map((game, index) => (
            <Card key={index} className="bg-[#0b0c0f] p-4 border-0 rounded-2xl">
              <CardContent className="flex flex-col items-center">
                <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="text-primary font-bold text-center mb-2">{game.title}</h3>
                <Button className="w-full border-2 border-yellow-500 text-yellow-500 rounded-full font-bold py-2 bg-transparent">Acessar</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Top Streamers */}
      <aside className="w-64 bg-[#0b0c0f] p-4 rounded-3xl shadow-md ml-4 mr-4">
        <h2 className="text-lg font-bold mb-4">Top Streamer</h2>
        <div className="space-y-4">
          {[{ name: "Gabriel_freire", views: "25,000 Views", avatar: "link_para_avatar" },
          { name: "gordao_do_PC", views: "10,000 Views", avatar: "link_para_avatar" },
          { name: "jordao-L-13", views: "8,500 Views", avatar: "link_para_avatar" }].map((streamer, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-[#1C1F28]">
              <Avatar className="w-12 h-12">
                <AvatarImage src={streamer.avatar} alt={`${streamer.name}_avatar`} />
                <AvatarFallback>{streamer.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold">{streamer.name}</p>
                <p className="text-sm text-gray-400">{streamer.views}</p>
              </div>
              <span className="text-yellow-500 font-bold">⭐</span>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4 border-2 border-yellow-500 text-yellow-500 rounded-full font-bold py-2 bg-transparent">Visualizar todos</Button>
      </aside>

    </div>
  );
};
