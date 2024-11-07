import { GameProps } from "../utils/GameDataProps";

export const gameData: GameProps[] = [
    {
        id: 1,
        titulo: "Minecraft",
        modes: [
            {
                id: 1,
                titulo: "Sobrevivência",
                imagem: require('../assets/sobrevivencia.png'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Sobrevivência',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/sobrevivencia.png'), funcao: { nome: '5x Esqueleto canhoto', tecla: "113" }, audio: 'teste.mp3', video: 'Zueira Esqueleto' },
                            { id: 2, ativo: false, presente: require('../assets/expansion.png'), funcao: { nome: '10x Charden Creeper', tecla: "113" }, audio: 'Villhen.mp3', video: 'Zueira Creeper' },
                            { id: 3, ativo: true, presente: require('../assets/zombie.png'), funcao: { nome: '10x Charden Creeper', tecla: "113" }, audio: 'Freire.mp3', video: 'Zueira Creeper' },
                        ]
                    },
                    {
                        id: 2,
                        nome: 'Live Craft',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/zombie.png'), funcao: { nome: 'cavalo de troia', tecla: "0x33"}, audio: 'troia.mp3', video: 'testando 2' },
                        ]
                    },
                    {
                        id: 3,
                        nome: 'Live most',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/zombie.png'), funcao: {nome: 'mood craft', tecla: "0x22"}, audio: 'troia.mp3', video: 'testando 2' },
                        ]
                    },
                ]
            },
            {
                id: 2,
                titulo: "Expansão",
                imagem: require('../assets/expansion.png'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Modo Expansão',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/expansion.png'), funcao: {nome: '5x Creeper Gigante', tecla: "0x44"}, audio: 'explosao.mp3', video: 'Explosão Creeper' }
                        ]
                    }
                ]
            },
            {
                id: 3,
                titulo: "Apocalipse",
                imagem: require('../assets/zombie.png'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Modo Apocalipse',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/zombie.png'), funcao: {nome: 'Invasão Zombie', tecla: "0x33"}, audio: 'zombie.mp3', video: 'Ataque Zombie' },
                        ]
                    }
                ]
            }
        ],
        acessado: "2024-09-21T17:00:47.536Z",
        banner: require("../assets/Minecraft-1.jpg"),
        imagem: require("../assets/mineCraft.jpg"),
        ultimoAcesso: true,
    },
    {
        id: 2,
        titulo: "Grand Theft Auto V",
        modes: [
            {
                id: 1,
                titulo: "Modo Missões V",
                imagem: require('../assets/moodMissaoGta.jpg'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Missões Iniciais',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/moodMissaoGta.jpg'), funcao: {nome: 'Primeira Missão', tecla: "0x44"}, audio: 'missao1.mp3', video: 'Missão 1' },
                        ]
                    }
                ]
            },
            {
                id: 2,
                titulo: "KOTH (King of the Hill)",
                imagem: require('../assets/moodKothGta.jpg'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Modo Rei da Colina',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/moodKothGta.jpg'), funcao: {nome: 'Defender a Colina', tecla: "88x8"}, audio: 'defesa.mp3', video: 'Defesa' },
                            { id: 2, ativo: true, presente: require('../assets/moodKothGta.jpg'), funcao: {nome: 'Defender a Colina', tecla: "44x44"}, audio: 'defesa.mp3', video: 'Defesa' },

                        ]
                    },
                    {
                        id: 2,
                        nome: 'Live Craft',
                        eventos: [
                            { id: 2, ativo: true, presente: require('../assets/moodKothGta.jpg'), funcao: {nome: 'missão em dupla', tecla: "99x9"}, audio: 'defesa.mp3', video: 'Defesa' },
                        ]
                    },
                ]
            }
        ],
        acessado: "2024-09-21T17:00:47.536Z",
        banner: require("../assets/thumbnail.webp"),
        imagem: require("../assets/thumbnail.webp"),
        ultimoAcesso: false,
    },
    {
        id: 3,
        titulo: "Batalha",
        modes: [
            {
                id: 1,
                titulo: "Modo Batalha",
                imagem: require('../assets/batalha.jpg'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Batalha Zueira',
                        eventos: [
                            { id: 1, ativo: false, presente: require('../assets/moodMissaoGta.jpg'), funcao: {nome: '5x Esqueleto Canhoto', tecla: "x44"}, audio: 'esqueleto.mp3', video: 'Esqueleto' }
                        ]
                    }
                ]
            },
            {
                id: 2,
                titulo: "Modo de Rima",
                imagem: require('../assets/batalha.jpg'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Rima Zueira',
                        eventos: [
                            { id: 1, ativo: true, presente: require('../assets/moodMissaoGta.jpg'), funcao: {nome: 'Rima 5x', tecla: "22x2"}, audio: 'rima.mp3', video: 'Rima' },
                        ]
                    }
                ]
            }
        ],
        acessado: "2024-09-21T17:00:47.536Z",
        banner: require("../assets/batalha.jpg"),
        imagem: require("../assets/batalha.jpg"),
        ultimoAcesso: false,
    },
    {
        id: 4,
        titulo: "Red Dead",
        modes: [
            {
                id: 1,
                titulo: "Modo Red Dead",
                imagem: require('../assets/redDead.jpg'),
                navigateTo: 'PreDefinicoesScreen',
                predefinicoes: [
                    {
                        id: 1,
                        nome: 'Sobreviver',
                        eventos: []
                    },
                ]
            }
        ],
        acessado: "2024-09-21T17:00:47.536Z",
        banner: require("../assets/redDead.jpg"),
        imagem: require("../assets/redDead.jpg"),
        ultimoAcesso: false,
    },
];