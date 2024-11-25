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
import { AdicionarEventosProps, Gift } from "../../../../utils/GameDataProps";
import { Button } from "../../../../components/ui/button";

interface ModalPresentesProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectGift: (giftUrl: string) => void;
  onAddEvent: (evento: AdicionarEventosProps) => void; // Propriedade para adicionar eventos
}

export const ModalPresentes: React.FC<ModalPresentesProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  onSelectGift,
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
  const [gifts, setGifts] = useState<Gift[]>([]);

  const fetchGifts = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/tiktok/gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar presentes");
      return response.json();
    },
    onSuccess: (data) => {
      setGifts(data.availableGifts || []);
    },
    onError: (error) => {
      console.error("Erro de conexão:", error);
    },
  });

  useEffect(() => {
    if (isDialogOpen) {
      fetchGifts.mutate();
    }
  }, [isDialogOpen]);

  const handleAddEvent = (gift: Gift) => {
    const novoEvento: AdicionarEventosProps = {
      id_user: "1", // Substitua com o ID do usuário real
      id_predefinicao: modoJogo?.id.toString() || "",
      ativo: true,
      presente: gift.image_urls[0],
      funcao: {
        nome: gift.name,
        tecla: "CTRL + A", // Altere conforme necessário
      },
      audio: "default-audio.mp3", // Altere conforme necessário
      video: "default-video.mp4", // Altere conforme necessário
    };

    onAddEvent(novoEvento); // Adiciona o evento
    setIsDialogOpen(false); // Fecha a modal
  };

  const presentes = modoJogo
    ? modoJogo.predefinicoes.flatMap((predef) => predef.eventos)
    : [];

  const presentesFiltrados = presentes.filter((presente) =>
    presente.funcao.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-xl p-4">
        <DialogHeader className="flex justify-between ">
          <div className="flex gap-4">
            <button
              onClick={() => setIsDialogOpen(false)}
              aria-label="Fechar modal"
            >
              <ArrowLeft
                size={40}
                color="#FAC638"
                className="bg-[#363B4A] rounded-lg p-2"
              />
            </button>
            <div className="flex flex-col ">
              <DialogTitle className="text-white text-2xl">Presentes</DialogTitle>
              <p className="text-gray-400 mb-4">
                Gerencie seus próprios presentes
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Barra de Pesquisa */}
        <div className="flex justify-end mb-4">
          <Input
            type="text"
            placeholder="Pesquisar Presentes"
            className="w-80 p-2 pl-10 rounded-2xl text-white bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Container com rolagem para os presentes */}
        <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="p-2 bg-foreground rounded-lg flex flex-col items-center text-center text-white border border-gray-700 hover:border-yellow-500"
              onClick={() => handleAddEvent(gift)} // Adiciona evento ao clicar
            >
              <img
                src={gift.image_urls[0]}
                alt={gift.name}
                className="w-16 h-16 object-cover rounded-md mb-2"
              />
              <p className="text-sm font-semibold">{gift.name}</p>
              <p className="text-xs text-gray-400">{gift.diamond_count} ⭐</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
