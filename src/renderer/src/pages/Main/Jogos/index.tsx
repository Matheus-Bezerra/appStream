import { gameData } from '../../../constants/GameData';
import { CardGamer } from '../../../components/CardGamer';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/Breadcrumb";

export const Jogos = () => {
  const navigate = useNavigate();

  // Função de navegação para a página de modos de jogo e marca como último acesso
  const jogosNavigate = (id: number) => {
    gameData.forEach(game => (game.ultimoAcesso = game.id === id));
    navigate(`/jogos/${id}`);
  };

  return (
    <div className="space-x-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="/jogos">Meus jogos</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-4 text-primary ml-4">Meus jogos</h1>

      <div className="grid grid-cols-3 gap-4 gap-y-16">
        {gameData.map(({ id, titulo, imagem }) => (
          <div key={id} onClick={() => jogosNavigate(id)} className="cursor-pointer">
            <CardGamer titulo={titulo} imagem={imagem} />
          </div>
        ))}
      </div>
    </div>
  );
};
