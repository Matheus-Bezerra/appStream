import { gameData } from '../../../constants/GameData';
import { CardGamer } from '../../../components/CardGamer';
import { useNavigate } from 'react-router-dom';

export const Jogos = () => {
  const navigate = useNavigate();

  // Função de navegação para a página de modos de jogo
  const handleNavigate = (id: number) => {
    navigate(`/jogos/${id}`); // Navega para a rota com o id do jogo
  };

  return (
    <div className="space-x-4 p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary ml-4">Meus jogos</h1>
      
      <div className="grid grid-cols-3 gap-4 gap-y-16">
        {gameData.map(({ id, titulo, imagem }) => (
          <div key={id} onClick={() => handleNavigate(id)} className="cursor-pointer">
            <CardGamer
              titulo={titulo}
              imagem={imagem}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
