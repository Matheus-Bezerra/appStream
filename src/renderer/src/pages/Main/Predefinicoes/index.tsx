import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { gameData } from "../../../constants/GameData";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/Breadcrumb";

import ModalPresentes from "../../../components/ModalPresentes";
import TabelaPredefinicoes from "../../../components/TabelaPredefinicoes";
import { Button } from "../../../components/ui/button";
import { Check, CircleCheckBig, MoreHorizontal, MoreVertical, Play, SquarePen, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { PredefinicoesAction } from "./components/PredefinicoesAction";

export const Predefinicoes = () => {
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

  const predefinicoes = [
    { name: "SEGD Mnecraft", isActive: true },
    { name: "Live Quarta", isActive: false },
    { name: "Classico", isActive: false },
  ];


  return (
    <div className="p-4">
      {/* Breadcrumb para navegação */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="/jogos">Meus jogos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to={`/jogos/${jogo.id}`}>
              {jogo.titulo}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              to={`/jogos/predefinicoes/${jogo.id}/${modoJogo.id}`}
            >
              {modoJogo.titulo}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-3 items-center">
        <img
          src={modoJogo.imagemModo || "../assets/rosa.jpg"}
          alt={`Imagem do modo ${modoJogo.titulo}`}
          className="w-44 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold text-primary mb-4 bg-foreground p-2 rounded-3xl">
          {modoJogo.titulo}
        </h2>
      </div>
      <div className="flex gap-4 items-center">
        <h2 className="text-primary text-lg font-bold ">
          3/3 Predefinições
        </h2>
        <Button size={"icon"}>
          <Play />
        </Button>
        <ModalPresentes />
      </div>
      <div className="flex items-center mt-3 gap-6">
        {predefinicoes.map((predefinicao) => (
          <PredefinicoesAction
            key={predefinicao.name}
            name={predefinicao.name}
            isActive={predefinicao.isActive}
            onSelect={() => console.log(`${predefinicao.name} selecionado`)}
            onRename={() => console.log(`Renomear ${predefinicao.name}`)}
            onDelete={() => console.log(`Excluir ${predefinicao.name}`)}
          />
        ))}
      </div>
      <TabelaPredefinicoes />
    </div>
  );
};
