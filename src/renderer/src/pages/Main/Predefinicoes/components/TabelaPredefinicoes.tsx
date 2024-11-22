import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/Table";
import { Switch } from "../../../../components/Switch";
import { gameData } from "../../../../constants/GameData";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import DropAcoes from "./DropAcoes";
import { ModalPresentes } from "./ModalPresentes";
import { ModalSounds } from "./ModalSounds";
import { useMutation } from "@tanstack/react-query";
import ModalAdicionarEvento from "./ModalAdicionarEvento";

const TabelaPredefinicoes = () => {
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

  const [presenteSelecionado, setPresenteSelecionado] = useState<string | null>(
    null
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogPresentesOpen, setIsDialogPresentesOpen] = useState(false);
  const [isDialogSoundsOpen, setIsDialogSoundsOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const toggleAtivo = (eventoId: number) => {
    setEventosAtivos((prev) =>
      prev.map((evento) =>
        evento.id === eventoId ? { ...evento, ativo: !evento.ativo } : evento
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Função para enviar os dados
  const enviarDados = useMutation({
    mutationFn: async (dados: any) => {
      const response = await fetch("http://localhost:3000/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) throw new Error("Erro ao enviar evento");
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Dados enviados com sucesso:", data);
      setIsDialogOpen(false); // Fecha a modal após o envio
    },
    onError: (error) => {
      console.error("Erro ao enviar evento:", error);
    },
  });

  const handleAdicionarEvento = () => {
    if (!jogo || !modoJogo) {
      console.error("Jogo ou Modo de Jogo não encontrado.");
      return;
    }

    const dadosParaEnviar = {
      usuario: "exemploUsuario", // Substituir pelo usuário real
      modoJogo: modoJogoSelecionado || "",
      jogo: idJogoSelecionado || "",
      predefinicoes: modoJogo.predefinicoes,
    };

    enviarDados.mutate(dadosParaEnviar);
  };

  if (!jogo || !modoJogo) return <p>Jogo ou Modo de Jogo não encontrado</p>;

  return (
    <div className="mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Ativo</TableHead>
            <TableHead>Presente</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Aúdio</TableHead>
            <TableHead>Vídeo</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modoJogo.predefinicoes.map((predef) =>
            predef.eventos.map((evento) => {
              const eventoAtual = eventosAtivos.find((e) => e.id === evento.id);
              return (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">
                    <Switch
                      checked={eventoAtual?.ativo}
                      onCheckedChange={() => toggleAtivo(evento.id)}
                      className={`${
                        eventoAtual?.ativo ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span
                        className={`${
                          eventoAtual?.ativo ? "translate-x-6" : "translate-x-1"
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                      />
                    </Switch>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <img
                      src={
                        presenteSelecionado ||
                        evento.presente ||
                        "/path/to/default-image.jpg"
                      }
                      alt={evento.funcao.nome}
                      className="w-10 h-10 object-cover rounded-lg mr-2"
                    />
                  </TableCell>
                  <TableCell>{evento.funcao.nome}</TableCell>
                  <TableCell>{evento.audio}</TableCell>
                  <TableCell>{evento.video}</TableCell>
                  <TableCell>
                    <div>
                      <DropAcoes />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      {/* Botão que abre a modal */}

      <div className="flex justify-center mt-5">
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          Adicionar Evento
        </Button>
      </div>
      {/* Modal de Adicionar Evento */}
      <ModalAdicionarEvento
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onAddEvento={handleAdicionarEvento}
        presenteSelecionado={presenteSelecionado}
        setPresenteSelecionado={setPresenteSelecionado}
        handleFileChange={handleFileChange}
        fileName={fileName}
      />

      {/* Modal de Presentes */}
      <ModalPresentes
        isDialogOpen={isDialogPresentesOpen}
        setIsDialogOpen={setIsDialogPresentesOpen}
        onSelectGift={(giftUrl) => setPresenteSelecionado(giftUrl)}
      />

      {/* Modal de Sons */}
      <ModalSounds
        isDialogOpen={isDialogSoundsOpen}
        setIsDialogOpen={setIsDialogSoundsOpen}
      />
    </div>
  );
};

export default TabelaPredefinicoes;
