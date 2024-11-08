interface FuncaoProps {
    imagem?: any,
    nome: string,
    tecla: string
}

export interface EventosProps {
    id: number;
    ativo: boolean;
    presente: any; 
    funcao: FuncaoProps;
    audio: string;
    video: string;
}

export interface PredefinicoesProps {
    id: number;
    nome: string;
    eventos: EventosProps[];
}

export interface ModeProps {
    id: number;
    titulo: string;
    imagemModo: string;
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
