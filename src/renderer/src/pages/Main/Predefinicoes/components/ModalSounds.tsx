import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/Dialog";
import { Input } from "../../../../components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Sound } from "../../../../utils/GameDataProps";

interface AdicionarEventosProps {
  id_user: string;
  id_predefinicao: string;
  ativo: boolean;
  presente: string;
  funcao: { nome: string; tecla: string };
  audio: string;
  video: string;
}

interface ModalSoundsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectSound?: (soundUrl: string) => void;
  onAddEvent: (evento: AdicionarEventosProps) => void;
}

export const ModalSounds: React.FC<ModalSoundsProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  onSelectSound,
  onAddEvent,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [searchedSounds, setSearchedSounds] = useState<Sound[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

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
      setSounds(data.sounds || []);
    },
    onError: () => {
      setSounds([]);
    },
  });

  const searchSounds = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/sounds/buscar?sound=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      if (!response.ok) throw new Error("Erro ao buscar sons");
      return response.json();
    },
    onSuccess: (data) => {
      setSearchedSounds(data.sounds || []);
    },
    onError: () => {
      setSearchedSounds([]);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (isDialogOpen) {
      fetchSounds.mutate();
    }
  }, [isDialogOpen]);

  const playAudio = (url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);

    audio.addEventListener("ended", () => {
      setCurrentAudio(null);
    });
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  };

  const handleAddEvent = (sound: Sound) => {
    const novoEvento: AdicionarEventosProps = {
      id_user: "1",
      id_predefinicao: "1",
      ativo: true,
      presente: "",
      funcao: {
        nome: sound.title,
        tecla: "CTRL + S",
      },
      audio: sound.directUrl,
      video: "default-video.mp4",
    };

    onAddEvent(novoEvento);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-xl p-4">
        <DialogHeader className="flex justify-between">
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
            <div className="flex flex-col">
              <DialogTitle className="text-white text-2xl">Áudios</DialogTitle>
              <p className="text-gray-400 mb-4">Gerencie seus próprios áudios</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Buscar áudios específicos"
            className="w-80 p-2 pl-10 rounded-sm text-white bg-gray-800 mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => searchSounds.mutate()}
            className="p-2 bg-yellow-500 rounded-md text-white"
          >
            Buscar
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-yellow-500">Carregando...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
            {searchedSounds.length > 0
              ? searchedSounds.map((sound, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg text-center text-white border border-gray-700 hover:border-yellow-500"
                  onClick={() => handleAddEvent(sound)}
                >
                  <p className="text-lg font-semibold mb-2">{sound.title}</p>
                  <div className="flex justify-center gap-2">
                    {/* Ícone de Play */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(sound.directUrl);
                      }}
                      className="cursor-pointer p-3 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-black"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Ícone de Stop */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        stopAudio();
                      }}
                      className="cursor-pointer p-3 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-black"
                      >
                        <rect x="5" y="5" width="14" height="14" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
              : sounds.map((sound, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg text-center text-white border border-gray-700 hover:border-yellow-500"
                  onClick={() => handleAddEvent(sound)}
                >
                  <p className="text-lg font-semibold mb-2">{sound.title}</p>
                  <div className="flex justify-center gap-2">
                    {/* Ícone de Play */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(sound.directUrl);
                      }}
                      className="cursor-pointer p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center"
                      style={{ width: "36px", height: "36px" }} // Define o tamanho do círculo
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-black"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Ícone de Stop */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        stopAudio();
                      }}
                      className="cursor-pointer p-2 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center"
                      style={{ width: "36px", height: "36px" }} // Define o tamanho do círculo

                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-black"
                      >
                        <rect x="5" y="5" width="14" height="14" />
                      </svg>
                    </div>
                  </div>

                </div>
              ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
