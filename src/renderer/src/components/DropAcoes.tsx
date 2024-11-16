"use client";

import * as React from "react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuCheckboxItemProps,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Ellipsis, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./../components/Dialog"; // Ajuste o caminho conforme necessário

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

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
            onClick={() => setOpenEdit(true)}
            className="cursor-pointer hover:bg-slate-100"  
          >
            <SquarePen className="h-4 w-4 mr-2" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            className="cursor-pointer text-red-400 hover:bg-slate-100"
          >
            <Trash2 className="h-4 w-4 mr-2 text-red-400" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de exclusão */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete} >
        <DialogContent >
          <DialogHeader className="flex gap-3 flex-row items-center">
            <Trash2 className="bg-[#1F2127] stroke-red-600 " />
            <div>
              <h2 className="text-white">Excluir Predefinição</h2>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-start">
            <Button variant="outline" onClick={() => setOpenDelete(false)}
              className="border-none bg-[#363B4A] text-white">
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                console.log("Item excluído");
                setOpenDelete(false); // Fecha a Dialog após a ação
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DropdownMenuCheckboxes;
