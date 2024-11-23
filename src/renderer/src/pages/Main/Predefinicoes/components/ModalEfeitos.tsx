import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/Dialog";
import { Input } from "../../../../components/ui/input";
import { gameData } from "../../../../constants/GameData";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Effect {
  id: number;
  name: string;
  image_urls: string[];
  description: string;
}

interface AdicionarEventosProps {
  id_user: string;
  id_predefinicao: string;
  ativo: boolean;
  presente: string;
  funcao: { nome: string; tecla: string };
  audio: string;
  video: string;
}

interface ModalEfeitosProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectEffect?: (effectUrl: string) => void;
  onAddEvent: (evento: AdicionarEventosProps) => void; // Adicionada aqui
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

  const fetchEffects = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/tiktok/effects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar efeitos");
      return response.json();
    },
    onSuccess: (data) => {
      setEffects(data.availableEffects || []);
    },
    onError: (error) => {
      console.error("Erro de conexão:", error);
    },
  });

  useEffect(() => {
    if (isDialogOpen) {
      fetchEffects.mutate();
    }
  }, [isDialogOpen]);

  const handleAddEvent = (effect: Effect) => {
    const novoEvento: AdicionarEventosProps = {
      id_user: "1", // Substitua com o ID do usuário real
      id_predefinicao: modoJogo?.id.toString() || "0",
      ativo: true,
      presente: effect.image_urls[0],
      funcao: {
        nome: effect.name,
        tecla: "CTRL + E",
      },
      audio: "default-audio.mp3", 
      video: "default-video.mp4", 
    };

    onAddEvent(novoEvento); // Chama a função passada como prop
    setIsDialogOpen(false); // Fecha a modal
  };

  const efeitosFiltrados = effects.filter((effect) =>
    effect.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-xl p-4">
        <DialogHeader className="flex justify-between ">
          <div className="flex gap-4">
            <button onClick={() => setIsDialogOpen(false)} aria-label="Fechar modal">
              <ArrowLeft
                size={40}
                color="#FAC638"
                className="bg-[#363B4A] rounded-lg p-2"
              />
            </button>
            <div className="flex flex-col ">
              <DialogTitle className="text-white text-2xl">Efeitos</DialogTitle>
              <p className="text-gray-400 mb-4">Gerencie os efeitos disponíveis</p>
            </div>
          </div>
        </DialogHeader>

        {/* Barra de Pesquisa */}
        <div className="flex justify-end mb-4">
          <Input
            type="text"
            placeholder="Pesquisar Efeitos"
            className="w-80 p-2 pl-10 rounded-2xl text-white bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Container com rolagem para os efeitos */}
        <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
          {efeitosFiltrados.map((effect) => (
            <div
              key={effect.id}
              className="p-2 bg-foreground rounded-lg flex flex-col items-center text-center text-white border-2 border-blue-500 cursor-pointer"
              onClick={() => handleAddEvent(effect)} // Chama a função handleAddEvent
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
