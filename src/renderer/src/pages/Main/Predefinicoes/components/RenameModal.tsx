import React from "react";
import { Button } from "../../../../components/ui/button";

interface RenameModalProps {
  isOpen: boolean;
  currentName: string;
  newName: string;
  onClose: () => void;
  onSave: () => void;
  onNameChange: (value: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  currentName,
  newName,
  onClose,
  onSave,
  onNameChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-foreground p-6 rounded-md shadow-md max-w-sm text-center">
        <h2 className="text-lg font-bold mb-4">Renomear Predefinição</h2>
        <input
          type="text"
          className="w-full rounded-md mb-4 p-2 bg-[#363B4A] text-white"
          value={newName}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#363B4A] w-2/4 text-white border-none rounded-sm hover:bg-primary hover:text-black"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            disabled={!newName.trim() || newName === currentName}
            className="bg-[#363B4A] border-none rounded-sm text-white w-2/4"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
