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

  // Dados estáticos de efeitos
  const staticEffects: Effect[] = [
    {
      id: 1,
      name: "Boca Grande",
      image_urls: ["https://via.placeholder.com/150?text=Boca+Grande"],
      description: "Aumenta o tamanho da boca de forma engraçada.",
    },
    {
      id: 2,
      name: "Cara de Leão",
      image_urls: ["https://via.placeholder.com/150?text=Cara+de+Leao"],
      description: "Transforma seu rosto em um leão feroz.",
    },
    {
      id: 3,
      name: "Olhos Gigantes",
      image_urls: ["https://via.placeholder.com/150?text=Olhos+Gigantes"],
      description: "Deixa seus olhos desproporcionalmente grandes.",
    },
    {
      id: 4,
      name: "Nariz de Porco",
      image_urls: ["https://via.placeholder.com/150?text=Nariz+de+Porco"],
      description: "Transforma seu nariz em um nariz de porco.",
    },
  ];

  useEffect(() => {
    if (isDialogOpen) {
      setEffects(staticEffects); // Usa os efeitos estáticos
    }
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

    onAddEvent(novoEvento); // Adiciona o evento
    setIsDialogOpen(false); // Fecha o modal
  };

  const efeitosFiltrados = effects.filter((effect) =>
    effect.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-xl p-4">
        <DialogHeader className="flex justify-between">
          <div className="flex gap-4">
            <button onClick={() => setIsDialogOpen(false)} aria-label="Fechar modal">
              <ArrowLeft
                size={40}
                color="#FAC638"
                className="bg-[#363B4A] rounded-lg p-2"
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
              <p className="text-xs text-gray-400">{effect.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
