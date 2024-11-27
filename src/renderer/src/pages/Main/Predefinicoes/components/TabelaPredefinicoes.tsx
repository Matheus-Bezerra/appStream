import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/Table";
import { Switch } from "../../../../components/Switch";
import { gameData } from "../../../../constants/GameData";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import DropAcoes, { DropdownMenuCheckboxes } from "./DropAcoes";
import { ModalPresentes } from "./ModalPresentes";
import { ModalFuncao } from "./ModalFuncao";
import { ModalSounds } from "./ModalSounds";
import { ModalEfeitos } from "./ModalEfeitos";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/Dialog";
import RoseImage from "../../../../imagens/rose.webp";
import PenImage from "../../../../assets/pen.png";
import MusicImage from "../../../../assets/music.png";
import UploadImage from "../../../../assets/upload.png";
import { AdicionarEventosProps } from "@/utils/GameDataProps";

const TabelaPredefinicoes = () => {
  const { idJogoSelecionado, modoJogoSelecionado } = useParams();
  const jogo = gameData.find(
    (game) => game.id === parseInt(idJogoSelecionado ?? "")
  );
  const modoJogo = jogo?.modes.find(
    (modo) => modo.id === parseInt(modoJogoSelecionado ?? "")
  );

  const [eventosAtivos, setEventosAtivos] = useState(
    modoJogo
      ? modoJogo.predefinicoes.flatMap((predef) =>
        predef.eventos.map((evento) => ({
          id: evento.id,
          ativo: evento.ativo,
        }))
      )
      : []
  );

  const [presenteSelecionado, setPresenteSelecionado] = useState<string | null>(
    null
  );
  const toggleAtivo = (eventoId: number) => {
    setEventosAtivos((prev) =>
      prev.map((evento) =>
        evento.id === eventoId ? { ...evento, ativo: !evento.ativo } : evento
      )
    );
  };

  if (!jogo || !modoJogo) return <p>Jogo ou Modo de Jogo não encontrado</p>;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [isDialogPresentesOpen, setIsDialogPresentesOpen] = useState(false);
  const openDialogPresentes = () => setIsDialogPresentesOpen(true);


  const [isDialogFuncaoOpen, setIsDialogFuncaoOpen] = useState(false);
  const openDialogFuncao = () => setIsDialogFuncaoOpen(true);

  const [isDialogSoundsOpen, setIsDialogSoundsOpen] = useState(false);
  const openDialogSounds = () => setIsDialogSoundsOpen(true);

  const [isDialogEfeitosOpen, setIsDialogEfeitosOpen] = useState(false);
  const openDialogEfeitos = () => setIsDialogEfeitosOpen(true);

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDelete = (index: number) => {
    setEventosDinamicos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    console.log("Editando item:", eventosDinamicos[index]);
    // Lógica de edição a ser implementada
  };

  // Função para enviar os dados
  const enviarDados = useMutation({
    mutationFn: async (dados: any) => {
      const response = await fetch("http://localhost:3000/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) throw new Error("Erro ao enviar evento");
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Dados enviados com sucesso:", data);
      setIsDialogOpen(false); // Fecha a modal após o envio
    },
    onError: (error) => {
      console.error("Erro ao enviar evento:", error);
    },
  });

  const handleAdicionarEvento = () => {
    if (!jogo || !modoJogo) {
      console.error("Jogo ou Modo de Jogo não encontrado.");
      return;
    }

    const dadosParaEnviar = {
      usuario: "exemploUsuario", // Substituir pelo usuário real
      modoJogo: modoJogoSelecionado || "",
      jogo: idJogoSelecionado || "",
      predefinicoes: modoJogo.predefinicoes,
    };

    enviarDados.mutate(dadosParaEnviar);
  };

  const [eventosDinamicos, setEventosDinamicos] = useState<
    AdicionarEventosProps[]
  >([]);

  const handleAdicionarEventoDinamico = (evento: AdicionarEventosProps) => {
    const enviarApi = {
      usuario: "3d0ca315-aff9–4fc2-be61–3b76b9a2d798",
      predefinicoes: {
        id: "8e8af196-1035-4e50-866f-d11cb18ea4ce",
        eventos: [
          {
            id: "7175d925-a861-4979-81a6-d687c71ff3a8",
            ativo: true,
            presente: "Rosa",
            funcao: {
              imagem: "imagem.png",
              nome: "Pular Infinito",
              tecla: "control + a"
            },
            audio: "../audio.mp3",
            video: "../video.mp4"
          }
        ],
      },
      modoJogo: 2, // Modo Jogo Sobrevivencia exemplo id 2
      jogo: 2 // Jogo Minecraft exemplo id 1
    }
    setEventosDinamicos((prev) => [...prev, evento]);
  };

  if (!jogo || !modoJogo) return <p>Jogo ou Modo de Jogo não encontrado</p>;



  return (
    <div className="mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Ativo</TableHead>
            <TableHead>Presente</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Aúdio</TableHead>
            <TableHead>Efeitos</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modoJogo.predefinicoes.flatMap((predef) =>
            predef.eventos.map((evento) => (
              <TableRow key={evento.id}>
                <TableCell>{/* Lógica do switch */}</TableCell>
                <TableCell>{/* Imagem do presente */}</TableCell>
                <TableCell>{evento.funcao.nome}</TableCell>
                <TableCell>{evento.audio}</TableCell>
                <TableCell>{evento.video}</TableCell>
                <TableCell>
                  <DropdownMenuCheckboxes
                    onDelete={() => console.warn("Excluir para modoJogo não implementado")}
                    onEdit={() => console.warn("Editar para modoJogo não implementado")}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
          {eventosDinamicos.map((evento, index) => (
            <TableRow key={`dinamico-${index}`}>
              <TableCell>
                <Switch
                  checked={evento.ativo}
                  onCheckedChange={() =>
                    setEventosDinamicos((prev) =>
                      prev.map((e, i) =>
                        i === index ? { ...e, ativo: !e.ativo } : e
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <img
                  src={evento.presente || "/path/to/default-image.jpg"}
                  alt={evento.funcao.nome}
                  className="w-10 h-10 object-cover rounded-lg"
                />
              </TableCell>
              <TableCell>{evento.funcao.nome}</TableCell>
              <TableCell>{evento.audio}</TableCell>
              <TableCell>{evento.video}</TableCell>
              <TableCell>
                <DropdownMenuCheckboxes
                  onDelete={() => handleDelete(index)} // Função de exclusão
                  onEdit={() => handleEdit(index)} // Função de edição
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4" onClick={openDialog}>
              Adicionar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl bg-gray-900 text-white rounded-xl p-3">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Adicionar Eventos
              </DialogTitle>
              <p className="text-gray-400">
                Gerencie seus próprios eventos para a sua predefinição escolhida
              </p>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <h3 className="text-lg font-semibold">Presente</h3>
                <img
                  src={presenteSelecionado || RoseImage}
                  alt={presenteSelecionado ? "Presente Selecionado" : "Rose"}
                  className="w-16 bg-slate-700 p-1 rounded-full cursor-pointer"
                  onClick={openDialogPresentes}
                />
              </div>
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Funções</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="items-center  justify-center flex">
                    <img
                      src={PenImage}
                      alt="Pen"
                      className="w-16 bg-slate-700 p-1 rounded-full"
                      onClick={openDialogFuncao}

                    />
                  </div>
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      <span className="text-primary">Nome:</span> Customizado
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="text-primary">Intervalo:</span> 200ms
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="text-primary">Comandos:</span> Control D
                      + ALT
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="text-primary">Repetições:</span> 3x
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Efeitos</h3>
                </div>
                <label
                  htmlFor="audio-upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={UploadImage}
                    alt="Upload"
                    className="w-16 bg-slate-700 p-1 rounded-full"
                    onClick={openDialogEfeitos}
                  />
                </label>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Áudio</h3>
                </div>
                <label
                  htmlFor="audio-upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={MusicImage}
                    alt="Upload"
                    className="w-16 bg-slate-700 p-1 rounded-full cursor-pointer"
                    onClick={openDialogSounds}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 gap-2">
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={closeDialog}
                  className="bg-white w-full rounded-xl"
                >
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={closeDialog}
                  className="w-full rounded-xl"
                >
                  Adicionar
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
        <ModalPresentes
          isDialogOpen={isDialogPresentesOpen}
          setIsDialogOpen={setIsDialogPresentesOpen}
          onAddEvent={(evento: AdicionarEventosProps) =>
            handleAdicionarEventoDinamico(evento)
          }
          onSelectGift={function (giftUrl: string): void {
            throw new Error("Função não implementada.");
          }}
        />
        <ModalFuncao
          isDialogOpen={isDialogFuncaoOpen}
          setIsDialogOpen={setIsDialogFuncaoOpen}
          onAddEvent={(evento: AdicionarEventosProps) => handleAdicionarEventoDinamico(evento)}
        />



        <ModalEfeitos
          isDialogOpen={isDialogEfeitosOpen}
          setIsDialogOpen={setIsDialogEfeitosOpen}
          onAddEvent={(evento: AdicionarEventosProps) =>
            handleAdicionarEventoDinamico(evento)
          }
        />
        <ModalSounds
          isDialogOpen={isDialogSoundsOpen}
          setIsDialogOpen={setIsDialogSoundsOpen}
          onAddEvent={(evento: AdicionarEventosProps) =>
            handleAdicionarEventoDinamico(evento)
          }
        />
      </div>
    </div>
  );
};

export default TabelaPredefinicoes;
