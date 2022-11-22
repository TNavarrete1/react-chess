// Styles
import "components/ChessBoard/GameDecision.css";
// Hooks
import useComponentVisible from "hooks/useComponentVisible";
// Components
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faCrown, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function GameDecision({ gameOver, decisionTxt, winnerTxt }) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    if (gameOver) {
      setIsComponentVisible(true);
    }
  }, [gameOver, setIsComponentVisible]);

  const removeDecisionCard = () => {
    setIsComponentVisible(false);
  };

  return (
    <>
      {isComponentVisible && (
        <div id="game-decision-modal">
          <div ref={ref} className="modal-card">
            <div id="exit-icon" onClick={removeDecisionCard}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <div id="header-bg-circle"></div>
            <header>{decisionTxt}</header>
            <div id="icon-winner-wrapper">
              <div id="icon">
                {winnerTxt === "Computer" ? (
                  <FontAwesomeIcon
                    icon={faRobot}
                    style={{ color: "lightgray" }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faCrown} />
                )}
              </div>
              <p id="winner">Winner: {winnerTxt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
