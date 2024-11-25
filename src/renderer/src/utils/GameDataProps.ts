interface FuncaoProps {
  imagem?: any;
  nome: string;
  tecla: string;

}

export interface AdicionarEventosProps {
  id_user: string;
  id_predefinicao: string;
  ativo: boolean;
  presente?: string;
  funcao: FuncaoProps;
  audio: string;
  video: string;
  interval?: number; // Adicionado como opcional
  commands?: string; // Adicionado como opcional
  repetitions?: number; // Adicionado como opcional
  nome?: string; // Adiciona nome como opcional
}

export interface EventosProps {
  id: number; //id do evento
  ativo: boolean;
  presente?: string;
  funcao: FuncaoProps;
  audio: string;
  video: string;
}

export interface PredefinicoesProps {
  id: number; // id da predefinição
  nome: string;
  eventos: EventosProps[];
}

interface api {
  usuario: string;
  predefinicoes: PredefinicoesProps[]
  modoJogo: string; // id do modo do jogo
  jogo: string; // id do jogo
}

export interface ModeProps {
  id: number;
  idJogo: number;
  titulo: string;
  imagemModo?: string;
  navigateTo: string;
  predefinicoes: PredefinicoesProps[];
}

export interface GameProps {
  id: number;
  titulo: string;
  modes: ModeProps[];
  acessado: string;
  banner: string;
  imagem: string;
  imagemGame: string;
  ultimoAcesso: boolean;
}

export interface Gift {
  id: number;
  name: string;
  diamond_count: number;
  image_urls: string[];
}

export interface Efeitos {
  id: number;
  name: string;
  diamond_count: number;
  image_urls: string[];
}

export interface Effect {
  id: number;
  name: string;
  image_urls: string[];
  description: string;
}

export interface Sound {
  title: string;
  url: string;
  directUrl: string;
}


