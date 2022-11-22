// Styles
import "components/GameTracker/GameHeaders.css";
// Hooks
import useComponentVisible from "hooks/useComponentVisible";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

function GameHeaders({ resetGame }) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const promptNewGame = () => {
    setIsComponentVisible(true);
  };

  const removePromptNewGame = () => {
    setIsComponentVisible(false);
  };

  const createNewGame = () => {
    removePromptNewGame();
    resetGame();
  };

  return (
    <header id="game-tracker-headers">
      <button id="playing-tab" className="header-tabs">
        <FontAwesomeIcon icon={faChessBoard} />
        <span>Playing</span>
      </button>
      <button id="new-game-tab" className="header-tabs" onClick={promptNewGame}>
        <FontAwesomeIcon icon={faSquarePlus} />
        <span>New Game</span>
      </button>
      {isComponentVisible && (
        <div ref={ref} id="prompt">
          <header>Start a new game?</header>
          <button
            id="cancel-button"
            className="prompt-buttons"
            onClick={removePromptNewGame}
          >
            cancel
          </button>
          <button
            id="yes-button"
            className="prompt-buttons"
            onClick={createNewGame}
          >
            Yes
          </button>
        </div>
      )}
    </header>
  );
}

export default GameHeaders;
