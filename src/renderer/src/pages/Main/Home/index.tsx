import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import minecraftImage from "../../../imagens/mineCraft.jpg";
import { CardGamer } from "../../../components/CardGamer";
import { gameData } from "../../../constants/GameData";

export const Home = () => {

  return (
    <div className="flex text-white space-x-4 p-4">
      <main className="flex-1 p-4">
        <div className="relative bg-foreground rounded-[40px] overflow-hidden mb-8">
          <img
            src={minecraftImage}
            alt="Minecraft"
            className="w-full h-48 object-cover opacity-90"
          />

          <div className="absolute top-4 left-6 bg-primary text-black px-2 py-1 rounded-full text-sm font-bold">Último jogo</div>
          <div className="absolute bottom-4 left-6 w-full justify-center items-start">
            <h2 className="text-2xl font-bold">MINECRAFT</h2>
            <Button  className="mt-2">Acessar</Button>
          </div>
        </div>

        {/* Meus Jogos */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Meus jogos</h1>
        </div>

        {/* Jogos principais */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameData.map((game, index) => (
            <CardGamer key={index} imagem={game.imagem} titulo={game.titulo} />
          ))}
        </section>
      </main>

      {/* Top Streamers */}
      <aside className="w-64 bg-foreground p-4 rounded-3xl shadow-md hidden lg:block">
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
        <Button className="w-full mt-4 border-2 border-yellow-500 text-yellow-500 hover:text-gray-300 rounded-full font-bold py-2 bg-transparent">Visualizar todos</Button>
      </aside>
    </div>
  );
};
