import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/Dialog";
import { Input } from "../../../../components/ui/input";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Sound } from '../../../../utils/GameDataProps';

interface ModalSoundsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}



export const ModalSounds: React.FC<ModalSoundsProps> = ({ isDialogOpen, setIsDialogOpen }) => {
  const { idJogoSelecionado, modoJogoSelecionado } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const fetchSounds = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/sounds/topSounds", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar sons");
      return response.json();
    },
    onSuccess: (data) => {
      // Acessa o array `sounds` do objeto retornado
      if (data.sounds && Array.isArray(data.sounds)) {
        setSounds(data.sounds);
      } else {
        console.error("A resposta da API não contém 'sounds' como um array:", data);
        setSounds([]);
      }
    },
    onError: (error) => {
      console.error("Erro de conexão:", error);
      setSounds([]);
    },
  });

  useEffect(() => {
    if (isDialogOpen) {
      fetchSounds.mutate();
    }
  }, [isDialogOpen]);

  const filteredSounds = sounds.filter((sound) =>
    sound.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playAudio = (url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }

    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
  };

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
              <DialogTitle className="text-white text-2xl">Audios</DialogTitle>
              <p className="text-gray-400 mb-4">Gerencie seus próprios Audios</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-end mb-4">
          <Input
            type="text"
            placeholder="Pesquisar Audios"
            className="w-80 p-2 pl-10 rounded-2xl text-white bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {filteredSounds.map((sound, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg text-center text-white border border-gray-700"
            >
              <p className="text-lg font-semibold mb-2">{sound.title}</p>
              <button
                onClick={() => playAudio(sound.directUrl)}
                className="text-yellow-500 underline"
              >
                Ouvir
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
