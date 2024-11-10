// src/pages/Main/Predefinicoes.tsx
import { useParams, Link } from "react-router-dom"; // Importa Link do react-router-dom
import { useState } from "react";
import { gameData } from "../../../constants/GameData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/Table";
import { Switch } from "../../../components/Switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/Breadcrumb";

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
            <BreadcrumbLink asChild to={""}>
              <Link to={`/jogos/${jogo.id}`}>{jogo.titulo}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild to={""}>
              <Link to={`/jogos/predefinicoes/${jogo.id}/${modoJogo.id}`}>
                {modoJogo.titulo}
              </Link>
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
        <h2 className="text-xl font-bold text-primary mb-4 bg-zinc-800 p-2 rounded-3xl">
          {modoJogo.titulo}
        </h2>
      </div>

      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Ativo</TableHead>
              <TableHead>Presente</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Aúdio</TableHead>
              <TableHead>Vídeo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modoJogo.predefinicoes.map((predef) =>
              predef.eventos.map((evento) => {
                const eventoAtual = eventosAtivos.find(
                  (e) => e.id === evento.id
                );
                return (
                  <TableRow key={evento.id}>
                    <TableCell className="font-medium">
                      <Switch
                        checked={eventoAtual?.ativo}
                        onCheckedChange={() => toggleAtivo(evento.id)}
                        className={`${eventoAtual?.ativo ? "bg-blue-600" : "bg-gray-200"} relative inline-flex items-center h-6 rounded-full w-11`}
                      >
                        <span
                          className={`${
                            eventoAtual?.ativo
                              ? "translate-x-6"
                              : "translate-x-1"
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
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
