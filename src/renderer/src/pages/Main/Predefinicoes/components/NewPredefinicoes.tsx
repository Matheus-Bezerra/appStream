import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../../components/./Dialog"; // Ajuste o caminho conforme necessário
import { Button } from "../../../../components/ui/button";
import { AlignHorizontalDistributeCenter } from "lucide-react";

// Definição do tipo das props
interface NewPredefinicoesProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  onAddPredefinicao: (name: string) => void;
}

function NewPredefinicoes({
  openDialog,
  setOpenDialog,
  onAddPredefinicao,
}: NewPredefinicoesProps) {
  const [newPredefinicaoName, setNewPredefinicaoName] = useState<string>("");

  const handleAddPredefinicao = () => {
    if (newPredefinicaoName.trim()) {
      onAddPredefinicao(newPredefinicaoName);
      setNewPredefinicaoName("");
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[425px] bg-foreground">
        <DialogHeader>
          <AlignHorizontalDistributeCenter
            className="stroke-white bg-[#363B4A] p-1 rounded-lg"
            size={35}
          />
          <DialogTitle>Adicionar Predefinição</DialogTitle>
          <DialogDescription className="text-white text-lg">
            Crie sua Predefinição
            <p className="text-[#B1B1B1]">
              Escolha um nome para sua predefinição
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da Predefinição"
            className="rounded-md p-2 bg-[#363B4A] text-white"
            value={newPredefinicaoName}
            onChange={(e) => setNewPredefinicaoName(e.target.value)}
            required
          />
        </div>
        <DialogFooter className="mt-4 justify-center">
          <Button
            variant="outline"
            onClick={() => setOpenDialog(false)}
            className="bg-[#363B4A] w-2/4 text-white border-none rounded-sm hover:bg-primary hover:text-black"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddPredefinicao}
            disabled={!newPredefinicaoName.trim()}
            className="bg-[#363B4A] border-none rounded-sm text-white w-2/4"
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewPredefinicoes;
