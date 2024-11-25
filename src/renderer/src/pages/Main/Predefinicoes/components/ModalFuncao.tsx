import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../../components/Dialog";
import { AdicionarEventosProps, Gift } from "../../../../utils/GameDataProps";


interface ModalFuncaoProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectEffect?: (effectUrl: string) => void; // Mantém opcional, se necessário
    onAddEvent: (evento: AdicionarEventosProps) => void; // Adicione esta propriedade
}


export const ModalFuncao: React.FC<ModalFuncaoProps> = ({
    isDialogOpen,
    setIsDialogOpen,
    onAddEvent,
}) => {
    const [name, setName] = useState("Example Name");
    const [interval, setInterval] = useState(200);
    const [commands, setCommands] = useState("Control D + ALT");
    const [repetitions, setRepetitions] = useState(3);

    const handleSave = () => {
        onAddEvent({
            id_user: "example_user",
            id_predefinicao: "example_predef",
            ativo: true,
            funcao: { nome: "Example Function", tecla: commands },
            audio: "default-audio.mp3",
            video: "default-video.mp4",
            interval, 
            commands, 
            repetitions, 
        });
        setIsDialogOpen(false); // Fecha a modal
    };

    


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-md bg-gray-900 rounded-xl p-4">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl">Configuração</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">

                    <div>
                        <label className="block text-white text-sm mb-2">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm mb-2">Intervalo (ms)</label>
                        <input
                            type="number"
                            value={interval}
                            onChange={(e) => setInterval(Number(e.target.value))}
                            className="w-full p-2 rounded-lg bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm mb-2">Comandos</label>
                        <input
                            type="text"
                            value={commands}
                            onChange={(e) => setCommands(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm mb-2">Repetições</label>
                        <input
                            type="number"
                            value={repetitions}
                            onChange={(e) => setRepetitions(Number(e.target.value))}
                            className="w-full p-2 rounded-lg bg-gray-800 text-white"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-yellow-500 rounded-lg text-white"
                    >
                        Salvar
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
