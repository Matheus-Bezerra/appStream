import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Input } from "./ui/input";
import { gameData } from "../constants/GameData";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Gift {
  id: number;
  name: string;
  diamond_count: number;
  image_urls: string[];
}

const ModalPresentes = () => {
  const { idJogoSelecionado, modoJogoSelecionado } = useParams();
  const jogo = gameData.find(
    (game) => game.id === parseInt(idJogoSelecionado ?? "")
  );
  const modoJogo = jogo?.modes.find(
    (modo) => modo.id === parseInt(modoJogoSelecionado ?? "")
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const presentes = modoJogo
    ? modoJogo.predefinicoes.flatMap((predef) => predef.eventos)
    : [];

  const presentesFiltrados = presentes.filter((presente) =>
    presente.funcao.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="p-1 rounded-lg flex bg-[#161920] text-primary font-bold text-lg">
        Adicionar
      </DialogTrigger>
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
              <DialogTitle className="text-white text-2xl">Presentes</DialogTitle>
              <p className="text-gray-400 mb-4">Gerencie seus próprios presentes</p>
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
              className="p-2 bg-gray-800 rounded-lg flex flex-col items-center text-center text-white border-2 border-yellow-500"
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

export default ModalPresentes;
