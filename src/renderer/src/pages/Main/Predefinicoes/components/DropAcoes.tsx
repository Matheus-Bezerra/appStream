"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "../../../../components/Dialog";

interface DropdownMenuCheckboxesProps {
  onDelete: () => Promise<void> | void; // Callback para exclusão (pode ser assíncrono)
  onEdit: () => void; // Callback para edição
}

export function DropdownMenuCheckboxes({
  onDelete,
  onEdit,
}: DropdownMenuCheckboxesProps) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false); // Estado para carregamento

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Ativa o estado de carregamento
      await onDelete(); // Executa a função de exclusão
      setOpenDelete(false); // Fecha a modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir:", error);
    } finally {
      setIsDeleting(false); // Sempre desativa o estado de carregamento
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white cursor-pointer">
          <DropdownMenuItem
            onClick={onEdit} // Executa o callback de edição diretamente
            className="cursor-pointer hover:bg-slate-100"
          >
            <SquarePen className="h-4 w-4 mr-2" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)} // Abre a modal de exclusão
            className="cursor-pointer text-red-400 hover:bg-slate-100"
          >
            <Trash2 className="h-4 w-4 mr-2 text-red-400" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de exclusão */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader className="flex items-center flex-row gap-3">
            <Trash2 className="bg-[#1F2127] stroke-red-600 h-6 w-6" />
            <h2 className="text-white">Excluir Predefinição</h2>
            
          </DialogHeader>
          <DialogFooter className="justify-start gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenDelete(false)}
              className="border-none bg-[#363B4A] text-white"
              disabled={isDeleting} // Desativa o botão ao excluir
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting} // Desativa o botão ao excluir
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DropdownMenuCheckboxes;
