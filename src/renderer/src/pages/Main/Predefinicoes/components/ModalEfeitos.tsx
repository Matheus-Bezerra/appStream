import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/Dialog";
import { Input } from "../../../../components/ui/input";
import { gameData } from "../../../../constants/GameData";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Effect } from "../../../../utils/GameDataProps";
import { AdicionarEventosProps } from "../../../../utils/GameDataProps";
import snapImage from '../../../../imagens/snap.webp';

interface ModalEfeitosProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectEffect?: (effectUrl: string) => void;
  onAddEvent: (evento: AdicionarEventosProps) => void;
}

export const ModalEfeitos: React.FC<ModalEfeitosProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  onSelectEffect,
  onAddEvent,
}) => {
  const { idJogoSelecionado, modoJogoSelecionado } = useParams();
  const jogo = gameData.find(
    (game) => game.id === parseInt(idJogoSelecionado ?? "")
  );
  const modoJogo = jogo?.modes.find(
    (modo) => modo.id === parseInt(modoJogoSelecionado ?? "")
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [effects, setEffects] = useState<Effect[]>([]);

  const handleClose = () => {
    setIsDialogOpen(false);
    setEffects([]); // Limpa os efeitos ao fechar
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchEffects = () => {
      fetch("http://localhost:3000/snap-camera/shortcuts")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar efeitos");
          }
          return response.json();
        })
        .then((data) => {
          const dynamicEffects = data.map((item: { lens_id: string; shortcut: string }) => ({
            id: parseInt(item.lens_id),
            name: `Efeito ${item.lens_id}`,
            image_urls: [snapImage], // Usa a imagem importada
            description: `Atalho: ${item.shortcut}`,
          }));
          setEffects(dynamicEffects);
        })
        .catch((error) => {
          console.error("Erro ao carregar efeitos:", error);
          setEffects([]);
        });
    };

    if (isDialogOpen) {
      // Busca inicial
      fetchEffects();

      // Configura chamadas repetitivas a cada 10 segundos
      intervalId = setInterval(() => {
        fetchEffects();
      }, 5000);
    }

    return () => {
      // Limpa o intervalo ao fechar a modal
      clearInterval(intervalId);
    };
  }, [isDialogOpen]);


  const handleAddEvent = (effect: Effect) => {
    const novoEvento: AdicionarEventosProps = {
      id_user: "1",
      id_predefinicao: modoJogo?.id.toString() || "0",
      ativo: true,
      presente: effect.image_urls[0],
      funcao: {
        nome: effect.name,
        tecla: "CTRL + E",
      },
      audio: "default-audio.mp3",
      video: effect.name,
    };

    onAddEvent(novoEvento);
    setIsDialogOpen(false);
  };

  const efeitosFiltrados = effects.filter((effect) =>
    effect.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-xl p-4">
        <DialogHeader className="flex justify-between">
          <div className="flex gap-4">
            <button onClick={handleClose} aria-label="Fechar modal">
              <ArrowLeft
                size={40}
                color="#FAC638"
                className="bg-[#202229] rounded-lg p-2"
              />
            </button>
            <div className="flex flex-col">
              <DialogTitle className="text-white text-2xl">Efeitos</DialogTitle>
              <p className="text-gray-400 mb-4">Gerencie os efeitos disponíveis</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-end mb-4">
          <Input
            type="text"
            placeholder="Pesquisar Efeitos"
            className="w-80 p-2 pl-10 rounded-2xl text-white bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
          {efeitosFiltrados.map((effect) => (
            <div
              key={effect.id}
              className="p-2 bg-foreground rounded-lg flex flex-col items-center text-center text-white border border-gray-700 hover:border-yellow-500"
              onClick={() => handleAddEvent(effect)}
            >
              <img
                src={effect.image_urls[0]}
                alt={effect.name}
                className="w-16 h-16 object-cover rounded-md mb-2"
              />
              <p className="text-sm font-semibold">{effect.name}</p>
              <p className="text-xs text-gray-400">
                Atalho: <span className="text-yellow-500">{effect.description.split(': ')[1]}</span>
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
