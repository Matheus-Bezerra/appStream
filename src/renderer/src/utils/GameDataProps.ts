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
    imagem: string;
    navigateTo: string;
    predefinicoes: PredefinicoesProps[]; 
}

export interface GameProps {
    id: number;
    titulo: string;
    modes: ModeProps[];
    acessado: string; // formato ISO para datas
    banner: string;
    imagem: string;
    ultimoAcesso: boolean;
    // predefinicoes: PredefinicoesProps[]; // Remova ou mantenha conforme a necessidade
}
