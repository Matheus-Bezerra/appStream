import { gameData } from '../../../constants/GameData'

export const Predefinicoes = () => {
    const modoJogo = gameData[0].modes[0]
  return (
    <>
        <div>
            <img src={modoJogo.imagemModo} alt="Modo de jogo" />
            <h2>{modoJogo.titulo}</h2>
        </div>

    </>


  )
}
