import { gameData } from '../../../constants/GameData';
import { useParams, Link } from 'react-router-dom';

export const GameModes = () => {
  const { idJogo } = useParams<{ idJogo: string }>();

  // Garantimos que o valor passado para `parseInt` seja sempre uma string
  const jogoId = parseInt(idJogo ?? '', 10);

  const jogo = gameData.find(game => game.id === jogoId);

  // Verificação se o jogo foi encontrado
  if (!jogo) return <p className="text-yellow-500">Jogo não encontrado</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-primary mb-4">{jogo.titulo} - Modos de Jogo</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {jogo.modes.map(modo => (
          <Link
            to={`/jogos/predefinicoes/${jogo.id}/${modo.id}`}
            key={modo.id}
            className="block bg-[#0b0c0f] p-4 rounded-lg text-white"
          >
            <img
              src={modo.imagemModo}
              alt={modo.titulo}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{modo.titulo}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
