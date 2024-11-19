import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  CircleCheckBig,
  SquarePen,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import RenameModal from "./RenameModal";

interface ItemProps {
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

export const PredefinicoesAction: React.FC<ItemProps> = ({
  name,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleRename = () => {
    onRename(newName);
    setIsRenaming(false);
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 font-bold py-1 px-4 pr-2 rounded-full text-sm ${
        isActive
          ? "bg-primary text-black"
          : "border-primary border text-[#b1b1b1]"
      }`}
    >
      <span>{name}</span>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white cursor-pointer"
          >
            <DropdownMenuItem
              className="cursor-pointer hover:bg-slate-100"
              onSelect={onSelect}
            >
              <CircleCheckBig className="h-4 w-4 mr-2" /> Selecionar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-slate-100"
              onSelect={() => setIsRenaming(true)}
            >
              <SquarePen className="h-4 w-4 mr-2" /> Renomear
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:bg-slate-100"
              onSelect={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-2 text-red-400" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <RenameModal
        isOpen={isRenaming}
        currentName={name}
        newName={newName}
        onClose={() => {
          setIsRenaming(false);
          setNewName(name);
        }}
        onSave={handleRename}
        onNameChange={setNewName}
      />
    </div>
  );
};
