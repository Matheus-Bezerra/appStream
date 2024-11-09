// src/pages/Main/Predefinicoes.tsx
import { useParams } from 'react-router-dom';
import { gameData } from '../../../constants/GameData';

export const Predefinicoes = () => {
  const { idJogoSelecionado, modoJogoSelecionado } = useParams();
  const jogo = gameData.find(game => game.id === parseInt(idJogoSelecionado ?? ''));
  const modoJogo = jogo?.modes.find(modo => modo.id === parseInt(modoJogoSelecionado ?? ''));

  if (!jogo || !modoJogo) return <p>Jogo ou Modo de Jogo não encontrado</p>;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <img
          src={modoJogo.imagemModo || '/path/to/default-image.jpg'}
          alt={`Imagem do modo ${modoJogo.titulo}`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-primary mb-4">{modoJogo.titulo}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modoJogo.predefinicoes.map(predef => (
          <div key={predef.id} className="bg-[#0b0c0f] p-4 rounded-lg text-white">
            <h3 className="font-bold text-lg mb-2">{predef.nome}</h3>
            <ul>
              {predef.eventos.map(evento => (
                <li key={evento.id} className="mb-4">
                  <img src={evento.presente || '/path/to/default-image.jpg'} alt={evento.funcao.nome} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <p className="text-sm font-semibold">Evento: {evento.funcao.nome}</p>
                  <p className="text-sm">Tecla: {evento.funcao.tecla}</p>
                  <p className="text-sm">Áudio: {evento.audio}</p>
                  <p className="text-sm">Vídeo: {evento.video}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
