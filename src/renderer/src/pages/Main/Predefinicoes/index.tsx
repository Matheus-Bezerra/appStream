import { useParams } from "react-router-dom";
import { useState } from "react";
import { gameData } from "../../../constants/GameData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/Breadcrumb";

import TabelaPredefinicoes from "./components/TabelaPredefinicoes";
import { Button } from "../../../components/ui/button";
import { Play, StopCircle } from "lucide-react";
import { PredefinicoesAction } from "./components/PredefinicoesAction";
import NewPredefinicoes from "./components/NewPredefinicoes";

export const Predefinicoes = () => {
  const { idJogoSelecionado, modoJogoSelecionado } = useParams();
  const jogo = gameData.find(
    (game) => game.id === parseInt(idJogoSelecionado ?? "")
  );
  const modoJogo = jogo?.modes.find(
    (modo) => modo.id === parseInt(modoJogoSelecionado ?? "")
  );

  const [predefinicoes, setPredefinicoes] = useState([
    { name: "SEGD Minecraft", isActive: true },
    { name: "Live Quarta", isActive: false },
    { name: "Clássico", isActive: false },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [monitoring, setMonitoring] = useState(false); // Estado para controlar o botão

  const handlePlayClick = async () => {
    const payload = {
      username: "@bellajogadaoficial",
      game: "Minecraft",
    };

    try {
      const response = await fetch("http://localhost:3000/tiktok/monitorar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMonitoring(true); // Ativa o monitoramento
        toast.success("Monitoramento iniciado com sucesso!", {
          className: "toast-success",
        });
      } else {
        toast.error("Erro ao iniciar monitoramento: " + response.statusText, {
          className: "toast-custom",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao fazer requisição: " + error.message, {
          className: "toast-custom",
        });
      } else {
        toast.error("Erro desconhecido", {
          className: "toast-custom",
        });
      }
    }
  };

  const handleStopClick = async () => {

    const payload = {
      username: "@bellajogadaoficial",
      game: "Minecraft",
    };
    try {
      const response = await fetch("http://localhost:3000/tiktok/parar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMonitoring(false); // Desativa o monitoramento
        toast.success("Monitoramento interrompido com sucesso!", {
          className: "toast-success",
        });
      } else {
        toast.error("Erro ao interromper monitoramento: " + response.statusText, {
          className: "toast-custom",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao fazer requisição: " + error.message, {
          className: "toast-custom",
        });
      } else {
        toast.error("Erro desconhecido", {
          className: "toast-custom",
        });
      }
    }
  };

  if (!jogo || !modoJogo) return <p>Jogo ou Modo de Jogo não encontrado</p>;

  return (
    <div className="p-4">
      <ToastContainer /> {/* Necessário para exibir os toasts */}
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
        <h2 className="text-primary text-lg font-bold">
          {predefinicoes.length}/3 Predefinições
        </h2>
        {monitoring ? (
          <Button size={"icon"} onClick={handleStopClick}>
            <StopCircle />
          </Button>
        ) : (
          <Button size={"icon"} onClick={handlePlayClick}>
            <Play />
          </Button>
        )}
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setOpenDialog(true)}
        >
          Adicionar Predefinição
        </Button>
      </div>
      <div className="flex items-center mt-3 gap-6">
        {predefinicoes.map((predefinicao) => (
          <PredefinicoesAction
            key={predefinicao.name}
            name={predefinicao.name}
            isActive={predefinicao.isActive}
            onSelect={() => console.log(`${predefinicao.name} selecionado`)}
            onRename={(newName) =>
              setPredefinicoes((prev) =>
                prev.map((predef) =>
                  predef.name === predefinicao.name
                    ? { ...predef, name: newName }
                    : predef
                )
              )
            }
            onDelete={() =>
              setPredefinicoes((prev) =>
                prev.filter((predef) => predef.name !== predefinicao.name)
              )
            }
          />
        ))}
      </div>

      <NewPredefinicoes
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onAddPredefinicao={(name) =>
          setPredefinicoes((prev) => [...prev, { name, isActive: false }])
        }
      />

      <TabelaPredefinicoes />
    </div>
  );
};
