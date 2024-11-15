import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./Dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Switch } from "./Switch";
import { Input } from "./ui/input";
import { gameData } from "../constants/GameData";
import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import RoseImage from "../../../../src/renderer/src/assets/rose.webp";
import PenImage from "../../../../src/renderer/src/assets/pen.png";
import UploadImage from "../../../../src/renderer/src/assets/upload.png";
import MusicImage from "../../../../src/renderer/src/assets/music.png";
import DropAcoes from "./DropAcoes";

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

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name); // Atualiza o nome do arquivo
      console.log("Arquivo selecionado via input:", file);
    }
  };

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Ativo</TableHead>
            <TableHead>Presente</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Aúdio</TableHead>
            <TableHead>Vídeo</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modoJogo.predefinicoes.map((predef) =>
            predef.eventos.map((evento) => {
              const eventoAtual = eventosAtivos.find((e) => e.id === evento.id);
              return (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">
                    <Switch
                      checked={eventoAtual?.ativo}
                      onCheckedChange={() => toggleAtivo(evento.id)}
                      className={`${
                        eventoAtual?.ativo ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span
                        className={`${
                          eventoAtual?.ativo ? "translate-x-6" : "translate-x-1"
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                      />
                    </Switch>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <img
                      src={evento.presente || "/path/to/default-image.jpg"}
                      alt={evento.funcao.nome}
                      className="w-10 h-10 object-cover rounded-lg mr-2"
                    />
                  </TableCell>
                  <TableCell>{evento.funcao.nome}</TableCell>
                  <TableCell>{evento.audio}</TableCell>
                  <TableCell>{evento.video}</TableCell>
                  <TableCell>
                    <div className="flex items0center">
                      <DropAcoes/>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
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
                <h3 className="text-lg font-semibold ">Presente</h3>
                <img
                  src={RoseImage}
                  alt="Rose"
                  className="w-16 bg-slate-700 p-1 rounded-full"
                />
              </div>
              <div className="p-4 bg-gray-800  rounded-lg flex ">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Funções</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="items-center  justify-center flex">
                    <img
                      src={PenImage}
                      alt="Pen"
                      className="w-16 bg-slate-700 p-1 rounded-full"
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
              <div className="p-4 bg-gray-800 rounded-lg flex gap-3">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Vídeo</h3>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <img
                      src={UploadImage}
                      alt="Upload"
                      className="w-16 bg-slate-700 p-1 rounded-full"
                    />
                    <Input
                      id="video-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {fileName && (
                      <p className="text-gray-200 text-sm mt-2">
                        Arquivo: {fileName}
                      </p>
                    )}
                  </label>
                  <div className="p-2 bg-slate-700 text-center rounded-lg">
                    <p className="text-sm">
                      <span className="text-primary">
                        Clique para fazer upload
                      </span>{" "}
                      ou arraste e solte SVG, PNG, JPG ou GIF (max. 800x400px)
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg grid grid-cols-2 items-center">
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
                    className="w-16 bg-slate-700 p-1 rounded-sm"
                  />
                  <Input
                    id="audio-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {fileName && (
                    <p className="text-gray-200 text-sm mt-2">
                      Arquivo: {fileName}
                    </p>
                  )}
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
      </div>
    </div>
  );
};
export default TabelaPredefinicoes;
