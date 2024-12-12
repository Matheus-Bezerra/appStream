import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/Dialog";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import RoseImage from "../../../../assets/rose.webp";
import PenImage from "../../../../assets/pen.png";
import UploadImage from "../../../../assets/upload.png";
import MusicImage from "../../../../assets/music.png";

interface ModalAdicionarEventoProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddEvento: () => void;
  presenteSelecionado: string | null;
  setPresenteSelecionado: React.Dispatch<React.SetStateAction<string | null>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null;
}

const ModalAdicionarEvento: React.FC<ModalAdicionarEventoProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  onAddEvento,
  presenteSelecionado,
  setPresenteSelecionado,
  handleFileChange,
  fileName,
}) => {
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          {/* Campo para Presente */}
          <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Presente</h3>
            <img
              src={presenteSelecionado || RoseImage}
              alt={presenteSelecionado ? "Presente Selecionado" : "Rose"}
              className="w-16 bg-slate-700 p-1 rounded-full cursor-pointer"
              onClick={() => setPresenteSelecionado("NovoPresenteURL")}
            />
          </div>

          {/* Campo para Funções */}
          <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Funções</h3>
            </div>
            <div className="grid grid-cols-2">
              <div className="items-center justify-center flex">
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
                  <span className="text-primary">Comandos:</span> Control D + ALT
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="text-primary">Repetições:</span> 3x
                </p>
              </div>
            </div>
          </div>

          {/* Campo para Vídeo */}
          <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
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
                  <p className="text-gray-200 text-sm mt-2">Arquivo: {fileName}</p>
                )}
              </label>
              <div className="p-2 bg-slate-700 text-center rounded-lg">
                <p className="text-sm">
                  <span className="text-primary">Clique para fazer upload</span>{" "}
                  ou arraste e solte SVG, PNG, JPG ou GIF (max. 800x400px)
                </p>
              </div>
            </div>
          </div>

          {/* Campo para Áudio */}
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
              />
            </label>
          </div>
        </div>

        {/* Botões de Ação */}
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
              onClick={() => {
                onAddEvento();
                closeDialog();
              }}
              className="w-full rounded-xl"
            >
              Adicionar
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdicionarEvento;
