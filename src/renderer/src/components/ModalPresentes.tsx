import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Input } from "./ui/input";
import { gameData } from "../constants/GameData";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ModalPresentes = () => {
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const presentes = modoJogo
    ? modoJogo.predefinicoes.flatMap((predef) => predef.eventos)
    : [];

  const presentesFiltrados = presentes.filter((presente) =>
    presente.funcao.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="p-1 rounded-lg flex bg-[#161920] text-primary font-bold text-lg">
        Adicionar
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-900 rounded-xl p-4">
        <DialogHeader className="flex justify-between ">
          <div className="flex gap-4">
            <button onClick={() => setIsDialogOpen(false)} aria-label="Fechar modal">
              <ArrowLeft
                size={40}
                color="#FAC638"
                className="bg-[#363B4A] rounded-lg p-2"
              />{" "}
            </button>
            <div className="flex flex-col ">
              <DialogTitle className="text-white text-2xl">
                Presentes
              </DialogTitle>
              <p className="text-gray-400 mb-4">
                Gerencie seus próprios presentes
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Barra de Pesquisa */}
        <div className="flex justify-end mb-4">
          <Input
            type="text"
            placeholder="Pesquisar Presentes"
            className="w-80 p-2 pl-10 rounded-2xl text-white bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-4 gap-4">
          {presentesFiltrados.map((presente) => (
            <div
              key={presente.id}
              className="p-2 bg-gray-800 rounded-lg flex flex-col items-center text-center text-white border-2 border-yellow-500"
            >
              <img
                src={presente.presente}
                alt={presente.funcao.nome}
                className="w-16 h-16 object-cover rounded-md mb-2"
              />
              <p className="text-sm font-semibold">{presente.funcao.nome}</p>
              <p className="text-xs text-gray-400">{presente.audio}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPresentes;
