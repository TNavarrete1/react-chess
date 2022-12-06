// Styles
import "components/GameOptions/GameOptions.css";
// Components
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess } from "@fortawesome/free-solid-svg-icons";
import TeamOptions from "components/GameOptions/TeamOptions";
import ModeOptions from "components/GameOptions/ModeOptions";

function GameOptions({
  handleBoardOrientationOption,
  handleGameMode,
  handleStartGame,
  showHeader,
}) {
  const [gameModeChosen, setGameModeChosen] = useState(false);

  const chooseGameMode = () => {
    setGameModeChosen(true);
  };

  return (
    <div id="game-options">
      {showHeader && (
        <div id="game-options-top">
          <header>Play Chess</header>
          <FontAwesomeIcon icon={faChess} id="chess-icon" />
        </div>
      )}
      {gameModeChosen ? (
        <TeamOptions
          handleBoardOrientationOption={handleBoardOrientationOption}
          handleStartGame={handleStartGame}
        />
      ) : (
        <ModeOptions
          handleGameMode={handleGameMode}
          chooseGameMode={chooseGameMode}
        />
      )}
    </div>
  );
}

export default GameOptions;
