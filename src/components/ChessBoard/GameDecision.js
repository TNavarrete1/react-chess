// Styles
import "components/ChessBoard/GameDecision.css";
// Hooks
import useComponentVisible from "hooks/useComponentVisible";
// Components
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function GameDecision({
  //Data
  gameOver,
  decisionTxt,
  winnerTxt,
  team,
  gameMode,
  minutes,
  // Functions
  resetGame,
}) {
  //Helper functions

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const removeDecisionCard = () => {
    setIsComponentVisible(false);
  };

  useEffect(() => {
    if (gameOver) {
      setIsComponentVisible(true);
    }
  }, [gameOver, setIsComponentVisible]);

  return (
    <>
      {isComponentVisible && (
        <div id="game-decision-modal">
          <div ref={ref} className="modal-card">
            <div id="exit-icon" onClick={removeDecisionCard}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <header>Game Over!</header>
            <div id="txt-wrapper">
              <div id="winner-txt">{winnerTxt}</div>
              <div id="decision-txt">{decisionTxt}</div>
            </div>
            <div id="game-over-buttons">
              <button
                className="game-over-button"
                style={{
                  "--bg-color": "var(--bg-secondary)",
                  "--bg-hover-color": "var(--bg-dark-secondary)",
                }}
                onClick={() => {
                  setIsComponentVisible(false);
                  resetGame(team, gameMode, minutes, true);
                }}
              >
                Play Again
              </button>
              <button
                className="game-over-button"
                style={{
                  "--bg-color": "var(--bg-primary)",
                  "--bg-hover-color": "var(--bg-dark-primary)",
                }}
                onClick={() => {
                  setIsComponentVisible(false);
                  resetGame();
                }}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
