// Styles
import "components/GameOptions/GameOptions.css";
// Components
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChess } from "@fortawesome/free-solid-svg-icons";
import TeamOptions from "components/GameOptions/TeamOptions";
import ModeOptions from "components/GameOptions/ModeOptions";

function GameOptions({
  // Data
  minutes,
  showHeader,
  // Functions
  chooseMin,
  handleBoardOrientationOption,
  handleGameMode,
  handleStartGame,
}) {
  const [gameModeChosen, setGameModeChosen] = useState(false);

  const chooseGameMode = () => {
    setGameModeChosen(true);
  };

  const removeGameMode = () => {
    setGameModeChosen(false);
    handleGameMode("");
  };

  return (
    <div id="game-options">
      {showHeader && (
        <div id="game-options-top">
          {gameModeChosen && (
            <button id="options-back-button" onClick={removeGameMode}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          <header>Play Chess</header>
          <FontAwesomeIcon icon={faChess} id="chess-icon" />
        </div>
      )}
      {gameModeChosen ? (
        <TeamOptions
          // Data
          minutes={minutes}
          // Functions
          chooseMin={chooseMin}
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
