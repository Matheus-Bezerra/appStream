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
    <div className="flex h-screen text-white">


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
            <Button className="bg-primary text-black">Acessar</Button>
          </div>
        </div>

        {/* Meus Jogos */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Meus jogos</h1>
        </div>

        {/* Jogos principais */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-[#0b0c0f] p-4 border-0">
            <CardHeader>
              <CardTitle className="text-primary">Minecraft</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={minecraftImage} alt="Minecraft" className="w-full h-32 object-cover rounded-lg mb-4" />
              <Button className="w-full bg-primary">Acessar</Button>
            </CardContent>
          </Card>

          <Card className="bg-[#0b0c0f] p-4 border-0">
            <CardHeader>
              <CardTitle className="text-primary">Grand Theft Auto V</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={gtaImage} alt="GTA V" className="w-full h-32 object-cover rounded-lg mb-4" />
              <Button className="w-full bg-primary">Acessar</Button>
            </CardContent>
          </Card>

          <Card className="bg-[#0b0c0f] p-4 border-0">
            <CardHeader>
              <CardTitle className="text-primary">Batalha</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={batalhaImage} alt="Dark Souls II" className="w-full h-32 object-cover rounded-lg mb-4" />
              <Button className="w-full bg-primary">Acessar</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Top Streamers */}
      <aside className="w-64 bg-[#0b0c0f] p-4">
        <h2 className="text-lg font-bold mb-4">Top Streamer</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-2 rounded-lg bg-[#1C1F28]">
              <Avatar>
                <AvatarImage src="link_para_avatar" alt="streamer_avatar" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">Nome Streamer</p>
                <p className="text-sm text-gray-400">10,000 Views</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-full bg-primary">Visualizar todos</Button>
      </aside>
    </div>
  );
};
