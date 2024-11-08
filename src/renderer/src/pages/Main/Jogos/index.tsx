import { gameData } from '../../../constants/GameData';
import { CardGamer } from '../../../components/CardGamer';

export const Jogos = () => {
  return (
    <div className="space-x-4 p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary ml-4">Meus jogos</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {gameData.map(({ id, titulo, imagem }) => (
          <CardGamer
            key={id}
            title={titulo}  // Passa apenas o título
            image={imagem}  // Passa apenas a imagem
          />
        ))}
      </div>
    </div>
  );
};
